import { useEffect } from "react";
export default function Timer({ dispatch, timeRemain }) {
  useEffect(
    function () {
      const timer = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(timer);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {`${Math.floor(timeRemain / 60)}`.padStart(2, 0)}:
      {`${timeRemain % 60}`.padEnd(2, 0)}
    </div>
  );
}
