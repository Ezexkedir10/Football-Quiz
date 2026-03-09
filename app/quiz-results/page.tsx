'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

function generateConfettiPieces() {
  return [...Array(20)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    x: (Math.random() - 0.5) * 100,
    duration: 2 + Math.random(),
  }));
}

export default function QuizResultsPage() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score') || '0', 10);
  const [confettiPieces] = useState(generateConfettiPieces());

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return { message: 'Outstanding!', color: '#10B981', emoji: '🏆' };
    if (score >= 80) return { message: 'Excellent!', color: '#3B82F6', emoji: '⭐' };
    if (score >= 70) return { message: 'Good Job!', color: '#F59E0B', emoji: '👏' };
    if (score >= 60) return { message: 'Not Bad!', color: '#8B5CF6', emoji: '💪' };
    return { message: 'Keep Trying!', color: '#EF4444', emoji: '📚' };
  };

  const performance = getPerformanceMessage(score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Confetti effect background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confettiPieces.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981'][piece.id % 4],
              left: `${piece.left}%`,
            }}
            animate={{
              y: [-10, 400],
              x: [0, piece.x],
              opacity: [1, 0],
            }}
            transition={{
              duration: piece.duration,
              delay: piece.id * 0.05,
            }}
          />
        ))}
      </div>

      {/* Result card */}
      <motion.div
        className="relative bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-12 max-w-md w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Performance emoji */}
        <motion.div
          className="text-6xl text-center mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {performance.emoji}
        </motion.div>

        {/* Message */}
        <motion.h1
          className="text-4xl font-bold text-center mb-2"
          style={{ color: performance.color }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {performance.message}
        </motion.h1>

        {/* Score */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-6xl font-bold text-white mb-2">{score}%</div>
          <p className="text-slate-400">Your Score</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">100%</p>
            <p className="text-xs text-slate-400">Completion</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">+50</p>
            <p className="text-xs text-slate-400">XP Earned</p>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/quiz-home" className="block">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Try Another Quiz
            </Button>
          </Link>
          <Link href="/dashboard" className="block">
            <Button variant="outline" className="w-full">
              View Dashboard
            </Button>
          </Link>
          <Link href="/leaderboard" className="block">
            <Button variant="outline" className="w-full">
              Check Leaderboard
            </Button>
          </Link>
        </motion.div>

        {/* Encouragement message */}
        <motion.p
          className="text-center text-slate-400 text-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {score >= 80
            ? "You're on fire! Keep up the momentum!"
            : 'Practice makes perfect. Try again to improve!'}
        </motion.p>
      </motion.div>
    </div>
  );
}
