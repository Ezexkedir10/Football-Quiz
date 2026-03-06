"use client";

import { useEffect, useState } from "react";
import QuizCard from "@/components/QuizCard";
import Timer from "@/components/Timer";
import ScoreBoard from "@/components/ScoreBoard";

export default function QuizPage() {
  
type Question = {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
};
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAnswer = (answer: string) => {
    if (answer === questions[index].answer) {
      setScore(score + 1);
    }

    nextQuestion();
  };

  const nextQuestion = () => {
    setIndex(index + 1);
  };

  if (!questions.length) return <p>Loading...</p>;

  if (index >= questions.length)
    return <h1 className="text-3xl p-10">Final Score: {score}</h1>;

  return (
    <div className="max-w-xl mx-auto p-10">

      <Timer onTimeUp={nextQuestion} />

      <QuizCard
        question={questions[index]}
        onAnswer={handleAnswer}
      />

      <ScoreBoard score={score} />

    </div>
  );
}