'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  quizzes: number;
  streak: number;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = useState('all');
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        // Mock data - in production this would fetch from API
        const mockData: LeaderboardEntry[] = [
          { rank: 1, username: 'Alex_Khan', score: 2850, quizzes: 45, streak: 12 },
          { rank: 2, username: 'Emma_Football', score: 2720, quizzes: 42, streak: 8 },
          { rank: 3, username: 'James_Cooper', score: 2650, quizzes: 38, streak: 7 },
          { rank: 4, username: 'Sofia_Martinez', score: 2580, quizzes: 35, streak: 10 },
          { rank: 5, username: 'Michael_Smith', score: 2510, quizzes: 32, streak: 5 },
          { rank: 6, username: 'Lisa_Anderson', score: 2450, quizzes: 30, streak: 6 },
          { rank: 7, username: 'David_Brown', score: 2380, quizzes: 28, streak: 4 },
          { rank: 8, username: 'Sarah_Johnson', score: 2310, quizzes: 25, streak: 3 },
          { rank: 9, username: 'Chris_Wilson', score: 2240, quizzes: 23, streak: 2 },
          { rank: 10, username: 'Nina_Patel', score: 2170, quizzes: 20, streak: 9 },
        ];
        setEntries(mockData);
      } catch (error) {
        console.error('Failed to load leaderboard:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadLeaderboard();
  }, [filter]);

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-slate-300 text-lg">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 sticky top-0 z-50 backdrop-blur-md bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
              <p className="text-slate-400">Compete globally and climb the ranks</p>
            </div>
            <Link href="/quiz-home">
              <Button className="bg-blue-600 hover:bg-blue-700">Take a Quiz</Button>
            </Link>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            {['all', 'weekly', 'monthly'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header row */}
        <motion.div
          className="grid grid-cols-12 gap-4 mb-4 px-6 py-4 text-sm font-semibold text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Player</div>
          <div className="col-span-2 text-right">Score</div>
          <div className="col-span-2 text-right">Quizzes</div>
          <div className="col-span-2 text-right">Streak</div>
        </motion.div>

        {/* Entries */}
        <motion.div
          className="space-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {entries.map((entry) => (
            <motion.div
              key={entry.rank}
              className={`grid grid-cols-12 gap-4 px-6 py-4 rounded-lg border transition-all hover:scale-102 cursor-pointer ${
                entry.rank === 1
                  ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-amber-500/50'
                  : entry.rank === 2
                  ? 'bg-gradient-to-r from-slate-400/20 to-slate-500/20 border-slate-500/50'
                  : entry.rank === 3
                  ? 'bg-gradient-to-r from-orange-600/20 to-orange-700/20 border-orange-600/50'
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
              variants={itemVariants}
              whileHover={{ x: 4 }}
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center">
                <div
                  className={`text-2xl font-bold ${
                    entry.rank === 1
                      ? 'text-amber-400'
                      : entry.rank === 2
                      ? 'text-slate-300'
                      : entry.rank === 3
                      ? 'text-orange-400'
                      : 'text-slate-400'
                  }`}
                >
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                </div>
              </div>

              {/* Username */}
              <div className="col-span-5 flex items-center">
                <div>
                  <p className="font-semibold text-white">{entry.username}</p>
                  <p className="text-xs text-slate-400">Level {Math.floor(Math.random() * 15) + 1}</p>
                </div>
              </div>

              {/* Score */}
              <div className="col-span-2 flex items-center justify-end">
                <p className="text-lg font-bold text-blue-400">{entry.score.toLocaleString()}</p>
              </div>

              {/* Quizzes */}
              <div className="col-span-2 flex items-center justify-end">
                <p className="text-white">{entry.quizzes}</p>
              </div>

              {/* Streak */}
              <div className="col-span-2 flex items-center justify-end">
                <div className="flex items-center gap-1">
                  <span className="text-red-400">🔥</span>
                  <p className="text-white font-semibold">{entry.streak}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Your Rank (mock) */}
        <motion.div
          className="mt-12 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-1 flex items-center text-2xl">👤</div>
            <div className="col-span-5 flex items-center">
              <div>
                <p className="font-semibold text-white">You</p>
                <p className="text-sm text-slate-400">Your current ranking</p>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-end">
              <p className="text-lg font-bold text-blue-400">1,250</p>
            </div>
            <div className="col-span-2 flex items-center justify-end">
              <p className="text-white">8</p>
            </div>
            <div className="col-span-2 flex items-center justify-end">
              <div className="flex items-center gap-1">
                <span className="text-red-400">🔥</span>
                <p className="text-white font-semibold">3</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
