import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizProvider";
export default function FinishScreen() {
  const { points, totalPoints, bestScore, reset } = useQuiz();
  useEffect(
    function () {
      localStorage.setItem("bestScore", bestScore);
    },
    [bestScore]
  );

  //derived state
  const percentage = Math.ceil((points / totalPoints) * 100);
  return (
    <>
      <p className="result">
        {percentage >= 90 ? "😎" : percentage >= 50 ? "😁" : "🤔"} You scored{" "}
        <strong>{points}</strong> out of {totalPoints} ({percentage}%)
      </p>
      <p className="highscore">
        Best Score: <strong>{bestScore}</strong> points
      </p>
      <button className="btn btn-ui" onClick={reset}>
        Restart quiz
      </button>
    </>
  );
}
