// import { Scores } from "@/types/quiz";

interface ScoreBoardProps {
  score: number;
}

export default function ScoreBoard({ score }: ScoreBoardProps) {
  return (
    <div className="text-xl font-bold mt-4">
      Score: {score}
    </div>
  );
}