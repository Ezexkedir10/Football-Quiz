"use client";

import { useEffect, useState } from "react";

export default function Leaderboard() {
  type Score = {
  id: number;
  name: string;
  score: number;
};

const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    fetch("/api/quiz")
      .then((res) => res.json())
      .then((data) => setScores(data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">🏆 Leaderboard</h1>

      {scores.map((s, i) => (
        <div key={i} className="border p-3 mb-2">
          {s.name} — {s.score}
        </div>
      ))}
    </div>
  );
}