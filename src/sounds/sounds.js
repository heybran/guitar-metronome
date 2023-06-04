// @ts-check

/**
 * An AudioContext object that provides the main entry point to the Web Audio API.
 * @type {AudioContext}
 */
const audioContext = new AudioContext();

/**
 * The frequency of the accent beat sound.
 * @type {number}
 */
const accentBeatFrequency = 200; // A5

/**
 * The frequency of the normal beat sound.
 * @type {number}
 */
const normalBeatFrequency = 150; // A4

const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(2, 0);
primaryGainControl.connect(audioContext.destination);

/**
 * Creates an oscillator sound with the given frequency and gain envolope.
 * @param {number} frequency - The frequency of the oscillator sound.
 * @returns {OscillatorNode} An OscillatorNode object that generates the metronome sound.
 */
const createBeatSound = (frequency) => {
  const kickOscillator = audioContext.createOscillator();

  kickOscillator.frequency.setValueAtTime(frequency, 0);
  kickOscillator.frequency.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.5,
  );

  const kickGain = audioContext.createGain();
  kickGain.gain.setValueAtTime(1, 0);
  kickGain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.5,
  );

  kickOscillator.connect(kickGain);
  kickGain.connect(primaryGainControl);

  return kickOscillator;
};

/**
 * Plays the accent beat sound.
 */
export const playAccentBeatSound = () => {
  const accentBeatSound = createBeatSound(accentBeatFrequency);
  accentBeatSound.start();
  accentBeatSound.stop(audioContext.currentTime + 0.5);
};

/**
 * Plays the normal beat sound.
 */
export const playNormalBeatSound = () => {
  const normalBeatSound = createBeatSound(normalBeatFrequency);
  normalBeatSound.start();
  normalBeatSound.stop(audioContext.currentTime + 0.5);
};
