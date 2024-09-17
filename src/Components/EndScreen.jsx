import React, { useContext } from 'react';
import { QuizContext } from '../Services/Context';

function EndScreen() {
  const { score, userAnswers, setGameState } = useContext(QuizContext);

  const correctAnswers = userAnswers.filter((answer) => answer.selected === answer.correct).length;

  return (
    <div className="EndScreen">
      <h2>Quiz Completed!</h2>
      <p>Score: {score} / {userAnswers.length}</p>
      <div className="question-summary">
        <h3>Question Summary:</h3>
        {userAnswers.map((answer, index) => (
          <div key={index} className={`QuestionResult ${answer.selected === answer.correct ? 'correct' : 'incorrect'}`}>
            <p><strong>Q{index + 1}: </strong>{answer.question}</p>
            <p><strong>Your Answer:</strong> {answer.selected}</p>
            <p><strong>Correct Answer:</strong> {answer.correct}</p>
          </div>
        ))}
      </div>
      <button className="start-button" onClick={() => setGameState('menu')}>Back to Menu</button>
    </div>
  );
}

export default EndScreen;
