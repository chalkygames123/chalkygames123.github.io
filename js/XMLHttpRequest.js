window.AudioContext = window.AudioContext || window.webkitAudioContext;

// Create the instance of AudioContext
var context = new AudioContext();

var xhr = new XMLHttpRequest();
var url = 'http://xxx.jp/sample.wav';

xhr.onload = function() {
	if (xhr.status === 200) {
		var arrayBuffer = xhr.response;
		
		if (arrayBuffer instanceof ArrayBuffer) {
			// The 2nd argument for decodeAudioData
			var successCallback = function(audioBuffer) {
				/* audioBuffer is the instance of AudioBuffer */
				
				
				/* do something for playing the audio .... */
			};
			
			// The 3rd argument for decodeAudioData
			var errorCallback = function(error) {
				if (error instanceof Error) {
					window.alert(error.message);
				} else {
					window.alert('Error : "decodeAudioData" method.');
				}
			};
			
			// Create the instance of AudioBuffer (Asynchronously)
			context.decodeAudioData(arrayBuffer, successCallback, errorCallback);
		}
	}
};

xhr.open('GET', url, true);
xhr.responseType = 'arraybuffer'; // XMLHttpRequest Level 2
xhr.send(null);
