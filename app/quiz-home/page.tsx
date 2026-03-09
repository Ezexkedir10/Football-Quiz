'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import QuizCategories from '@/components/QuizCategories';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'premier-league',
    name: 'Premier League',
    description: 'English football excellence',
    color: '#3B82F6',
    icon: '⚽',
    questionsCount: 50,
  },
  {
    id: 'champions-league',
    name: 'Champions League',
    description: 'European elite competitions',
    color: '#8B5CF6',
    icon: '👑',
    questionsCount: 45,
  },
  {
    id: 'world-cup',
    name: 'World Cup',
    description: 'International glory moments',
    color: '#F59E0B',
    icon: '🏆',
    questionsCount: 60,
  },
  {
    id: 'players',
    name: 'Legendary Players',
    description: 'Greatest football icons',
    color: '#EC4899',
    icon: '⭐',
    questionsCount: 55,
  },
  {
    id: 'teams',
    name: 'Club History',
    description: 'Famous teams and rivalries',
    color: '#10B981',
    icon: '🏟️',
    questionsCount: 50,
  },
  {
    id: 'tactics',
    name: 'Tactics & Rules',
    description: 'Game strategy and regulations',
    color: '#F87171',
    icon: '🎯',
    questionsCount: 40,
  },
];

export default function QuizHomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header with Navigation */}
      <nav className="border-b border-slate-700 sticky top-0 z-50 backdrop-blur-md bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Football Quiz</h1>
            <p className="text-sm text-slate-400">Master the beautiful game</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-300">{user?.username}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700">Dashboard</Button>
            </Link>
            <Link href="/auth/logout" onClick={() => window.location.href = '/auth/login'}>
              <Button variant="outline">Logout</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-40 -left-40 animate-blob"></div>
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -bottom-40 right-20 animate-blob animation-delay-2000"></div>
          <div className="absolute w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 top-1/2 right-40 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Test Your Football Knowledge
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Choose a category and compete with other fans worldwide
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/leaderboard">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  View Leaderboard
                </Button>
              </Link>
              <Link href="/achievements">
                <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                  My Achievements
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-3 gap-4 mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">6</p>
              <p className="text-sm text-slate-400">Categories</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">300+</p>
              <p className="text-sm text-slate-400">Questions</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-amber-400">∞</p>
              <p className="text-sm text-slate-400">Challenges</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-4xl font-bold text-white mb-4">Select a Category</h3>
          <p className="text-slate-300">Choose your difficulty and get started</p>
        </motion.div>

        <QuizCategories categories={categories} />
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400">
          <p>© 2024 Football Quiz. Test your knowledge, challenge your friends.</p>
        </div>
      </div>
    </div>
  );
}
