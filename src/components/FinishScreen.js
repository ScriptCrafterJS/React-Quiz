export default function FinishScreen({
  points,
  totalPoints,
  bestScore,
  dispatch,
}) {
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
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart quiz
      </button>
    </>
  );
}
