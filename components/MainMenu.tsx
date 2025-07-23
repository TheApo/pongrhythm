import React from 'react';
import { LevelData } from '../types';
import audioService from '../services/audioService';

interface MainMenuProps {
  levels: LevelData[];
  onSelectLevel: (level: LevelData) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ levels, onSelectLevel }) => {
  const handleSelect = (level: LevelData) => {
    audioService.init();
    onSelectLevel(level);
  };

  return (
    <div className="text-center">
      <h1 className="text-7xl font-bold text-yellow-400 mb-4 tracking-widest">PongRhythm</h1>
      <p className="text-xl text-white mb-2">Ein Rhythmusspiel</p>
      <p className="text-lg text-gray-400 mb-10">Steuerung: Maus, Touch oder ↑ / ↓ / W / S</p>
      <div className="flex flex-col items-center space-y-4">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => handleSelect(level)}
            className="w-full max-w-md text-2xl font-bold text-black bg-yellow-400 py-4 px-8 border-4 border-yellow-400 hover:bg-black hover:text-yellow-400 transition-colors duration-200"
          >
            {level.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;