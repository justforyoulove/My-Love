// Web Audio API ambient soothing piano synthesizer for romantic background music

class RomanticAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private volumeNode: GainNode | null = null;
  private masterVolume: number = 0.5;

  private chords = [
    // Fmaj7
    [174.61, 220.0, 261.63, 329.63],
    // Cmaj7
    [130.81, 164.81, 196.0, 246.94],
    // Am7
    [110.0, 130.81, 164.81, 196.0],
    // G6
    [98.0, 123.47, 146.83, 196.0]
  ];

  private currentChordIndex = 0;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.masterVolume = Math.max(0, Math.min(1, val));
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setTargetAtTime(this.masterVolume, this.ctx.currentTime, 0.1);
    }
  }

  public playNote(freq: number, duration: number = 3.5, timeOffset: number = 0) {
    if (!this.ctx || !this.volumeNode) return;

    const startTime = this.ctx.currentTime + timeOffset;
    
    // Main soft oscillator (Sine + Triangle for gentle piano warmth)
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime); // Gentle octave harmonic

    // Gentle low-pass filter for soothing warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, startTime);
    filter.frequency.exponentialRampToValueAtTime(150, startTime + duration);

    // Envelope
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(0.15, startTime + 0.15); // soft attack
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration); // smooth decay

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.03, startTime);

    osc.connect(noteGain);
    osc2.connect(subGain);
    subGain.connect(filter);
    noteGain.connect(filter);
    filter.connect(this.volumeNode);

    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  }

  public playArpeggio() {
    if (!this.isPlaying) return;
    this.initCtx();

    const currentChord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    // Arpeggiate chord with soft piano timing
    currentChord.forEach((freq, idx) => {
      this.playNote(freq, 4.0, idx * 0.4);
      // High delicate shimmer note
      if (idx === 3) {
        this.playNote(freq * 2, 3.0, idx * 0.4 + 0.6);
      }
    });

    // Schedule next chord in sequence
    this.timerId = window.setTimeout(() => {
      this.playArpeggio();
    }, 4500);
  }

  public start() {
    if (this.isPlaying) return;
    this.initCtx();
    this.isPlaying = true;
    this.playArpeggio();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioSynth();
