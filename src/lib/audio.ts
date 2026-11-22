/**
 * Procedural Web Audio Engine for Heirloom Wedding Invitations
 * Synthesizes a traditional subcontinental ceremonial melody (Shehnai/Flute & Tanpura Drone),
 * wax crack physics, and golden chimes with zero external audio file latency.
 */

class WeddingAudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private sequenceTimer: number | null = null;
  private droneOscillators: OscillatorNode[] = [];

  constructor() {
    // Context will initialize on first user gesture
  }

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.65, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.55, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    } catch (e) {
      console.warn('Web Audio not supported', e);
    }
  }

  public async unlockAudio(): Promise<boolean> {
    this.initContext();
    if (!this.ctx) return false;
    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (err) {
        console.warn('Failed to resume audio context', err);
      }
    }
    return this.ctx.state === 'running';
  }

  /**
   * Wax Seal Crack SFX
   */
  public playWaxSealCrack(): void {
    if (this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;

    // High frequency brittle snap
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    snapOsc.type = 'sawtooth';
    snapOsc.frequency.setValueAtTime(1400, t);
    snapOsc.frequency.exponentialRampToValueAtTime(160, t + 0.12);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2600, t);
    filter.Q.setValueAtTime(4, t);

    snapGain.gain.setValueAtTime(0.7, t);
    snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    snapOsc.connect(filter);
    filter.connect(snapGain);
    snapGain.connect(this.sfxGain);

    snapOsc.start(t);
    snapOsc.stop(t + 0.15);

    // Deep resonant thump
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(150, t + 0.02);
    subOsc.frequency.exponentialRampToValueAtTime(40, t + 0.25);

    subGain.gain.setValueAtTime(0.6, t + 0.02);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);

    subOsc.start(t + 0.02);
    subOsc.stop(t + 0.3);
  }

  /**
   * Plays a single traditional Shehnai/Flute note with vibrato and wooden warmth
   */
  private playShehnaiNote(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.musicGain) return;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    // Primary reed / pipe timbre
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Harmonic overtone
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq * 2, startTime);

    // Subtle breath vibrato
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(5.5, startTime); // 5.5 Hz vibrato rate
    vibratoGain.gain.setValueAtTime(freq * 0.015, startTime);
    vibrato.connect(osc.frequency);
    vibrato.connect(subOsc.frequency);
    vibrato.start(startTime);
    vibrato.stop(startTime + duration);

    // Warm formant filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, startTime);
    filter.frequency.linearRampToValueAtTime(800, startTime + duration);

    // Gentle shehnai envelope (soft attack, sustained breath, gentle release)
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.linearRampToValueAtTime(0.3, startTime + 0.08);
    noteGain.gain.setValueAtTime(0.28, startTime + duration - 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.musicGain);

    osc.start(startTime);
    subOsc.start(startTime);
    osc.stop(startTime + duration);
    subOsc.stop(startTime + duration);
  }

  /**
   * Golden chime on downbeat
   */
  private playGoldenBell(startTime: number) {
    if (!this.ctx || !this.musicGain) return;
    const bellOsc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(1046.5, startTime); // C6 bell

    bellGain.gain.setValueAtTime(0.15, startTime);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.6);

    bellOsc.connect(bellGain);
    bellGain.connect(this.musicGain);

    bellOsc.start(startTime);
    bellOsc.stop(startTime + 1.8);
  }

  /**
   * Starts Tanpura drone (D & A strings)
   */
  private startTanpuraDrone() {
    if (!this.ctx || !this.musicGain) return;
    this.stopTanpuraDrone();

    // Tanpura frequencies: D3 (146.83 Hz), A3 (220 Hz), D4 (293.66 Hz)
    const droneFreqs = [146.83, 220.0, 293.66];
    const t = this.ctx.currentTime;

    this.droneOscillators = droneFreqs.map((f, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = i === 0 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(f, t);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350 + i * 100, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 2.0); // Slow fade-in

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain!);

      osc.start(t);
      return osc;
    });
  }

  private stopTanpuraDrone() {
    this.droneOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.droneOscillators = [];
  }

  /**
   * Starts the traditional celebratory Raag melody sequence
   */
  public startTraditionalMusic(): void {
    if (this.isPlaying || this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx || !this.musicGain) return;

    this.isPlaying = true;
    this.startTanpuraDrone();

    // Traditional wedding scale notes (D, F#, G, A, B, C#5, D5)
    // Frequencies:
    const D4 = 293.66;
    const E4 = 329.63;
    const Fs4 = 369.99;
    const G4 = 392.0;
    const A4 = 440.0;
    const B4 = 493.88;
    const Cs5 = 554.37;
    const D5 = 587.33;

    // Celebratory Shehnai melody motif:
    // [frequency, duration in seconds]
    const melody: Array<[number, number]> = [
      [D4, 0.45],
      [Fs4, 0.45],
      [A4, 0.7],
      [B4, 0.4],
      [A4, 0.45],
      [D5, 0.8],
      [Cs5, 0.4],
      [B4, 0.45],
      [A4, 0.9],
      // Second phrase
      [Fs4, 0.45],
      [G4, 0.4],
      [A4, 0.6],
      [B4, 0.4],
      [A4, 0.5],
      [Fs4, 0.6],
      [E4, 0.4],
      [D4, 1.2],
    ];

    let currentStep = 0;
    const playNext = () => {
      if (!this.isPlaying || !this.ctx || this.isMuted) return;

      const [freq, dur] = melody[currentStep];
      const now = this.ctx.currentTime;

      // Downbeat bell chime on first note
      if (currentStep === 0 || currentStep === 5) {
        this.playGoldenBell(now);
      }

      this.playShehnaiNote(freq, now, dur);

      currentStep = (currentStep + 1) % melody.length;
      this.sequenceTimer = window.setTimeout(playNext, dur * 1000 + 40);
    };

    // Kick off melody after tanpura drone establishes (600ms)
    this.sequenceTimer = window.setTimeout(playNext, 600);
  }

  public stopTraditionalMusic(): void {
    this.isPlaying = false;
    if (this.sequenceTimer) {
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
    this.stopTanpuraDrone();
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.stopTraditionalMusic();
      return false;
    } else {
      this.unlockAudio();
      this.startTraditionalMusic();
      return true;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      const t = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.65, t);
    }
    if (this.isMuted) {
      this.stopTraditionalMusic();
    } else {
      this.startTraditionalMusic();
    }
    return this.isMuted;
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
    };
  }
}

export const weddingAudio = typeof window !== 'undefined' ? new WeddingAudioManager() : ({} as WeddingAudioManager);
