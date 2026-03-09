'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-slate-300 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const stats = [
    { label: 'Total Quizzes', value: '12', icon: '📊', color: '#3B82F6' },
    { label: 'Current Streak', value: '5', icon: '🔥', color: '#F59E0B' },
    { label: 'Best Score', value: '96%', icon: '🏆', color: '#10B981' },
    { label: 'Experience Points', value: '2,450', icon: '⭐', color: '#8B5CF6' },
  ];

  const recentResults = [
    {
      id: 1,
      category: 'Premier League',
      score: 92,
      date: 'Today',
      timeSpent: '8:32',
    },
    {
      id: 2,
      category: 'Champions League',
      score: 88,
      date: 'Yesterday',
      timeSpent: '7:45',
    },
    {
      id: 3,
      category: 'World Cup',
      score: 96,
      date: '2 days ago',
      timeSpent: '6:28',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 sticky top-0 z-50 backdrop-blur-md bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400">Welcome back, {user?.username}!</p>
          </div>
          <Link href="/quiz-home">
            <Button className="bg-blue-600 hover:bg-blue-700">Take a Quiz</Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Profile Section */}
        <motion.div
          className="bg-slate-800 border border-slate-700 rounded-xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-3xl">
              ⚽
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{user?.username}</h2>
              <p className="text-slate-400 mb-4">{user?.email}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-300">Level 8</span>
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </div>
              </div>
            </div>
            <Link href="/profile">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
              variants={itemVariants}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Results */}
        <motion.div
          className="bg-slate-800 border border-slate-700 rounded-lg p-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Recent Results</h3>
          <div className="space-y-4">
            {recentResults.map((result) => (
              <motion.div
                key={result.id}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="flex-1">
                  <p className="text-white font-semibold">{result.category}</p>
                  <p className="text-sm text-slate-400">{result.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-400">{result.score}%</p>
                  <p className="text-sm text-slate-400">{result.timeSpent}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <Link href="/leaderboard" className="block">
            <motion.button
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all text-center"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-2">📊</div>
              <p className="text-white font-semibold">Leaderboard</p>
              <p className="text-sm text-slate-400 mt-1">Compare your scores</p>
            </motion.button>
          </Link>

          <Link href="/achievements" className="block">
            <motion.button
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all text-center"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-2">🏅</div>
              <p className="text-white font-semibold">Achievements</p>
              <p className="text-sm text-slate-400 mt-1">Unlock badges</p>
            </motion.button>
          </Link>

          <Link href="/quiz-home" className="block">
            <motion.button
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all text-center"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-white font-semibold">New Quiz</p>
              <p className="text-sm text-slate-400 mt-1">Start challenging</p>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
