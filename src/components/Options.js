import { useQuiz } from "../contexts/QuizProvider";

export default function Options() {
  const { questions, index, newAnswer, answer } = useQuiz();
  const question = questions[index];
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
          onClick={() => newAnswer(index)}
          key={option}
          disabled={answer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
