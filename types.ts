export enum BallType {
  STANDARD = 'STANDARD',
  WAVE = 'WAVE',
  DIAGONAL = 'DIAGONAL',
  PHANTOM = 'PHANTOM',
}

export interface NoteData {
  time: number; // Time in milliseconds when the note should be hit
  pitch: keyof typeof NOTE_FREQUENCIES;
  type: BallType;
  duration?: number; // Duration of the note in seconds
  y?: number; // Optional explicit y-position for the ball's spawn
}

export interface LevelData {
  id: string;
  name: string;
  notes: NoteData[];
  maxMisses: number;
  beat: number; // The base duration of a beat in milliseconds for the song
}

export interface BallState {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: BallType;
  note: NoteData;
  initialY: number;
  visible: boolean;
  spawnTime: number;
}

// A map of note names to their frequencies in Hz.
export const NOTE_FREQUENCIES = {
  // Octave 3
  'G3': 196.00, 'G#3': 207.65, 'Ab3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'Bb3': 233.08, 'B3': 246.94,
  // Octave 4
  'C4': 261.63, 'C#4': 277.18, 'Db4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'Gb4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'Ab4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'Bb4': 466.16, 'B4': 493.88,
  // Octave 5
  'C5': 523.25, 'C#5': 554.37, 'Db5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'Gb5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'Ab5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'Bb5': 932.33, 'B5': 987.77,
};