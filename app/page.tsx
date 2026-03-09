'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';

export default function Home() {
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-40 -left-40 animate-blob"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -bottom-40 right-20 animate-blob animation-delay-2000"></div>
        <div className="absolute w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 top-1/2 right-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header Navigation */}
      <nav className="relative z-40 border-b border-slate-700/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">Football Quiz</div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/quiz-home">
                  <Button className="bg-blue-600 hover:bg-blue-700">Dashboard</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-balance">
              Test Your Football Knowledge
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 text-balance">
              Challenge yourself with our comprehensive football quiz. Compete globally and become a true football expert.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {isAuthenticated ? (
              <Link href="/quiz-home">
                <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                  Start Quiz Now
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" className="px-8 py-6 text-lg">
                    Already Have Account?
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 my-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              icon: '⚽',
              title: '6 Categories',
              description: 'Premier League, Champions League, World Cup, and more',
            },
            {
              icon: '🏆',
              title: 'Compete Globally',
              description: 'Challenge players worldwide and climb the leaderboard',
            },
            {
              icon: '🎯',
              title: '300+ Questions',
              description: 'Constantly updated with the latest football trivia',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { stat: '10K+', label: 'Players' },
            { stat: '50K+', label: 'Quizzes Completed' },
            { stat: '1M+', label: 'Questions Answered' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 text-center"
              variants={itemVariants}
            >
              <p className="text-2xl font-bold text-blue-400">{item.stat}</p>
              <p className="text-sm text-slate-400 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Play?</h2>
          <p className="text-slate-300 mb-6">
            Join thousands of football enthusiasts testing their knowledge daily.
          </p>
          {isAuthenticated ? (
            <Link href="/quiz-home">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                Start Playing
              </Button>
            </Link>
          ) : (
            <Link href="/auth/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                Create Free Account
              </Button>
            </Link>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-700 mt-20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          <p>© 2026 Football Quiz. Built with passion for football fans worldwide.</p>
        </div>
      </footer>
    </div>
  );
}
