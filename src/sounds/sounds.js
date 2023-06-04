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
const accentBeatFrequency = 880; // A5

/**
 * The frequency of the normal beat sound.
 * @type {number}
 */
const normalBeatFrequency = 440; // A4

/**
 * The duration of each beat sound, in seconds.
 * @type {number}
 */
const beatDuration = 0.2; // 200ms

/**
 * Create a function that generates an AudioBufferSourceNode for a given frequency and duration
 * @param {number} frequency
 * @param {number} duration
 * @returns {AudioBufferSourceNode}
 */
const createBeatSound = (frequency, duration) => {
  // Create an AudioBuffer object with a single channel and a fixed duration
  const audioBuffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate * duration,
    audioContext.sampleRate,
  );

  // Get the channel data of the buffer and fill it with a sine wave at the give frequency
  const channelData = audioBuffer.getChannelData(0);
  for (let i = 0; i < channelData.length; i++) {
    channelData[i] = Math.sign(
      (2 * Math.PI * frequency * i) / audioContext.sampleRate,
    );
  }

  // Create an AudioBufferSourceNode and set its buffer and loop properties
  const audioSource = audioContext.createBufferSource();
  audioSource.buffer = audioBuffer;
  audioSource.loop = false;

  return audioSource;
};

/**
 * @returns {AudioBufferSourceNode}
 */
export const createAccentBeatSound = () => {
  console.log(audioContext);
  return createBeatSound(accentBeatFrequency, beatDuration);
};

/**
 * @returns {AudioBufferSourceNode}
 */
export const createNormalBeatSound = () => {
  return createBeatSound(normalBeatFrequency, beatDuration);
};

// Create an oscillator node to generate a periodic waveform
// const oscillator = audioContext.createOscillator();
// // Set the waveform type to sine
// oscillator.type = 'sine';
// // Set the frequency to 880Hz (A5)
// // A5 refers to a musical note in the scientific pitch notation ststem
// oscillator.frequency.value = 880;

// // Create a gain node to control the volume of the sound
// const gain = audioContext.createGain();
// gain.gain.value = 0.5; // Set the volume to 50%

// // Connect the oscillator to the gain node, and the gain node
// // to the audio context destination
// oscillator.connect(gain);
// gain.connect(audioContext.destination);

// // Start the oscillator
// oscillator.start();
