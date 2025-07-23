import React from 'react';
import { LevelData } from '../types';

interface DifficultyMenuProps {
  level: LevelData;
  onSelectDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onBack: () => void;
}

const DifficultyMenu: React.FC<DifficultyMenuProps> = ({ level, onSelectDifficulty, onBack }) => {
  const handleSelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    onSelectDifficulty(difficulty);
  };

  return (
    <div className="text-center px-4">
      <h2 className="text-5xl font-bold text-yellow-400 mb-4">{level.name}</h2>
      <p className="text-xl text-white mb-10">Wähle einen Schwierigkeitsgrad</p>
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => handleSelect('easy')}
          className="w-full max-w-md text-2xl font-bold text-black bg-yellow-400 py-4 px-8 border-4 border-yellow-400 hover:bg-black hover:text-yellow-400 transition-colors duration-200"
          aria-label="Schwierigkeitsgrad Leicht wählen"
        >
          Leicht
        </button>
        <button
          onClick={() => handleSelect('medium')}
          className="w-full max-w-md text-2xl font-bold text-black bg-yellow-400 py-4 px-8 border-4 border-yellow-400 hover:bg-black hover:text-yellow-400 transition-colors duration-200"
          aria-label="Schwierigkeitsgrad Mittel wählen"
        >
          Mittel
        </button>
        <button
          onClick={() => handleSelect('hard')}
          className="w-full max-w-md text-2xl font-bold text-black bg-yellow-400 py-4 px-8 border-4 border-yellow-400 hover:bg-black hover:text-yellow-400 transition-colors duration-200"
          aria-label="Schwierigkeitsgrad Schwer wählen"
        >
          Schwer
        </button>
        <button
          onClick={onBack}
          className="w-full max-w-md text-xl font-bold text-gray-400 bg-transparent mt-8 py-2 px-6 border-2 border-gray-400 hover:bg-gray-400 hover:text-black transition-colors duration-200"
          aria-label="Zurück zum Hauptmenü"
        >
          Zurück
        </button>
      </div>
    </div>
  );
};

export default DifficultyMenu;