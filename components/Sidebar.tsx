'use client';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="w-64 bg-slate-800 text-white h-full fixed">
      <ul className="p-4 space-y-2">
        <li><Link href="/quiz-home" className="block px-3 py-2 rounded hover:bg-slate-700">Home</Link></li>
        <li><Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-slate-700">Dashboard</Link></li>
        …other links…
      </ul>
    </nav>
  );
}