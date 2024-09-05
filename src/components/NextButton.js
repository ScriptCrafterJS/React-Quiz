export default function NextButton({ dispatch, index, numOfQuestions }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      {index !== numOfQuestions - 1 ? "Next" : "Finish"}
    </button>
  );
}
