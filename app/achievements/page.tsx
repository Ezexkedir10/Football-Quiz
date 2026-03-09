'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export default function AchievementsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first quiz',
      icon: '👣',
      unlocked: true,
      unlockedAt: '2024-03-01',
    },
    {
      id: '2',
      name: 'Quiz Master',
      description: 'Complete 10 quizzes',
      icon: '🎯',
      unlocked: true,
      unlockedAt: '2024-03-05',
    },
    {
      id: '3',
      name: 'Perfect Score',
      description: 'Score 100% on any quiz',
      icon: '💯',
      unlocked: false,
      progress: 92,
      maxProgress: 100,
    },
    {
      id: '4',
      name: 'Streak Master',
      description: 'Get 10 correct answers in a row',
      icon: '🔥',
      unlocked: true,
      unlockedAt: '2024-03-03',
    },
    {
      id: '5',
      name: 'Speed Runner',
      description: 'Complete a quiz in under 5 minutes',
      icon: '⚡',
      unlocked: false,
      progress: 4,
      maxProgress: 1,
    },
    {
      id: '6',
      name: 'Historian',
      description: 'Complete World Cup category',
      icon: '📚',
      unlocked: true,
      unlockedAt: '2024-03-04',
    },
    {
      id: '7',
      name: 'Leaderboard Legend',
      description: 'Reach top 10 in leaderboard',
      icon: '🏆',
      unlocked: false,
      progress: 45,
      maxProgress: 100,
    },
    {
      id: '8',
      name: 'Dedicated Fan',
      description: 'Complete 50 quizzes',
      icon: '⭐',
      unlocked: false,
      progress: 8,
      maxProgress: 50,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-slate-300 text-lg">Loading achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 sticky top-0 z-50 backdrop-blur-md bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Achievements</h1>
              <p className="text-slate-400">
                {unlockedCount} of {totalCount} unlocked
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <motion.div
          className="mb-12 bg-slate-800 border border-slate-700 rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Your Progress</h2>
            <p className="text-3xl font-bold text-blue-400">{unlockedCount}/{totalCount}</p>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="text-sm text-slate-400 mt-4">
            Complete more quizzes and challenges to unlock additional achievements!
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`relative p-6 rounded-lg border transition-all overflow-hidden group ${
                achievement.unlocked
                  ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50'
                  : 'bg-slate-900/30 border-slate-700/50 opacity-75'
              }`}
              variants={itemVariants}
              whileHover={achievement.unlocked ? { y: -4 } : {}}
            >
              {/* Background glow for unlocked */}
              {achievement.unlocked && (
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              )}

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon */}
                <motion.div
                  className="text-5xl mb-4 inline-block"
                  animate={achievement.unlocked ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {achievement.icon}
                </motion.div>

                {/* Name */}
                <h3 className="text-lg font-bold text-white mb-2">{achievement.name}</h3>

                {/* Description */}
                <p className="text-sm text-slate-400 mb-4">{achievement.description}</p>

                {/* Status */}
                {achievement.unlocked ? (
                  <div className="inline-block px-3 py-1 bg-green-500/20 border border-green-500 rounded-full text-green-300 text-xs font-semibold">
                    ✓ Unlocked
                  </div>
                ) : (
                  <div className="space-y-2">
                    {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                      <>
                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                            }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                        <p className="text-xs text-slate-400">
                          {achievement.progress}/{achievement.maxProgress}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Locked overlay */}
              {!achievement.unlocked && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Encouragement */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-slate-400 mb-4">
            Keep playing to unlock all achievements and become a true Football Quiz Master!
          </p>
          <Link href="/quiz-home">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Continue Playing
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
