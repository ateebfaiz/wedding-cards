/**
 * Procedural Web Audio Engine for Heirloom Wedding Invitations
 * Generates tactile tactile sounds (wax seal crack, envelope unfold, golden chime)
 * and ambient acoustic soundscapes without requiring heavy external MP3/WAV assets.
 */

class WeddingAudioManager {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private isAmbientPlaying: boolean = false;
  private isMuted: boolean = false;
  private sfxEnabled: boolean = true;
  private masterGain: GainNode | null = null;

  constructor() {
    // Initialized lazily on first user interaction to comply with browser autoplay policies
  }

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    } catch (e) {
      console.warn('Web Audio not supported in this environment', e);
    }
  }

  public async unlockAudio(): Promise<void> {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (err) {
        console.warn('Failed to resume audio context', err);
      }
    }
  }

  /**
   * Wax seal fracture & snap sound
   */
  public playWaxSealCrack(): void {
    if (!this.sfxEnabled || this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;

    // High frequency brittle snap
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    snapOsc.type = 'sawtooth';
    snapOsc.frequency.setValueAtTime(1200, t);
    snapOsc.frequency.exponentialRampToValueAtTime(180, t + 0.12);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, t);
    filter.Q.setValueAtTime(4, t);

    snapGain.gain.setValueAtTime(0.6, t);
    snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    snapOsc.connect(filter);
    filter.connect(snapGain);
    snapGain.connect(this.sfxGain);

    snapOsc.start(t);
    snapOsc.stop(t + 0.15);

    // Deep resonant release
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, t + 0.02);
    subOsc.frequency.exponentialRampToValueAtTime(45, t + 0.25);

    subGain.gain.setValueAtTime(0.5, t + 0.02);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);

    subOsc.start(t + 0.02);
    subOsc.stop(t + 0.3);
  }

  /**
   * Paper unfold / envelope rustle sound
   */
  public playPaperRustle(): void {
    if (!this.sfxEnabled || this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx || !this.sfxGain) return;

    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(1600, this.ctx.currentTime + 0.3);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(t);
    noise.stop(t + 0.4);
  }

  /**
   * Delicate celebratory antique chime (warm ceremonial harmony)
   */
  public playCeremonialChime(): void {
    if (!this.sfxEnabled || this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx || !this.sfxGain) return;

    const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Pristine chord)
    const t = this.ctx.currentTime;

    frequencies.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);

      const noteTime = t + idx * 0.08;
      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.25 / (idx + 1), noteTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.8);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + 1.9);
    });
  }

  /**
   * Starts ambient acoustic drone / ceremonial harmonic bed
   */
  public startAmbientSoundscape(): void {
    if (this.isAmbientPlaying || this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx || !this.ambientGain) return;

    this.stopAmbientSoundscape();
    this.isAmbientPlaying = true;

    // Frequencies: Warm tanpura / acoustic pad harmony (D - A - D - F#)
    const notes = [146.83, 220.0, 293.66, 369.99];
    const t = this.ctx.currentTime;

    this.ambientGain.gain.setValueAtTime(0.0001, t);
    this.ambientGain.gain.linearRampToValueAtTime(0.18, t + 2.5); // Slow, gentle fade-in

    this.ambientOscillators = notes.map((freq, i) => {
      if (!this.ctx || !this.ambientGain) throw new Error('No context');
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const localGain = this.ctx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      // Low pass filter to keep sound buttery and warm
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650 + i * 150, t);

      localGain.gain.setValueAtTime(0.25 / notes.length, t);

      osc.connect(filter);
      filter.connect(localGain);
      localGain.connect(this.ambientGain);

      osc.start(t);
      return osc;
    });
  }

  public stopAmbientSoundscape(): void {
    if (!this.ctx || !this.ambientGain) return;
    const t = this.ctx.currentTime;
    try {
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, t);
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, t + 1.0); // Gentle fade-out
      setTimeout(() => {
        this.ambientOscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Already stopped
          }
        });
        this.ambientOscillators = [];
        this.isAmbientPlaying = false;
      }, 1000);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      const t = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, t);
    }
    if (this.isMuted && this.isAmbientPlaying) {
      this.stopAmbientSoundscape();
    } else if (!this.isMuted && !this.isAmbientPlaying) {
      this.startAmbientSoundscape();
    }
    return this.isMuted;
  }

  public toggleSFX(): boolean {
    this.sfxEnabled = !this.sfxEnabled;
    return this.sfxEnabled;
  }

  public getState() {
    return {
      isAmbientPlaying: this.isAmbientPlaying,
      isMuted: this.isMuted,
      sfxEnabled: this.sfxEnabled,
    };
  }
}

// Singleton audio engine instance for client
export const weddingAudio = typeof window !== 'undefined' ? new WeddingAudioManager() : ({} as WeddingAudioManager);
