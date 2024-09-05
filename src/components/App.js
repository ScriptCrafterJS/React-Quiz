import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
const initialState = {
  questions: [],

  // status of our app, loading, error, ready: when the data is fetched, active: when the quiz is running, finished: quiz is finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  bestScore: 0,
  timeRemain: null,
};

const TIME_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
        timeRemain: state.questions.length * TIME_PER_QUESTION,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions[state.index];
      console.log(state);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      const isFinished = state.index === state.questions.length - 1;
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        status: isFinished ? "finished" : state.status,
        bestScore: Math.max(state.points, state.bestScore),
      };
    case "reset":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        timeRemain: state.questions.length * TIME_PER_QUESTION,
      };
    case "tick":
      return {
        ...state,
        timeRemain: state.timeRemain > 0 ? state.timeRemain - 1 : 0,
        status: state.timeRemain > 0 ? state.status : "finished",
      };
    case "setBestScore":
      return {
        ...state,
        bestScore:
          localStorage.getItem("bestScore") === "null"
            ? 0
            : localStorage.getItem("bestScore"),
      };
    default:
      throw new Error("Unknown action");
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, bestScore, timeRemain },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions?.length;
  const totalPoints = questions.reduce((acc, question) => {
    return acc + question.points;
  }, 0);

  // fetch the questions on mount from our fake API
  useEffect(
    function () {
      // the server is running using json-server npm package
      fetch("http://localhost:3001/questions")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch(() => dispatch({ type: "dataFailed" }));
    },
    [dispatch]
  );

  useEffect(
    function () {
      dispatch({ type: "setBestScore" });
    },
    [dispatch]
  );
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numOfQuestions={numOfQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer timeRemain={timeRemain} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                index={index}
                numOfQuestions={numOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            bestScore={bestScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
