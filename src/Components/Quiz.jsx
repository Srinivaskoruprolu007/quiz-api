import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { QuizContext } from '../Services/Context';

function Quiz() {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [questions, setQuestions] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const { score, setScore, setGameState, setUserAnswers, difficulty, category } = useContext(QuizContext);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&category=${category}&type=multiple`);
        setQuestions(response.data.results);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [difficulty, category]);

  // Shuffle options only when the question changes
  useEffect(() => {
    if (questions.length > 0) {
      const options = [
        ...questions[currQuestion].incorrect_answers,
        questions[currQuestion].correct_answer,
      ];
      setShuffledOptions(options.sort(() => Math.random() - 0.5)); // Shuffle once
    }
  }, [currQuestion, questions]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const nextQuestion = () => {
    const correctAnswer = questions[currQuestion].correct_answer;

    setUserAnswers((prev) => [
      ...prev,
      { 
        question: questions[currQuestion].question,
        selected: selectedOption,
        correct: correctAnswer 
      }
    ]);

    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption("");
    setCurrQuestion(currQuestion + 1);
  };

  const finishQuiz = () => {
    const correctAnswer = questions[currQuestion].correct_answer;

    setUserAnswers((prev) => [
      ...prev,
      { 
        question: questions[currQuestion].question,
        selected: selectedOption,
        correct: correctAnswer 
      }
    ]);

    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }

    setGameState("endScreen");
  };

  const currentQuestion = questions[currQuestion];

  return (
    <div className="Quiz">
      {currentQuestion ? (
        <>
          <div className="question-text">{currentQuestion.question}</div>
          <div className="Options">
            {shuffledOptions.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="quiz-navigation">
            {currQuestion === questions.length - 1 ? (
              <button className="next-button" onClick={finishQuiz} disabled={!selectedOption}>
                Finish Quiz
              </button>
            ) : (
              <button className="next-button" onClick={nextQuestion} disabled={!selectedOption}>
                Next Question
              </button>
            )}
          </div>
        </>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default Quiz;
