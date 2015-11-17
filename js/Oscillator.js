window.AudioContext = window.AudioContext || window.webkitAudioContext;

// Create the instance of AudioContext
var context = new AudioContext();

// Create the instance of OscillatorNode
var oscillator = context.createOscillator();

// OscillatorNode (Input) -> AudioDestinationNode (Output)
oscillator.connect(context.destination);

// for legacy browsers
oscillator.start = oscillator.start || oscillator.noteOn;
oscillator.stop = oscillator.stop || oscillator.noteOff;

// Start sound
oscillator.start(0);

// Stop sound (after 0.5 sec)
window.setTimeout(function() {
	oscillator.stop(0);
}, 500);

// for legacy browsers
context.createGain = context.createGain || createGainNode;

// Create the instance of GainNode
var gain = context.createGain();

// OscillatorNode (Input) -> GainNode (Volume Controller) -> AudioDestinationNode (Output)
oscillator.connect(gain);
gain.connect(context.destination);

gain.gain.value = 0;
console.log(gain);
