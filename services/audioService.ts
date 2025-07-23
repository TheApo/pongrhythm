class AudioService {
  private audioContext: AudioContext | null = null;

  public init(): void {
    // No-op if context is already created and running.
    if (this.audioContext && this.audioContext.state === 'running') {
      return;
    }

    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.error("Web Audio API is not supported in this browser");
        return;
      }
    }

    // Resume the context if it's suspended. This is required by modern browsers
    // which auto-suspend audio contexts until a user gesture.
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  public playNote(frequency: number, duration: number = 0.3): void {
    this.init(); // Ensure context is running before playing a note.
    if (!this.audioContext || this.audioContext.state !== 'running') {
      // Don't play if the context isn't running (e.g., failed to init or resume).
      return;
    }

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }
}

const audioService = new AudioService();
export default audioService;