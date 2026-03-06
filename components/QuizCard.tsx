type Question = {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
};

type Props = {
  question: Question;
  onAnswer: (answer: string) => void;
};
export default function QuizCard({ question, onAnswer }: Props) {
  return (
    <div className="border p-6 rounded-xl bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onAnswer(question.optionA)} className="quiz-btn">
          {question.optionA}
        </button>

        <button onClick={() => onAnswer(question.optionB)} className="quiz-btn">
          {question.optionB}
        </button>

        <button onClick={() => onAnswer(question.optionC)} className="quiz-btn">
          {question.optionC}
        </button>

        <button onClick={() => onAnswer(question.optionD)} className="quiz-btn">
          {question.optionD}
        </button>
      </div>
    </div>
  );
}