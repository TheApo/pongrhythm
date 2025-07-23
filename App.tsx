import React, { useState } from 'react';
import { LevelData } from './types';
import MainMenu from './components/MainMenu';
import GameView from './components/GameView';
import { levels } from './data/levels';
import DifficultyMenu from './components/DifficultyMenu';

const App: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<LevelData | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);

  const handleSelectLevel = (level: LevelData) => {
    setSelectedLevel(level);
    setDifficulty(null);
  };

  const handleSelectDifficulty = (selectedDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(selectedDifficulty);
  };

  const handleReturnToMenu = () => {
    setSelectedLevel(null);
    setDifficulty(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black font-mono">
      {!selectedLevel ? (
        <MainMenu levels={levels} onSelectLevel={handleSelectLevel} />
      ) : !difficulty ? (
        <DifficultyMenu 
          level={selectedLevel} 
          onSelectDifficulty={handleSelectDifficulty}
          onBack={handleReturnToMenu} 
        />
      ) : (
        <GameView 
          level={selectedLevel} 
          difficulty={difficulty}
          onReturnToMenu={handleReturnToMenu} 
        />
      )}
    </div>
  );
};

export default App;