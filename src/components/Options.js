export default function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            answer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => {
            dispatch({
              type: "newAnswer",
              payload: index,
            });
          }}
          key={option}
          disabled={answer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
