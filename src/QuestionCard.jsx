import { useState } from "react";

export default function QuestionCard({
  question,
  setQuestionNumber,
  setScore,
  score,
  setTime,
}) {
  const [clicked, setClicked] = useState("");

  const handleClick = (option) => {
    setClicked(option.label);
    if (option.isCorrect) setScore(score + 1);
    const timer = setTimeout(() => {
      setClicked("");
      setQuestionNumber(question.id + 1);
      setTime(5);

      clearTimeout(timer);
    }, 1000);
  };

  const getClassName = (option) => {
    if (!clicked) return;
    if (option.isCorrect) return "green pointer-none";

    if (option.label == clicked && !option.isCorrect) return "red pointer-none";

    return "pointer-none";
  };

  return (
    <div className="Card">
      <p className="question">{question.question}</p>
      <div className="answers">
        {question.options.map((option) => (
          <p
            onClick={() => handleClick(option)}
            className={getClassName(option)}
          >
            {option.label}
          </p>
        ))}
      </div>
    </div>
  );
}
