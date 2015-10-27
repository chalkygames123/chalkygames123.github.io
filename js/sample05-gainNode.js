! function () {

	var onDOMContentLoaded = function () {

		window.AudioContext = window.AudioContext || window.webkitAudioContext;

		try {
			var context = new AudioContext();
		} catch (error) {
			window.alert(error.message + ' : Please use Chrome or Safari');
			return;
		}

		var oscillator = context.createOscillator();
		var type = oscillator.type;
		var frequency = oscillator.frequency.value;
		var detune = oscillator.detune.value;

		context.createGain = context.createGain || context.createGainNode;

		var gain = context.createGain();

		var isStop = true;

		document.querySelector('.play-button').addEventListener(EventWrapper.CLICK, oscillatorButtonOnClickListener, false);
		document.querySelector('.range-volume').addEventListener('input', volumeOnInputListener, false);
		document.querySelector('.form-wave-type').addEventListener('change', waveTypeOnChangeListener, false);
		document.querySelector('.range-frequency').addEventListener('input', frequencyOnInputListener, false);
		document.querySelector('.range-detune').addEventListener('input', detuneOnInputListener, false);
		window.addEventListener('keypress', documentOnKeyPressListener, false);

		function documentOnKeyPressListener(e) {
			var keyCode = event.keyCode || e.which;
			if (keyCode == KeyCode.ENTER) {
				oscillatorButtonOnClickListener();
			}
			e.preventDefault();
		}

		function oscillatorButtonOnClickListener() {
			if (isStop) {
				oscillator = context.createOscillator();

				oscillator.start = oscillator.start || oscillator.nodeOn;
				oscillator.stop = oscillator.stop || oscillator.nodeOff;

				oscillator.connect(gain);
				gain.connect(context.destination);

				oscillator.type = type;
				oscillator.frequency.value = frequency;
				oscillator.detune.value = detune;

				oscillator.start(0);

				isStop = false;
			} else {
				oscillator.stop(0);

				isStop = true;
			}

			document.querySelector('.play-button').firstChild.classList.toggle("fa-play");
			document.querySelector('.play-button').firstChild.classList.toggle("fa-stop");
		}

		function volumeOnInputListener() {
			var min = gain.gain.minValue || 0;
			var max = gain.gain.maxValue || 1;

			if ((min <= this.valueAsNumber) && (this.valueAsNumber <= max)) {
				gain.gain.value = this.valueAsNumber;
				document.querySelector('.current-volume').textContent = this.value;
			}
		}

		function waveTypeOnChangeListener() {
			for (var i = 0, len = this.elements['radio-wave-type'].length; i < len; i++) {
				if (this.elements['radio-wave-type'][i].checked) {
					oscillator.type = type = (typeof oscillator.type === 'string') ? this.elements['radio-wave-type'][i].value : i;
					break;
				}
			}
		}

		function frequencyOnInputListener() {
			var min = oscillator.frequency.minValue || 0;
			var max = oscillator.frequency.maxValue || 100000;

			if ((min <= this.valueAsNumber) && (this.valueAsNumber <= max)) {
				oscillator.frequency.value = frequency = this.valueAsNumber;
				document.querySelector('.current-frequency').textContent = this.value;
			}
		}

		function detuneOnInputListener() {
			var min = oscillator.detune.minValue || -4800;
			var max = oscillator.detune.maxValue || 4800;

			if ((min <= this.valueAsNumber) && (this.valueAsNumber <= max)) {
				oscillator.detune.value = detune = this.valueAsNumber;
				document.querySelector('.current-detune').textContent = this.value;
			}
		}
	}

	if ((document.readyState === 'interactive') || (document.readyState === 'complete')) {
		onDOMContentLoaded();
	} else {
		document.addEventListener('DOMContentLoaded', onDOMContentLoaded, true);
	}

}();

// 空のメソッド "EventWrapper" をつくる
function EventWrapper() {}
// 空のメソッド "EventWrapper" の各プロパティに
// デバイスに応じたイベントタイプ名を設定する
! function () {
	var click = '';
	var start = '';
	var move = '';
	var end = '';

	// Touch Panel ?
	// スラッシュに囲まれた文字列は正規表現リテラルを表す
	if (/iPhone|iPad|iPod|Android/.test(navigator.userAgent)) {
		click = 'click';
		start = 'touchstart';
		move = 'touchmove';
		end = 'touchend';
	} else {
		click = 'click';
		start = 'mousedown';
		move = 'mousemove';
		end = 'mouseup';
	}

	EventWrapper.CLICK = click;
	EventWrapper.START = start;
	EventWrapper.MOVE = move;
	EventWrapper.END = end;
}();

function KeyCode() {}

! function () {
	var enter = 13;

	KeyCode.ENTER = 13;
}();