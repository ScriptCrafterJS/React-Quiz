import { useQuiz } from "../contexts/QuizProvider";

export default function Progress() {
  const { index, numOfQuestions, points, totalPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question: <strong>{index + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}
