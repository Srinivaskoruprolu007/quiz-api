import React, { useContext, useState } from 'react';
import { QuizContext } from '../Services/Context';

const categories = [
  { id: 9, name: 'General Knowledge' },
  { id: 18, name: 'Computer Science' },
  { id: 17, name: 'Science & Nature' },
  { id: 11, name: 'Movies' },
  { id: 21, name: 'Sports' },
  { id: 23, name: 'History' },
  { id: 24, name: 'Politics' },
  { id: 25, name: 'Art' },
  { id: 26, name: 'Animals' },
  { id: 27, name: 'Vehicles' }
];

function MainMenu() {
  const { setGameState, setDifficulty, setCategory, setUserAnswers } = useContext(QuizContext);
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

  const handleStart = () => {
    if (name.trim() !== '') {
      setCategory(selectedCategory);
      setDifficulty(selectedDifficulty);
      setUserAnswers([]);
      setGameState('quiz');
    } else {
      alert('Please enter your name');
    }
  };

  return (
    <div className="Menu">
      <h2 className="menu-title">Quiz Menu</h2>
      <div className="input-container">
        <div className="input-group">
          <label htmlFor="name" className="input-label">Enter your name:</label>
          <input
            type="text"
            id="name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="category" className="input-label">Select category:</label>
          <select
            id="category"
            className="input-field"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="difficulty" className="input-label">Select difficulty:</label>
          <select
            id="difficulty"
            className="input-field"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button className="start-button" onClick={handleStart}>Start Quiz</button>
      </div>
    </div>
  );
}

export default MainMenu;
