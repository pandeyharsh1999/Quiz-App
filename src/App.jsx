import { useEffect, useState } from "react";
import "./App.css";
import { questions } from "./question";
import QuestionCard from "./QuestionCard";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [unAnswered, setUnAnswered] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(5);

  let timeLeft = time;

  useEffect(() => {
    if (questions.length < questionNumber) return;

    if (time < 0) {
      setUnAnswered((prev) => [...prev, questions[questionNumber - 1]]);
      setQuestionNumber((prev) => prev + 1);

      setTime(5);
    }

    let timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <div className="App">
      <div className="container">
        {questions.length < questionNumber ? (
          <div className="result">
            <p>
              Score: {score}/{questions.length}
            </p>
            {!!unAnswered.length ? (
              <div>
                <p style={{ marginBottom: 4 }}>Unanswered Questions:</p>
                {unAnswered.map((que) => (
                  <p key={que.id}>
                    Q{que.id}
                    {")"} {que.question}
                  </p>
                ))}
              </div>
            ) : (
              <p>You answered all questions</p>
            )}
          </div>
        ) : (
          <>
            <div className="header">
              <p>
                Question {questionNumber} / {questions.length}
              </p>
              <p>Time Left: 0:{timeLeft}</p>
            </div>
            <QuestionCard
              question={questions[questionNumber - 1]}
              setQuestionNumber={setQuestionNumber}
              score={score}
              setScore={setScore}
              setUnAnswered={setUnAnswered}
              setTime={setTime}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
