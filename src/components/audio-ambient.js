/**
 * BAKERZ BITE - Web Audio Atmospheric Ambient Soundscape
 * Creates a soothing, warm harmonic drone inspired by luxury sensory spaces.
 * Synthesized directly in real-time via Web Audio API - zero external assets.
 */

export class AmbientSoundscape {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
  }

  init() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;

    this.audioCtx = new AudioContext();

    // Master Gain
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);

    // Warm Low-Pass Filter
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(1.5, this.audioCtx.currentTime);

    // Subtle Stereo Panner or Convolver
    this.masterGain.connect(filter);
    filter.connect(this.audioCtx.destination);

    // Harmonics: 108Hz (A2), 162Hz (E3), 216Hz (A3), 270Hz (C#4), 324Hz (E4)
    const baseFreqs = [108, 162, 216, 270, 324];

    baseFreqs.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Subtle detune for rich warmth
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, this.audioCtx.currentTime);

      const amp = 0.08 / (idx + 1);
      oscGain.gain.setValueAtTime(amp, this.audioCtx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);
      osc.start();
      this.oscillators.push(osc);
    });

    return true;
  }

  toggle() {
    if (!this.audioCtx) {
      this.init();
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (this.isPlaying) {
      // Fade out smoothly
      this.masterGain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 1.2);
      this.isPlaying = false;
    } else {
      // Fade in gently
      this.masterGain.gain.linearRampToValueAtTime(0.28, this.audioCtx.currentTime + 2.0);
      this.isPlaying = true;
    }

    return this.isPlaying;
  }
}
