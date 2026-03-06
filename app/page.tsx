import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-600 text-white">

      <h1 className="text-5xl font-bold mb-6">
        ⚽ Football Quiz
      </h1>

      <p className="mb-8 text-lg">
        Test your football knowledge!
      </p>

      <Link
        href="/quiz"
        className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold"
      >
        Start Quiz
      </Link>

      <Link
        href="/leaderboard"
        className="mt-4 underline"
      >
        View Leaderboard
      </Link>

    </div>
  );
}