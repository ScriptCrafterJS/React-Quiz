import Options from "./Options";
import { useQuiz } from "../contexts/QuizProvider";
export default function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}
