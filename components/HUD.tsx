
import React from 'react';
import { GAME_WIDTH, GAME_HEIGHT, HUD_HEIGHT, COLOR_HEALTH_BAR_BG, COLOR_HEALTH_BAR_FG, COLOR_TEXT } from '../constants';

interface HUDProps {
  score: number;
  multiplier: number;
  misses: number;
  maxMisses: number;
}

const HUD: React.FC<HUDProps> = ({ score, multiplier, misses, maxMisses }) => {
  const healthPercentage = Math.min((misses / maxMisses) * 100, 100);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
      {/* Health Bar */}
      <div className="absolute top-0 left-0 w-full" style={{ height: `${HUD_HEIGHT}px`, backgroundColor: COLOR_HEALTH_BAR_BG }}>
        <div style={{ width: `${healthPercentage}%`, height: '100%', backgroundColor: COLOR_HEALTH_BAR_FG }}></div>
      </div>
      
      {/* Score and Multiplier */}
      <div 
        className="absolute bottom-0 left-0 w-full flex justify-between items-center px-4"
        style={{ height: `${HUD_HEIGHT}px`, color: COLOR_TEXT, bottom: '10px' }}
      >
        <p className="text-3xl font-bold">{`SCORE: ${score}`}</p>
        <p className="text-3xl font-bold">{`x${multiplier}`}</p>
      </div>
    </div>
  );
};

export default HUD;
