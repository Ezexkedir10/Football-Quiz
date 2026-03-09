'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  questionsCount?: number;
}

interface QuizCategoriesProps {
  categories: Category[];
}

export default function QuizCategories({ categories }: QuizCategoriesProps) {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category) => (
        <Link key={category.id} href={`/quiz?category=${category.id}`}>
          <motion.div
            className={`relative p-6 rounded-xl border border-opacity-30 cursor-pointer overflow-hidden group h-full`}
            style={{
              backgroundColor: `${category.color}20`,
              borderColor: category.color,
            }}
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{ backgroundColor: category.color }}
            />

            {/* Content */}
            <div className="relative z-10">
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
              <p className="text-slate-300 text-sm mb-4">{category.description}</p>
              
              {category.questionsCount && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {category.questionsCount} questions
                  </span>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: category.color,
                      color: '#fff',
                    }}
                  >
                    Start Quiz
                  </span>
                </div>
              )}
            </div>

            {/* Hover border effect */}
            <div
              className="absolute inset-0 rounded-xl border border-opacity-0 group-hover:border-opacity-100 transition-all duration-300 pointer-events-none"
              style={{ borderColor: category.color }}
            />
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}
