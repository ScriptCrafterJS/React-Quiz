import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizProvider";

export default function Timer() {
  const { timerTick, timeRemain } = useQuiz();
  useEffect(
    function () {
      const timer = setInterval(function () {
        timerTick();
      }, 1000);

      return () => clearInterval(timer);
    },
    [timerTick]
  );
  return (
    <div className="timer">
      {`${Math.floor(timeRemain / 60)}`.padStart(2, 0)}:
      {`${timeRemain % 60}`.padEnd(2, 0)}
    </div>
  );
}
