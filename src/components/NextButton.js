import { useQuiz } from "../contexts/QuizProvider";

export default function NextButton() {
  const { nextQuestion, index, numOfQuestions } = useQuiz();
  return (
    <button className="btn btn-ui" onClick={nextQuestion}>
      {index !== numOfQuestions - 1 ? "Next" : "Finish"}
    </button>
  );
}
