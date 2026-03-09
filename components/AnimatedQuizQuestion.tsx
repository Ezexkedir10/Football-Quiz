'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  difficulty: string;
}

interface AnimatedQuizQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onSelectAnswer: (answer: string) => void;
  selectedAnswer?: string;
  isAnswered: boolean;
}

const options = [
  { key: 'A', label: 'A' },
  { key: 'B', label: 'B' },
  { key: 'C', label: 'C' },
  { key: 'D', label: 'D' },
];

const difficultyColors = {
  easy: '#10B981',
  medium: '#F59E0B',
  hard: '#EF4444',
};

export default function AnimatedQuizQuestion({
  question,
  currentIndex,
  totalQuestions,
  onSelectAnswer,
  selectedAnswer,
  isAnswered,
}: AnimatedQuizQuestionProps) {
  const getOptionText = (optionKey: string): string => {
    return question[`option${optionKey}` as keyof Question] as string;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const optionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Progress bar */}
      <motion.div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-300">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{
              backgroundColor: `${difficultyColors[question.difficulty as keyof typeof difficultyColors] || '#F59E0B'}20`,
              color: difficultyColors[question.difficulty as keyof typeof difficultyColors] || '#F59E0B',
            }}
          >
            {question.difficulty.toUpperCase()}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Question */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
          {question.question}
        </h2>
      </motion.div>

      {/* Options */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <AnimatePresence>
          {options.map((option) => {
            const optionText = getOptionText(option.key);
            const isSelected = selectedAnswer === option.key;

            return (
              <motion.button
                key={option.key}
                variants={optionVariants}
                initial="hidden"
                animate="visible"
                whileHover={!isAnswered ? 'hover' : {}}
                whileTap={!isAnswered ? 'tap' : {}}
                onClick={() => {
                  if (!isAnswered) onSelectAnswer(option.key);
                }}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left font-medium ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/20 text-blue-100'
                    : 'border-slate-600 bg-slate-800/50 text-slate-200 hover:border-slate-500'
                } disabled:cursor-not-allowed`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {option.label}
                  </div>
                  <span className="flex-1">{optionText}</span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Helpful hint */}
      {!selectedAnswer && (
        <motion.div
          className="mt-8 text-sm text-slate-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Click an option to submit your answer
        </motion.div>
      )}
    </motion.div>
  );
}
