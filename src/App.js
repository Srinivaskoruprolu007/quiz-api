import "./App.css";
import { useState } from "react";
import MainMenu from "./Components/MainMenu";
import Quiz from "./Components/Quiz";
import EndScreen from "./Components/EndScreen";
import { QuizContext } from "./Services/Context";

function App() {
  const [gameState, setGameState] = useState("menu");
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState(18); // Default to Computer Science

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <QuizContext.Provider
        value={{
          gameState,
          setGameState,
          score,
          setScore,
          userAnswers,
          setUserAnswers,
          difficulty,
          setDifficulty,
          category,
          setCategory,
        }}
      >
        {gameState === "menu" && <MainMenu />}
        {gameState === "quiz" && <Quiz />}
        {gameState === "endScreen" && <EndScreen />}
      </QuizContext.Provider>
    </div>
  );
}

export default App;
