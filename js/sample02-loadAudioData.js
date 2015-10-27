window.AudioContext = window.AudioContext || window.webkitAudioContext;

// Create the instance of AudioContext
var context = new AudioContext();

function getData() {
	source = context.createBufferSource();
	request = new XMLHttpRequest();
	request.open('GET', 'sounds/loop_106.mp3', true);
	request.responseType = 'arraybuffer';
	request.onload = function() {
		var audioData = request.response;
		context.decodeAudioData(audioData, function(buffer) {
			source.buffer = buffer;
			source.connect(context.destination);
			source.loop = true;
		},

		function(e){"Error with decoding audio data" + e.err});
	}

	request.send();
}

var play = document.querySelector('.play');
var stop = document.querySelector('.stop');

play.onclick = function() {
	getData();
	source.start(0);
	play.setAttribute('disabled', 'disabled');
}

stop.onclick = function() {
	source.stop(0);
	play.removeAttribute('disabled');
}
