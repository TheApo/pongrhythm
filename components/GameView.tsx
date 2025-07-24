import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { LevelData, BallState, BallType, NOTE_FREQUENCIES, Instrument } from '../types';
import HUD from './HUD';
import audioService from '../services/audioService';
import { 
  GAME_WIDTH, GAME_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_SPEED, PADDLE_X_POSITION,
  BALL_SIZE, BALL_SPEED_X, HUD_HEIGHT, BOTTOM_BAR_HEIGHT, COLOR_PADDLE, COLOR_WALL,
  COLOR_BALL_STANDARD, COLOR_BALL_WAVE, COLOR_BALL_DIAGONAL, COLOR_BALL_PHANTOM,
  PHANTOM_BLINK_INTERVAL, COLOR_HEALTH_BAR_FG
} from '../constants';

interface GameViewProps {
  level: LevelData;
  difficulty: 'easy' | 'medium' | 'hard';
  onReturnToMenu: () => void;
}

type GameState = 'playing' | 'gameOver' | 'cleared';
interface GameStats {
    score: number;
    multiplier: number;
    misses: number;
    hits: number;
    hitStreak: number;
    maxHitStreak: number;
}

const DIAGONAL_SPEED_Y = 150; // pixels per second

const pitchToY = (pitch: keyof typeof NOTE_FREQUENCIES): number => {
    const pitches = Object.keys(NOTE_FREQUENCIES);
    const index = pitches.indexOf(pitch);
    const totalPitches = pitches.length;

    const topBoundary = HUD_HEIGHT;
    const bottomBoundary = GAME_HEIGHT - BOTTOM_BAR_HEIGHT - BALL_SIZE;
    const totalPlayableHeight = bottomBoundary - topBoundary;

    // Constrain notes to the central 70% of the playable area to reduce travel
    const verticalPadding = totalPlayableHeight * 0.15;
    const constrainedHeight = totalPlayableHeight - (verticalPadding * 2);

    const pitchPercentage = totalPitches > 1 ? index / (totalPitches - 1) : 0.5;
    
    // Y is calculated from top, so we map the pitch percentage to the constrained area
    const yPos = topBoundary + verticalPadding + (constrainedHeight - (pitchPercentage * constrainedHeight));

    return yPos;
};

const GameView: React.FC<GameViewProps> = ({ level, difficulty, onReturnToMenu }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stats, setStats] = useState<GameStats>({
        score: 0,
        multiplier: 1,
        misses: 0,
        hits: 0,
        hitStreak: 0,
        maxHitStreak: 0,
    });
    const [gameState, setGameState] = useState<GameState>('playing');
    
    const keysPressed = useRef<{ [key: string]: boolean }>({});
    const paddleY = useRef((GAME_HEIGHT - PADDLE_HEIGHT) / 2);
    const animationFrameId = useRef<number | null>(null);

    const modifiedLevel = useMemo(() => {
        if (difficulty === 'easy') {
          return level;
        }
  
        const ballTypes = Object.values(BallType);
        const START_DELAY = 2000;
  
        if (difficulty === 'medium') {
          const newNotes = level.notes.map(note => ({
            ...note,
            type: ballTypes[Math.floor(Math.random() * ballTypes.length)],
            y: 300 + Math.random() * 100, // Random Y between 300 and 400
          }));
          return { ...level, notes: newNotes };
        }
  
        if (difficulty === 'hard') {
            const originalBeat = level.beat;
            const hardBeat = Math.max(50, originalBeat - 200); // Prevent beat from being too low
            const factor = hardBeat / originalBeat;
            
            const newNotes = level.notes.map(note => ({
                ...note,
                time: START_DELAY + (note.time - START_DELAY) * factor,
                duration: note.duration ? note.duration * factor : undefined,
                type: ballTypes[Math.floor(Math.random() * ballTypes.length)],
                y: 200 + Math.random() * 300, // Random Y between 200 and 500
            }));
            
            return { ...level, beat: hardBeat, notes: newNotes };
        }
  
        return level; // Fallback to easy
    }, [level, difficulty]);

    const resetGame = useCallback(() => {
        setStats({
            score: 0,
            multiplier: 1,
            misses: 0,
            hits: 0,
            hitStreak: 0,
            maxHitStreak: 0,
        });
        setGameState('playing');
        paddleY.current = (GAME_HEIGHT - PADDLE_HEIGHT) / 2;
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onReturnToMenu();
                return;
            }
            keysPressed.current[e.key.toLowerCase()] = true;
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            keysPressed.current[e.key.toLowerCase()] = false;
        };
        
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [onReturnToMenu]);

    useEffect(() => {
        if (gameState !== 'playing') {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        const updatePaddleFromPosition = (clientY: number) => {
            const rect = canvas.getBoundingClientRect();
            const newY = clientY - rect.top - (PADDLE_HEIGHT / 2);
            paddleY.current = Math.max(HUD_HEIGHT, Math.min(newY, GAME_HEIGHT - PADDLE_HEIGHT - BOTTOM_BAR_HEIGHT));
        };

        const handleMouseMove = (event: MouseEvent) => {
            updatePaddleFromPosition(event.clientY);
        };

        const handleTouchMove = (event: TouchEvent) => {
            event.preventDefault();
            if (event.touches.length > 0) {
                updatePaddleFromPosition(event.touches[0].clientY);
            }
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchstart', handleTouchMove, { passive: false });
        
        let balls: BallState[] = [];
        let gameTime = 0;
        let nextNoteIndex = 0;
        let lastTime = 0;
        
        const travelTime = Math.abs((GAME_WIDTH - PADDLE_X_POSITION) / BALL_SPEED_X) * 1000;

        const draw = () => {
            ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

            ctx.fillStyle = COLOR_WALL;
            ctx.fillRect(0, HUD_HEIGHT - 2, GAME_WIDTH, 2);
            ctx.fillRect(0, GAME_HEIGHT - BOTTOM_BAR_HEIGHT, GAME_WIDTH, BOTTOM_BAR_HEIGHT);

            ctx.fillStyle = COLOR_PADDLE;
            ctx.fillRect(PADDLE_X_POSITION, paddleY.current, PADDLE_WIDTH, PADDLE_HEIGHT);

            balls.forEach(ball => {
                if (!ball.visible) return;
                switch(ball.type) {
                    case BallType.STANDARD: ctx.fillStyle = COLOR_BALL_STANDARD; break;
                    case BallType.WAVE: ctx.fillStyle = COLOR_BALL_WAVE; break;
                    case BallType.DIAGONAL: ctx.fillStyle = COLOR_BALL_DIAGONAL; break;
                    case BallType.PHANTOM: ctx.fillStyle = COLOR_BALL_PHANTOM; break;
                }
                ctx.fillRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE);
            });
        };

        const gameLoop = (timestamp: number) => {
            if (lastTime === 0) {
                lastTime = timestamp;
                animationFrameId.current = requestAnimationFrame(gameLoop);
                return;
            }
            const deltaTime = (timestamp - lastTime) / 1000;
            lastTime = timestamp;
            gameTime += deltaTime * 1000;

            if (keysPressed.current['arrowup'] || keysPressed.current['w']) {
                paddleY.current -= PADDLE_SPEED * deltaTime;
            }
            if (keysPressed.current['arrowdown'] || keysPressed.current['s']) {
                paddleY.current += PADDLE_SPEED * deltaTime;
            }
            paddleY.current = Math.max(HUD_HEIGHT, Math.min(paddleY.current, GAME_HEIGHT - PADDLE_HEIGHT - BOTTOM_BAR_HEIGHT));

            while (nextNoteIndex < modifiedLevel.notes.length && gameTime >= modifiedLevel.notes[nextNoteIndex].time - travelTime) {
                const note = modifiedLevel.notes[nextNoteIndex];
                const yPos = note.y ?? pitchToY(note.pitch);
                balls.push({
                    id: Date.now() + Math.random(),
                    x: GAME_WIDTH, y: yPos, vx: BALL_SPEED_X,
                    vy: note.type === BallType.DIAGONAL ? (Math.random() > 0.5 ? DIAGONAL_SPEED_Y : -DIAGONAL_SPEED_Y) : 0,
                    type: note.type, note: note, initialY: yPos, visible: true, spawnTime: gameTime,
                });
                nextNoteIndex++;
            }
            
            let missCount = 0;
            let hitCount = 0;
            
            const updatedBalls: BallState[] = [];
            for(const ball of balls) {
                ball.x += ball.vx * deltaTime;
                switch (ball.type) {
                    case BallType.WAVE:
                        ball.y = ball.initialY + Math.sin((gameTime - ball.spawnTime) / 200) * 50;
                        break;
                    case BallType.DIAGONAL:
                        ball.y += ball.vy * deltaTime;
                        break;
                    case BallType.PHANTOM:
                        ball.visible = Math.floor((gameTime - ball.spawnTime) / PHANTOM_BLINK_INTERVAL) % 2 === 0;
                        break;
                }
                
                if (ball.x + BALL_SIZE < 0) {
                    missCount++;
                    continue;
                }

                if (ball.vx > 0 && ball.x > GAME_WIDTH) {
                    continue;
                }
                
                const paddleRect = { x: PADDLE_X_POSITION, y: paddleY.current, width: PADDLE_WIDTH, height: PADDLE_HEIGHT };
                const ballRect = { x: ball.x, y: ball.y, width: BALL_SIZE, height: BALL_SIZE };
                if (ball.vx < 0 && ballRect.x < paddleRect.x + paddleRect.width &&
                    ballRect.x + ballRect.width > paddleRect.x && ballRect.y < paddleRect.y + paddleRect.height &&
                    ballRect.y + ballRect.height > paddleRect.y) {
                    hitCount++;
                    ball.vx *= -1.05;
                    ball.x = PADDLE_X_POSITION + PADDLE_WIDTH;
                    audioService.playNote(NOTE_FREQUENCIES[ball.note.pitch], modifiedLevel.instrument, ball.note.duration);
                }
                if (ball.y < HUD_HEIGHT || ball.y > GAME_HEIGHT - BOTTOM_BAR_HEIGHT - BALL_SIZE) {
                    ball.y = Math.max(HUD_HEIGHT, Math.min(ball.y, GAME_HEIGHT - BOTTOM_BAR_HEIGHT - BALL_SIZE));
                    if (ball.type === BallType.DIAGONAL || ball.vx > 0) ball.vy *= -1;
                }
                updatedBalls.push(ball);
            }
            balls = updatedBalls;

            if (missCount > 0) {
                setStats(prev => {
                    const newTotalMisses = prev.misses + missCount;
                    if (newTotalMisses >= modifiedLevel.maxMisses) {
                        setGameState('gameOver');
                    }
                    return { 
                        ...prev, 
                        misses: newTotalMisses, 
                        hitStreak: 0 
                    };
                });
            }
            if (hitCount > 0) {
                setStats(prev => {
                    let newStreak = prev.hitStreak;
                    let newMultiplier = prev.multiplier;
                    let newScore = prev.score;
                    
                    for (let i = 0; i < hitCount; i++) {
                        newStreak++;
                        if (newStreak > 0 && newStreak % 5 === 0) {
                            newMultiplier++;
                        }
                        newScore += newMultiplier;
                    }
                    
                    return {
                        ...prev,
                        hits: prev.hits + hitCount,
                        hitStreak: newStreak,
                        maxHitStreak: Math.max(prev.maxHitStreak, newStreak),
                        multiplier: newMultiplier,
                        score: newScore,
                    };
                });
            }
            if (nextNoteIndex >= modifiedLevel.notes.length && balls.length === 0) {
                 setGameState(prevGameState => {
                    return prevGameState === 'playing' ? 'cleared' : prevGameState;
                });
            }

            draw();
            animationFrameId.current = requestAnimationFrame(gameLoop);
        };

        animationFrameId.current = requestAnimationFrame(gameLoop);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchstart', handleTouchMove);
        };
    }, [modifiedLevel, gameState, onReturnToMenu, resetGame]);

    return (
        <div className="relative" style={{ width: GAME_WIDTH, height: GAME_HEIGHT, background: 'black' }}>
            <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} />
            <HUD score={stats.score} multiplier={stats.multiplier} misses={stats.misses} maxMisses={modifiedLevel.maxMisses} />
             {(gameState === 'gameOver' || gameState === 'cleared') && (
                 <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center text-center p-4">
                     <h2 className="text-6xl font-bold mb-4" style={{color: gameState === 'gameOver' ? COLOR_HEALTH_BAR_FG : COLOR_PADDLE}}>
                         {gameState === 'gameOver' ? 'Versuche es noch einmal!' : 'Herzlichen Glückwunsch!'}
                     </h2>
                     <p className="text-2xl mb-2 text-white">Punkte: {stats.score}</p>
                     <p className="text-2xl mb-6 text-white">Höchster Multiplikator: x{stats.multiplier}</p>
                     
                     <div className="grid grid-cols-3 gap-x-8 text-white mb-8 w-full max-w-lg">
                        <div className="text-center">
                            <p className="text-lg text-green-400 font-semibold tracking-wider">GETROFFEN</p>
                            <p className="text-4xl font-bold">{stats.hits}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg text-red-500 font-semibold tracking-wider">VERFEHLT</p>
                            <p className="text-4xl font-bold">{stats.misses}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg text-yellow-400 font-semibold tracking-wider">LÄNGSTE SERIE</p>
                            <p className="text-4xl font-bold">{stats.maxHitStreak}</p>
                        </div>
                     </div>

                     <button
                        onClick={resetGame}
                        className="text-2xl font-bold text-black bg-yellow-400 py-3 px-6 border-4 border-yellow-400 hover:bg-black hover:text-yellow-400 transition-colors duration-200 mb-4"
                    >
                         Erneut versuchen
                    </button>
                    <button
                        onClick={onReturnToMenu}
                        className="text-2xl font-bold text-black bg-yellow-400 py-3 px-6 border-4 border-yellow-400 hover:bg-black hover:text-yellow-400 transition-colors duration-200"
                    >
                        Hauptmenü
                    </button>
                 </div>
             )}
        </div>
    );
};

export default GameView;