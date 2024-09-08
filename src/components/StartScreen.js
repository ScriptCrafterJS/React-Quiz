import { useQuiz } from "../contexts/QuizProvider";

export default function StartScreen() {
  const { numOfQuestions, startQuiz } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{numOfQuestions} questions to test your react mastery!</h3>
      <button className="btn btn-ui" onClick={startQuiz}>
        Lets start
      </button>
    </div>
  );
}
