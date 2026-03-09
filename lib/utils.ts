import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-500'
  if (score >= 70) return 'text-blue-500'
  if (score >= 50) return 'text-yellow-500'
  return 'text-red-500'
}

export function getScoreBgColor(score: number): string {
  if (score >= 90) return 'bg-green-500/20'
  if (score >= 70) return 'bg-blue-500/20'
  if (score >= 50) return 'bg-yellow-500/20'
  return 'bg-red-500/20'
}

export function getScoreBorderColor(score: number): string {
  if (score >= 90) return 'border-green-500/50'
  if (score >= 70) return 'border-blue-500/50'
  if (score >= 50) return 'border-yellow-500/50'
  return 'border-red-500/50'
}
