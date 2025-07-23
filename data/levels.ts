import { LevelData, BallType, NOTE_FREQUENCIES } from '../types';

// Ode to Joy
const ODE_BEAT = 500; // ms per beat (120 BPM)
const ODE_EIGHTH_DUR = 0.2;
const ODE_QUARTER_DUR = 0.4;
const ODE_DOTTED_QUARTER_DUR = 0.6;
const ODE_HALF_DUR = 0.8;

const odeToJoyNotes: LevelData['notes'] = [
    // Part 1: "Freude, schöner Götterfunken, Tochter aus Elysium"
    { time: 2000, pitch: 'E4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT, pitch: 'E4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 2, pitch: 'F4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 3, pitch: 'G4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },

    { time: 2000 + ODE_BEAT * 4, pitch: 'G4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 5, pitch: 'F4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 6, pitch: 'E4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 7, pitch: 'D4', type: BallType.WAVE, duration: ODE_QUARTER_DUR },

    { time: 2000 + ODE_BEAT * 8, pitch: 'C4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 9, pitch: 'C4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 10, pitch: 'D4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 11, pitch: 'E4', type: BallType.DIAGONAL, duration: ODE_QUARTER_DUR },

    { time: 2000 + ODE_BEAT * 12, pitch: 'E4', type: BallType.STANDARD, duration: ODE_DOTTED_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 13.5, pitch: 'D4', type: BallType.PHANTOM, duration: ODE_EIGHTH_DUR },
    { time: 2000 + ODE_BEAT * 14, pitch: 'D4', type: BallType.STANDARD, duration: ODE_HALF_DUR },

    // Part 1 repeat
    { time: 2000 + ODE_BEAT * 16, pitch: 'E4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 17, pitch: 'E4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 18, pitch: 'F4', type: BallType.WAVE, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 19, pitch: 'G4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },

    { time: 2000 + ODE_BEAT * 20, pitch: 'G4', type: BallType.DIAGONAL, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 21, pitch: 'F4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 22, pitch: 'E4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 23, pitch: 'D4', type: BallType.PHANTOM, duration: ODE_QUARTER_DUR },

    { time: 2000 + ODE_BEAT * 24, pitch: 'C4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 25, pitch: 'C4', type: BallType.WAVE, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 26, pitch: 'D4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 27, pitch: 'E4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },

    { time: 2000 + ODE_BEAT * 28, pitch: 'D4', type: BallType.DIAGONAL, duration: ODE_DOTTED_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 29.5, pitch: 'C4', type: BallType.PHANTOM, duration: ODE_EIGHTH_DUR },
    { time: 2000 + ODE_BEAT * 30, pitch: 'C4', type: BallType.STANDARD, duration: ODE_HALF_DUR },

    // Part 2: "Seid umschlungen, Millionen! Diesen Kuss der ganzen Welt!"
    { time: 2000 + ODE_BEAT * 32, pitch: 'D4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 33, pitch: 'D4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 34, pitch: 'E4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 35, pitch: 'C4', type: BallType.WAVE, duration: ODE_QUARTER_DUR },

    { time: 2000 + ODE_BEAT * 36, pitch: 'D4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 37, pitch: 'E4', type: BallType.STANDARD, duration: ODE_EIGHTH_DUR },
    { time: 2000 + ODE_BEAT * 37.5, pitch: 'F4', type: BallType.STANDARD, duration: ODE_EIGHTH_DUR },
    { time: 2000 + ODE_BEAT * 38, pitch: 'E4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 39, pitch: 'C4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },

    { time: 2000 + ODE_BEAT * 40, pitch: 'D4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 41, pitch: 'E4', type: BallType.STANDARD, duration: ODE_EIGHTH_DUR },
    { time: 2000 + ODE_BEAT * 41.5, pitch: 'F4', type: BallType.STANDARD, duration: ODE_EIGHTH_DUR },
    { time: 2000 + ODE_BEAT * 42, pitch: 'E4', type: BallType.DIAGONAL, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 43, pitch: 'D4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },

    { time: 2000 + ODE_BEAT * 44, pitch: 'C4', type: BallType.PHANTOM, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 45, pitch: 'D4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 46, pitch: 'G3', type: BallType.STANDARD, duration: ODE_HALF_DUR },

    // Part 1 Reprise
    { time: 2000 + ODE_BEAT * 48, pitch: 'E4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 49, pitch: 'E4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 50, pitch: 'F4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 51, pitch: 'G4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },

    { time: 2000 + ODE_BEAT * 52, pitch: 'G4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 53, pitch: 'F4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 54, pitch: 'E4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 55, pitch: 'D4', type: BallType.WAVE, duration: ODE_QUARTER_DUR },

    { time: 2000 + ODE_BEAT * 56, pitch: 'C4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 57, pitch: 'C4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 58, pitch: 'D4', type: BallType.STANDARD, duration: ODE_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 59, pitch: 'E4', type: BallType.DIAGONAL, duration: ODE_QUARTER_DUR },

    { time: 2000 + ODE_BEAT * 60, pitch: 'D4', type: BallType.STANDARD, duration: ODE_DOTTED_QUARTER_DUR },
    { time: 2000 + ODE_BEAT * 61.5, pitch: 'C4', type: BallType.PHANTOM, duration: ODE_EIGHTH_DUR },
    { time: 2000 + ODE_BEAT * 62, pitch: 'C4', type: BallType.STANDARD, duration: ODE_HALF_DUR },
];


// Jingle Bells
const JB_BEAT = 450; // ms per beat (approx 133 BPM)
const JB_EIGHTH_DUR = 0.15;
const JB_QUARTER_DUR = 0.3;
const JB_DOTTED_QUARTER_DUR = 0.45;
const JB_HALF_DUR = 0.6;
const JB_WHOLE_DUR = 1.2;

const jingleChorus = (startTime: number): LevelData['notes'] => [
    { time: startTime,                   pitch: 'E4', type: BallType.STANDARD, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT,         pitch: 'E4', type: BallType.STANDARD, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 2,     pitch: 'E4', type: BallType.STANDARD, duration: JB_HALF_DUR },
    { time: startTime + JB_BEAT * 4,     pitch: 'E4', type: BallType.STANDARD, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 5,     pitch: 'E4', type: BallType.STANDARD, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 6,     pitch: 'E4', type: BallType.STANDARD, duration: JB_HALF_DUR },
    { time: startTime + JB_BEAT * 8,     pitch: 'E4', type: BallType.DIAGONAL, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 9,     pitch: 'G4', type: BallType.DIAGONAL, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 10,    pitch: 'C4', type: BallType.PHANTOM, duration: JB_DOTTED_QUARTER_DUR },
    { time: startTime + JB_BEAT * 11.5,  pitch: 'D4', type: BallType.STANDARD, duration: JB_EIGHTH_DUR },
    { time: startTime + JB_BEAT * 12,    pitch: 'E4', type: BallType.STANDARD, duration: JB_WHOLE_DUR },

    { time: startTime + JB_BEAT * 16,    pitch: 'F4', type: BallType.STANDARD, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 17,    pitch: 'F4', type: BallType.STANDARD, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 18,    pitch: 'F4', type: BallType.STANDARD, duration: JB_DOTTED_QUARTER_DUR },
    { time: startTime + JB_BEAT * 19.5,  pitch: 'F4', type: BallType.STANDARD, duration: JB_EIGHTH_DUR },
    { time: startTime + JB_BEAT * 20,    pitch: 'F4', type: BallType.STANDARD, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 21, pitch: 'E4', type: BallType.STANDARD, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 22, pitch: 'E4', type: BallType.WAVE, duration: JB_HALF_DUR },
];
const jingleVerse = (startTime: number): LevelData['notes'] => [
    { time: startTime,                 pitch: 'E4', type: BallType.WAVE, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT,       pitch: 'D4', type: BallType.WAVE, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 2,   pitch: 'D4', type: BallType.WAVE, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 3,   pitch: 'E4', type: BallType.WAVE, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 4,   pitch: 'D4', type: BallType.WAVE, duration: JB_HALF_DUR },
    { time: startTime + JB_BEAT * 6,   pitch: 'G4', type: BallType.WAVE, duration: JB_HALF_DUR },
];
const jingleEnd = (startTime: number): LevelData['notes'] => [
    { time: startTime,                 pitch: 'G4', type: BallType.WAVE, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT,       pitch: 'G4', type: BallType.WAVE, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 2,   pitch: 'F4', type: BallType.WAVE, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 3,   pitch: 'D4', type: BallType.WAVE, duration: JB_QUARTER_DUR },
    { time: startTime + JB_BEAT * 4,   pitch: 'C4', type: BallType.WAVE, duration: JB_WHOLE_DUR },
];
const jingleBellsNotes: LevelData['notes'] = [ ...jingleChorus(2000), ...jingleVerse(2000 + JB_BEAT * 24), ...jingleChorus(2000 + JB_BEAT * 32), ...jingleEnd(2000 + JB_BEAT * 56), ];

// Silent Night
const SN_BEAT = 600; // ms per quarter note (100 BPM)
const SN_EIGHTH_DUR = SN_BEAT * 0.5 / 1000;
const SN_QUARTER_DUR = SN_BEAT / 1000;
const SN_DOTTED_QUARTER_DUR = SN_BEAT * 1.5 / 1000;
const SN_HALF_DUR = SN_BEAT * 2 / 1000;
const SN_DOTTED_HALF_DUR = SN_BEAT * 3 / 1000;

const silentNightVerse = (startTime: number): LevelData['notes'] => {
    const beat = SN_BEAT;
    return [
        // Phrase 1: "Stille Nacht, heilige Nacht"
        { time: startTime,                    pitch: 'G4',  type: BallType.WAVE,    duration: SN_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 1.5,       pitch: 'A4',  type: BallType.WAVE,    duration: SN_EIGHTH_DUR },
        { time: startTime + beat * 2,         pitch: 'G4',  type: BallType.WAVE,    duration: SN_QUARTER_DUR },
        { time: startTime + beat * 3,         pitch: 'E4',  type: BallType.STANDARD,duration: SN_DOTTED_HALF_DUR },
        
        { time: startTime + beat * 6,         pitch: 'G4',  type: BallType.WAVE,    duration: SN_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 7.5,       pitch: 'A4',  type: BallType.WAVE,    duration: SN_EIGHTH_DUR },
        { time: startTime + beat * 8,         pitch: 'G4',  type: BallType.WAVE,    duration: SN_QUARTER_DUR },
        { time: startTime + beat * 9,         pitch: 'E4',  type: BallType.STANDARD,duration: SN_DOTTED_HALF_DUR },
        
        { time: startTime + beat * 12,        pitch: 'D5',  type: BallType.DIAGONAL,duration: SN_HALF_DUR },
        { time: startTime + beat * 14,        pitch: 'D5',  type: BallType.STANDARD,duration: SN_QUARTER_DUR },
        { time: startTime + beat * 15,        pitch: 'B4',  type: BallType.DIAGONAL,duration: SN_DOTTED_HALF_DUR },
        
        { time: startTime + beat * 18,        pitch: 'C5',  type: BallType.PHANTOM, duration: SN_HALF_DUR },
        { time: startTime + beat * 20,        pitch: 'C5',  type: BallType.DIAGONAL,duration: SN_QUARTER_DUR },
        { time: startTime + beat * 21,        pitch: 'G4',  type: BallType.STANDARD,duration: SN_DOTTED_HALF_DUR },

        { time: startTime + beat * 24,        pitch: 'A4',  type: BallType.PHANTOM, duration: SN_HALF_DUR },
        { time: startTime + beat * 26,        pitch: 'A4',  type: BallType.DIAGONAL,duration: SN_QUARTER_DUR },
        
        { time: startTime + beat * 27,        pitch: 'C5',  type: BallType.STANDARD,duration: SN_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 28.5,      pitch: 'B4',  type: BallType.STANDARD,duration: SN_EIGHTH_DUR },
        { time: startTime + beat * 29,        pitch: 'A4',  type: BallType.STANDARD,duration: SN_QUARTER_DUR },

        { time: startTime + beat * 30,        pitch: 'G4',  type: BallType.STANDARD,duration: SN_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 31.5,      pitch: 'A4',  type: BallType.STANDARD,duration: SN_EIGHTH_DUR },
        { time: startTime + beat * 32,        pitch: 'G4',  type: BallType.STANDARD,duration: SN_QUARTER_DUR },
        { time: startTime + beat * 33,        pitch: 'E4',  type: BallType.STANDARD,duration: SN_DOTTED_HALF_DUR },
        
        { time: startTime + beat * 36,        pitch: 'A4',  type: BallType.DIAGONAL,duration: SN_HALF_DUR },
        { time: startTime + beat * 38,        pitch: 'A4',  type: BallType.STANDARD,duration: SN_QUARTER_DUR },
        
        
        { time: startTime + beat * 39,        pitch: 'C5',  type: BallType.STANDARD,duration: SN_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 40.5,      pitch: 'B4',  type: BallType.STANDARD,duration: SN_EIGHTH_DUR },
        { time: startTime + beat * 41,        pitch: 'A4',  type: BallType.STANDARD,duration: SN_QUARTER_DUR },

        { time: startTime + beat * 42,        pitch: 'G4',  type: BallType.STANDARD,duration: SN_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 43.5,      pitch: 'A4',  type: BallType.STANDARD,duration: SN_EIGHTH_DUR },
        { time: startTime + beat * 44,        pitch: 'G4',  type: BallType.STANDARD,duration: SN_QUARTER_DUR },
        { time: startTime + beat * 45,        pitch: 'E4',  type: BallType.STANDARD,duration: SN_HALF_DUR },
        
        { time: startTime + beat * 48,        pitch: 'D5',  type: BallType.DIAGONAL,duration: SN_HALF_DUR },
        { time: startTime + beat * 50,        pitch: 'D5',  type: BallType.STANDARD,duration: SN_QUARTER_DUR },
        
        { time: startTime + beat * 51,        pitch: 'F5',  type: BallType.STANDARD,duration: SN_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 52.5,      pitch: 'D5',  type: BallType.STANDARD,duration: SN_EIGHTH_DUR },
        { time: startTime + beat * 53,        pitch: 'B4',  type: BallType.STANDARD,duration: SN_QUARTER_DUR },
        { time: startTime + beat * 54,        pitch: 'C5',  type: BallType.STANDARD,duration: SN_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 57,        pitch: 'E5',  type: BallType.STANDARD,duration: SN_HALF_DUR },
        
        { time: startTime + beat * 60,        pitch: 'C5',  type: BallType.STANDARD,duration: SN_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 61.5,      pitch: 'G4',  type: BallType.STANDARD,duration: SN_EIGHTH_DUR },
        { time: startTime + beat * 62,        pitch: 'E4',  type: BallType.STANDARD,duration: SN_QUARTER_DUR },

        { time: startTime + beat * 63,        pitch: 'G4',  type: BallType.STANDARD,duration: SN_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 64.5,      pitch: 'F4',  type: BallType.STANDARD,duration: SN_EIGHTH_DUR },
        { time: startTime + beat * 65,        pitch: 'D4',  type: BallType.STANDARD,duration: SN_QUARTER_DUR },
        { time: startTime + beat * 66,        pitch: 'C4',  type: BallType.STANDARD,duration: SN_HALF_DUR },

    ];
};

const VERSE_1_START = 2000;
const VERSE_DURATION_BEATS = 72;
const REST_BEATS = 0; // 2 measures rest
const VERSE_2_START = VERSE_1_START + (VERSE_DURATION_BEATS + REST_BEATS) * SN_BEAT;

const verse1 = silentNightVerse(VERSE_1_START);
const verse2 = silentNightVerse(VERSE_2_START);

// Make the very last note of the song the root note in a lower octave for a feeling of finality.
verse2[verse2.length - 1].pitch = 'G3';

const silentNightNotes: LevelData['notes'] = [
    ...verse1,
    ...verse2
];


// O du fröhliche
const ODF_BEAT = 500; // ms per quarter note (100 BPM)
const ODF_EIGHTH_DUR = SN_BEAT * 0.5 / 1000;
const ODF_QUARTER_DUR = SN_BEAT / 1000;
const ODF_DOTTED_QUARTER_DUR = SN_BEAT * 1.5 / 1000;
const ODF_HALF_DUR = SN_BEAT * 2 / 1000;
const ODF_DOTTED_HALF_DUR = SN_BEAT * 3 / 1000;

const oDuFroehlicheVerse = (startTime: number): LevelData['notes'] => {
    const beat = ODF_BEAT;
    return [
        { time: startTime,                    pitch: 'G4',  type: BallType.STANDARD, duration: ODF_HALF_DUR },
        { time: startTime + beat * 2,         pitch: 'A4',  type: BallType.WAVE, duration: ODF_HALF_DUR },
        { time: startTime + beat * 4,         pitch: 'G4',  type: BallType.PHANTOM, duration: ODF_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 5.5,       pitch: 'F4',  type: BallType.STANDARD, duration: ODF_EIGHTH_DUR },
        { time: startTime + beat * 6,         pitch: 'E4',  type: BallType.PHANTOM, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 7,         pitch: 'F4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 8,         pitch: 'G4',  type: BallType.DIAGONAL, duration: ODF_HALF_DUR },
        { time: startTime + beat * 10,        pitch: 'A4',  type: BallType.STANDARD, duration: ODF_HALF_DUR },
        { time: startTime + beat * 12,        pitch: 'G4',  type: BallType.DIAGONAL, duration: ODF_DOTTED_QUARTER_DUR, y: 100 },
        { time: startTime + beat * 13.5,      pitch: 'F4',  type: BallType.STANDARD, duration: ODF_EIGHTH_DUR, y: 100 },
        { time: startTime + beat * 14,        pitch: 'E4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR, y: 200 },
        { time: startTime + beat * 15,        pitch: 'F4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR, y: 300 },
        { time: startTime + beat * 16,        pitch: 'G4',  type: BallType.STANDARD, duration: ODF_HALF_DUR },
        { time: startTime + beat * 18,        pitch: 'G4',  type: BallType.STANDARD, duration: ODF_HALF_DUR },
        { time: startTime + beat * 20,        pitch: 'A4',  type: BallType.STANDARD, duration: ODF_HALF_DUR },
        { time: startTime + beat * 22,        pitch: 'B4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 23,        pitch: 'C5',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 24,        pitch: 'B4',  type: BallType.STANDARD, duration: ODF_HALF_DUR },
        { time: startTime + beat * 26,        pitch: 'A4',  type: BallType.STANDARD, duration: ODF_HALF_DUR },
        { time: startTime + beat * 28,        pitch: 'G4',  type: BallType.STANDARD, duration: ODF_HALF_DUR * 2 },
        { time: startTime + beat * 32,        pitch: 'D4',  type: BallType.STANDARD, duration: ODF_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 33.5,      pitch: 'E4',  type: BallType.STANDARD, duration: ODF_EIGHTH_DUR },
        { time: startTime + beat * 34,        pitch: 'D4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 35,        pitch: 'E4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 36,        pitch: 'F4',  type: BallType.STANDARD, duration: ODF_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 37.5,      pitch: 'G4',  type: BallType.STANDARD, duration: ODF_EIGHTH_DUR },
        { time: startTime + beat * 38,        pitch: 'F4',  type: BallType.STANDARD, duration: ODF_HALF_DUR },
        { time: startTime + beat * 40,        pitch: 'E4',  type: BallType.STANDARD, duration: ODF_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 41.5,      pitch: 'F4',  type: BallType.STANDARD, duration: ODF_EIGHTH_DUR },
        { time: startTime + beat * 42,        pitch: 'E4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 43,        pitch: 'F4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 44,        pitch: 'G4',  type: BallType.STANDARD, duration: ODF_DOTTED_QUARTER_DUR },
        { time: startTime + beat * 45.5,      pitch: 'A4',  type: BallType.STANDARD, duration: ODF_EIGHTH_DUR },
        { time: startTime + beat * 46,        pitch: 'G4',  type: BallType.STANDARD, duration: ODF_HALF_DUR },
        { time: startTime + beat * 48,        pitch: 'C5',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 49,        pitch: 'B4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 50,        pitch: 'A4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 51,        pitch: 'G4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 52,        pitch: 'C5',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 53,        pitch: 'A4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 54,        pitch: 'G4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 55,        pitch: 'F4',  type: BallType.STANDARD, duration: ODF_QUARTER_DUR },
        { time: startTime + beat * 56,        pitch: 'E4',  type: BallType.STANDARD, duration: ODF_HALF_DUR },
        { time: startTime + beat * 58,        pitch: 'D4',  type: BallType.STANDARD, duration: ODF_HALF_DUR },
        { time: startTime + beat * 60,        pitch: 'C4',  type: BallType.STANDARD, duration: ODF_HALF_DUR * 2 },
    ];
};

const oDuFroehlicheNotes: LevelData['notes'] = [
    ...oDuFroehlicheVerse(2000),
    ...oDuFroehlicheVerse(2000 + ODF_BEAT * 64)
];


export const levels: LevelData[] = [
  {
    id: 'ode-to-joy',
    name: 'Freude schöner Götterfunken',
    notes: odeToJoyNotes,
    maxMisses: 10,
    beat: ODE_BEAT,
  },
  {
    id: 'jingle-bells',
    name: 'Jingle Bells',
    notes: jingleBellsNotes,
    maxMisses: 12,
    beat: JB_BEAT,
  },
  {
    id: 'silent-night',
    name: 'Stille Nacht, heilige Nacht',
    notes: silentNightNotes,
    maxMisses: 14,
    beat: SN_BEAT,
  },
  {
    id: 'ohDuFroehliche',
    name: 'Oh du fröhliche',
    notes: oDuFroehlicheNotes,
    maxMisses: 10,
    beat: ODF_BEAT,
  }
];