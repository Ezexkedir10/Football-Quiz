import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

interface QuizSubmission {
  categoryId: string;
  answers: Array<{
    questionId: string;
    selectedAnswer: string;
  }>;
  timeSpent: number;
}

export async function POST(req: NextRequest) {
  try {
    // Get token from header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = await verifyToken(token);

    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = decoded.userId as string;
    const body = await req.json() as QuizSubmission;

    // Validate input
    if (!body.categoryId || !body.answers || body.answers.length === 0) {
      return NextResponse.json(
        { error: 'Invalid submission data' },
        { status: 400 }
      );
    }

    // Get all questions with answers
    const questions = await prisma.question.findMany({
      where: {
        id: {
          in: body.answers.map((a) => a.questionId),
        },
      },
    });

    // Calculate score
    let correctCount = 0;
    const results: Array<{
      questionId: string;
      isCorrect: boolean;
    }> = [];

    for (const answer of body.answers) {
      const question = questions.find((q) => q.id === answer.questionId);
      const isCorrect = question?.answer === answer.selectedAnswer;

      if (isCorrect) correctCount++;
      results.push({
        questionId: answer.questionId,
        isCorrect,
      });
    }

    const totalQuestions = body.answers.length;
    const score = (correctCount / totalQuestions) * 100;
    const accuracy = (correctCount / totalQuestions) * 100;

    // Create quiz result
    const quizSession = await prisma.quizSession.create({
      data: {
        userId,
        categoryId: body.categoryId,
        status: 'completed',
        endedAt: new Date(),
      },
    });

    const quizResult = await prisma.quizResult.create({
      data: {
        userId,
        quizSessionId: quizSession.id,
        score: Math.round(score),
        totalQuestions,
        correctAnswers: correctCount,
        timeSpent: body.timeSpent,
        accuracy,
        categoryId: body.categoryId,
      },
    });

    // Create answer records
    for (const answer of body.answers) {
      const isCorrect = results.find((r) => r.questionId === answer.questionId)
        ?.isCorrect;
      await prisma.quizAnswer.create({
        data: {
          sessionId: quizSession.id,
          questionId: answer.questionId,
          selectedAnswer: answer.selectedAnswer,
          isCorrect: isCorrect || false,
        },
      });
    }

    // Update user statistics
    const stats = await prisma.userStatistics.findUnique({
      where: { userId },
    });

    if (stats) {
      await prisma.userStatistics.update({
        where: { userId },
        data: {
          totalQuizzes: stats.totalQuizzes + 1,
          totalScore: stats.totalScore + Math.round(score),
          averageAccuracy:
            (stats.averageAccuracy * stats.totalQuizzes + accuracy) /
            (stats.totalQuizzes + 1),
          bestScore: Math.max(stats.bestScore, Math.round(score)),
          totalTimeSpent: stats.totalTimeSpent + body.timeSpent,
          experience: stats.experience + Math.round(score / 10),
        },
      });
    }

    return NextResponse.json(
      {
        message: 'Quiz submitted successfully',
        result: {
          id: quizResult.id,
          score: quizResult.score,
          correctAnswers: quizResult.correctAnswers,
          totalQuestions: quizResult.totalQuestions,
          accuracy: quizResult.accuracy,
          timeSpent: quizResult.timeSpent,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[quiz/submit] Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}
