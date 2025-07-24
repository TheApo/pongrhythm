
import { Instrument, NOTE_FREQUENCIES } from '../types';

class AudioService {
  private audioContext: AudioContext | null = null;
  private reverbNode: ConvolverNode | null = null;
  private masterGain: GainNode | null = null;
  private pianoSamples = new Map<string, { buffer: AudioBuffer, baseFrequency: number }>();
  private stringSamples = new Map<string, { buffer: AudioBuffer, baseFrequency: number }>();
  private loadingPromise: Promise<void> | null = null;

  private readonly pianoSampleFiles: Record<string, string> = {
    'A3': 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/acoustic_grand_piano-mp3/A3.mp3',
    'C4': 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/acoustic_grand_piano-mp3/C4.mp3',
    'E4': 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/acoustic_grand_piano-mp3/E4.mp3',
    'G4': 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/acoustic_grand_piano-mp3/G4.mp3',
    'C5': 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/acoustic_grand_piano-mp3/C5.mp3',
    'E5': 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/acoustic_grand_piano-mp3/E5.mp3',
  };

  private readonly stringSampleFiles: Record<string, string> = {
    'C4': 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/cello-mp3/C4.mp3',
    'G4': 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/cello-mp3/G4.mp3',
    'A4': 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/cello-mp3/A4.mp3',
    'C5': 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/cello-mp3/C5.mp3',
  };


  private _createImpulseResponse(): AudioBuffer | null {
    if (!this.audioContext) return null;
    const sampleRate = this.audioContext.sampleRate;
    const duration = 1.5;
    const decay = 1.8;
    const length = sampleRate * duration;
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      }
    }
    return impulse;
  }
  
  public initAndLoadSounds(): Promise<void> {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.audioContext.currentTime);
        this.masterGain.connect(this.audioContext.destination);

        this.reverbNode = this.audioContext.createConvolver();
        this.reverbNode.buffer = this._createImpulseResponse();
        this.reverbNode.connect(this.masterGain);
      } catch (e) {
        console.error("Web Audio API is not supported in this browser");
        return Promise.reject(e);
      }
    }

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    const pianoLoaded = this.pianoSamples.size >= Object.keys(this.pianoSampleFiles).length;
    const stringsLoaded = this.stringSamples.size >= Object.keys(this.stringSampleFiles).length;
    if (pianoLoaded && stringsLoaded) {
      return Promise.resolve();
    }
    
    this.loadingPromise = (async () => {
      console.log("Loading all sound samples...");

      const loadSample = async (note: string, url: string, targetMap: Map<string, { buffer: AudioBuffer, baseFrequency: number }>) => {
        if (!this.audioContext || targetMap.has(note)) {
          return;
        }
        try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status} for ${url}`);
          }
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
          targetMap.set(note, { 
              buffer: audioBuffer, 
              baseFrequency: NOTE_FREQUENCIES[note as keyof typeof NOTE_FREQUENCIES] 
          });
        } catch (e) {
          console.error(`Failed to load or decode sample for ${note}:`, e);
        }
      };

      const pianoLoadPromises = Object.entries(this.pianoSampleFiles).map(([note, url]) => 
        loadSample(note, url, this.pianoSamples)
      );
      const stringLoadPromises = Object.entries(this.stringSampleFiles).map(([note, url]) => 
        loadSample(note, url, this.stringSamples)
      );

      await Promise.all([...pianoLoadPromises, ...stringLoadPromises]);
      console.log("Sample loading finished.");
    })().finally(() => {
      this.loadingPromise = null;
    });

    return this.loadingPromise;
  }

  private findClosestSample(frequency: number, sampleMap: Map<string, { buffer: AudioBuffer, baseFrequency: number }>): { buffer: AudioBuffer, baseFrequency: number } | null {
    if (sampleMap.size === 0) return null;

    let closestSample: { buffer: AudioBuffer, baseFrequency: number } | null = null;
    let minDiff = Infinity;

    for (const sample of sampleMap.values()) {
        const diff = Math.abs(sample.baseFrequency - frequency);
        if (diff < minDiff) {
            minDiff = diff;
            closestSample = sample;
        }
    }
    return closestSample;
  }

  public playNote(frequency: number, instrument: Instrument, duration: number = 0.5): void {
    if (!this.audioContext || !this.masterGain || !this.reverbNode || this.audioContext.state !== 'running') {
      return;
    }

    const now = this.audioContext.currentTime;
    
    // --- SAMPLE-BASED INSTRUMENTS (Piano and Strings) ---
    if (instrument === Instrument.ACOUSTIC_PIANO || instrument === Instrument.STRINGS) {
        const isPiano = instrument === Instrument.ACOUSTIC_PIANO;
        const sampleMap = isPiano ? this.pianoSamples : this.stringSamples;
        const sample = this.findClosestSample(frequency, sampleMap);

        if (!sample) {
            console.warn(`${isPiano ? 'Piano' : 'String'} samples not loaded yet for frequency ${frequency}.`);
            return;
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = sample.buffer;
        source.playbackRate.value = frequency / sample.baseFrequency;

        const noteGain = this.audioContext.createGain();

        // Reverb setup
        const reverbGain = this.audioContext.createGain();
        reverbGain.gain.setValueAtTime(isPiano ? 0.35 : 0.5, now);
        
        // Connect nodes: source -> noteGain -> masterGain & reverbGain -> reverbNode -> masterGain
        source.connect(noteGain);
        noteGain.connect(this.masterGain);
        noteGain.connect(reverbGain);
        reverbGain.connect(this.reverbNode);

        // Apply gain envelope to control note length
        const peakVolume = isPiano ? 0.7 : 0.6;
        const attackTime = 0.01;

        // Start silent, ramp up quickly, then ramp down over the note's duration.
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(peakVolume, now + attackTime);
        noteGain.gain.linearRampToValueAtTime(0.0001, now + duration);

        source.start(now);
        // Schedule the source to stop a bit after the note's envelope has finished.
        source.stop(now + duration + 0.1); 

        return; // End execution for sample-based instruments here
    }

    // --- SYNTHESIZED INSTRUMENTS ---
    const noteGain = this.audioContext.createGain();
    noteGain.gain.setValueAtTime(0, now);
    noteGain.connect(this.masterGain);

    const reverbGain = this.audioContext.createGain();
    reverbGain.gain.setValueAtTime(0.45, now);
    noteGain.connect(reverbGain);
    reverbGain.connect(this.reverbNode);
    
    let attackTime: number;
    let releaseTime: number;
    const oscillators: OscillatorNode[] = [];

    switch (instrument) {
      case Instrument.E_PIANO:
          const mainOsc = this.audioContext.createOscillator();
          mainOsc.type = 'triangle';
          mainOsc.frequency.setValueAtTime(frequency, now);
  
          const overtoneOsc = this.audioContext.createOscillator();
          overtoneOsc.type = 'sine';
          overtoneOsc.frequency.setValueAtTime(frequency * 2, now);
          
          const mainGain = this.audioContext.createGain();
          mainGain.gain.setValueAtTime(1.0, now);
          mainOsc.connect(mainGain);
          mainGain.connect(noteGain);
  
          const overtoneGain = this.audioContext.createGain();
          overtoneGain.gain.setValueAtTime(0.2, now);
          overtoneOsc.connect(overtoneGain);
          overtoneGain.connect(noteGain);
  
          oscillators.push(mainOsc, overtoneOsc);
          
          attackTime = 0.01;
          releaseTime = duration * 1.1;
          noteGain.gain.linearRampToValueAtTime(0.4, now + attackTime);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + releaseTime);
          break;

      case Instrument.BELL:
        const bellOsc1 = this.audioContext.createOscillator();
        const bellOsc2 = this.audioContext.createOscillator();
        bellOsc1.type = 'sine';
        bellOsc2.type = 'sine';
        bellOsc1.frequency.setValueAtTime(frequency * 1.5, now);
        bellOsc2.frequency.setValueAtTime(frequency * 2.53, now);

        bellOsc1.connect(noteGain);
        bellOsc2.connect(noteGain);
        oscillators.push(bellOsc1, bellOsc2);

        attackTime = 0.005;
        releaseTime = duration * 1.5;
        noteGain.gain.linearRampToValueAtTime(0.4, now + attackTime);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + releaseTime);
        break;
    }
    
    const stopTime = now + releaseTime + 0.5;
    oscillators.forEach(osc => {
      osc.start(now);
      osc.stop(stopTime);
    });
  }
}

const audioService = new AudioService();
export default audioService;