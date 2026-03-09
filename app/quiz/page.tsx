'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import AnimatedQuizQuestion from '@/components/AnimatedQuizQuestion';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Question {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  difficulty: string;
}

interface QuizData {
  category: {
    id: string;
    name: string;
    description: string;
  };
  questions: Question[];
  totalQuestions: number;
}

export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token, isAuthenticated } = useAuth();
  const categoryId = searchParams.get('category');

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch quiz questions
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/questions?categoryId=${categoryId}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to fetch questions');
        }

        const data = await response.json();
        setQuizData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quiz');
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchQuestions();
    } else {
      router.push('/quiz-home');
    }
  }, [categoryId, token, isAuthenticated, router]);

  const currentQuestion = quizData?.questions[currentIndex];
  const isLastQuestion = currentIndex === (quizData?.totalQuestions ?? 0) - 1;
  const isAnswered = !!selectedAnswers[currentQuestion?.id ?? ''];

  const handleSelectAnswer = (answer: string) => {
    if (!currentQuestion) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentIndex < (quizData?.totalQuestions ?? 0) - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const answers = quizData!.questions.map((q) => ({
        questionId: q.id,
        selectedAnswer: selectedAnswers[q.id] || '',
      }));

      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryId,
          answers,
          timeSpent: timeElapsed,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit quiz');
      }

      const data = await response.json();
      router.push(
        `/quiz-results?resultId=${data.result.id}&score=${data.result.score}`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-slate-300 text-lg">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 max-w-md text-center">
          <p className="text-red-300 mb-4">{error}</p>
          <Button
            onClick={() => router.push('/quiz-home')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  if (!quizData || !currentQuestion) {
    return null;
  }

  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = (answeredCount / quizData.totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header with progress and timer */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/80 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{quizData.category.name}</h1>
            <p className="text-sm text-slate-400">{quizData.category.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-400 font-mono">
              {formatTime(timeElapsed)}
            </div>
            <p className="text-xs text-slate-400">Answered: {answeredCount}/{quizData.totalQuestions}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-4xl mx-auto px-4 pb-4">
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <AnimatedQuizQuestion
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={quizData.totalQuestions}
          onSelectAnswer={handleSelectAnswer}
          selectedAnswer={selectedAnswers[currentQuestion.id]}
          isAnswered={isAnswered}
        />

        {/* Navigation buttons */}
        <motion.div
          className="mt-12 flex items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
            className="flex-1"
          >
            Previous
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || answeredCount !== quizData.totalQuestions}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          )}
        </motion.div>

        {/* Question navigation grid */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-sm text-slate-400 mb-4">Jump to question:</p>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {quizData.questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-full aspect-square rounded-lg font-semibold transition-all ${
                  idx === currentIndex
                    ? 'bg-blue-500 text-white scale-105'
                    : selectedAnswers[q.id]
                    ? 'bg-green-500/30 text-green-300 border border-green-500'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
