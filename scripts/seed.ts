import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.leaderboardEntry.deleteMany();
  await prisma.userStatistics.deleteMany();
  await prisma.quizAnswer.deleteMany();
  await prisma.quizResult.deleteMany();
  await prisma.quizSession.deleteMany();
  await prisma.question.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const premierLeague = await prisma.category.create({
    data: {
      name: 'Premier League',
      description: 'English football excellence',
      icon: '⚽',
      color: '#3B82F6',
      difficulty: 'medium',
    },
  });

  const championsLeague = await prisma.category.create({
    data: {
      name: 'Champions League',
      description: 'European elite competitions',
      icon: '👑',
      color: '#8B5CF6',
      difficulty: 'hard',
    },
  });

  const worldCup = await prisma.category.create({
    data: {
      name: 'World Cup',
      description: 'International glory moments',
      icon: '🏆',
      color: '#F59E0B',
      difficulty: 'hard',
    },
  });

  await prisma.category.create({
    data: {
      name: 'Legendary Players',
      description: 'Greatest football icons',
      icon: '⭐',
      color: '#EC4899',
      difficulty: 'medium',
    },
  });

  await prisma.category.create({
    data: {
      name: 'Club History',
      description: 'Famous teams and rivalries',
      icon: '🏟️',
      color: '#10B981',
      difficulty: 'easy',
    },
  });

  await prisma.category.create({
    data: {
      name: 'Tactics & Rules',
      description: 'Game strategy and regulations',
      icon: '🎯',
      color: '#F87171',
      difficulty: 'medium',
    },
  });

  // Create sample questions for Premier League
  const plQuestions = [
    {
      question: 'Which team has won the most Premier League titles?',
      optionA: 'Manchester United',
      optionB: 'Manchester City',
      optionC: 'Arsenal',
      optionD: 'Chelsea',
      answer: 'B',
      difficulty: 'easy',
      categoryId: premierLeague.id,
    },
    {
      question: 'In what year did the Premier League start?',
      optionA: '1990',
      optionB: '1992',
      optionC: '1994',
      optionD: '1996',
      answer: 'B',
      difficulty: 'easy',
      categoryId: premierLeague.id,
    },
    {
      question: 'How many teams compete in the Premier League?',
      optionA: '18',
      optionB: '20',
      optionC: '22',
      optionD: '24',
      answer: 'B',
      difficulty: 'easy',
      categoryId: premierLeague.id,
    },
  ];

  await prisma.question.createMany({
    data: plQuestions,
  });

  // Create sample questions for Champions League
  const clQuestions = [
    {
      question: 'Which team has won the most UEFA Champions League titles?',
      optionA: 'Bayern Munich',
      optionB: 'Real Madrid',
      optionC: 'AC Milan',
      optionD: 'Liverpool',
      answer: 'B',
      difficulty: 'medium',
      categoryId: championsLeague.id,
    },
    {
      question: 'In what year was the European Cup renamed to Champions League?',
      optionA: '1990',
      optionB: '1992',
      optionC: '1995',
      optionD: '1997',
      answer: 'B',
      difficulty: 'hard',
      categoryId: championsLeague.id,
    },
  ];

  await prisma.question.createMany({
    data: clQuestions,
  });

  // Create sample questions for World Cup
  const wcQuestions = [
    {
      question: 'Which country won the first FIFA World Cup?',
      optionA: 'Brazil',
      optionB: 'Italy',
      optionC: 'Uruguay',
      optionD: 'Germany',
      answer: 'C',
      difficulty: 'easy',
      categoryId: worldCup.id,
    },
  ];

  await prisma.question.createMany({
    data: wcQuestions,
  });

  // Create achievements
  const achievements = [
    {
      name: 'First Steps',
      description: 'Complete your first quiz',
      icon: '👣',
      criteria: 'complete_first_quiz',
      reward: 100,
    },
    {
      name: 'Perfect Score',
      description: 'Score 100% on a quiz',
      icon: '💯',
      criteria: 'perfect_score',
      reward: 500,
    },
    {
      name: 'Streak Master',
      description: 'Get 10 correct answers in a row',
      icon: '🔥',
      criteria: 'streak_10',
      reward: 300,
    },
    {
      name: 'Quiz Master',
      description: 'Complete 100 quizzes',
      icon: '🏆',
      criteria: 'complete_100_quizzes',
      reward: 1000,
    },
  ];

  await prisma.achievement.createMany({
    data: achievements,
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
