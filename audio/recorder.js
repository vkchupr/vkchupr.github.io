(function(window){

	var $record, $save, $cancel, $player;

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	URL = window.URL || window.webkitURL;

	audioContext = new AudioContext;
  	if (audioContext.createScriptProcessor == null) {
    	audioContext.createScriptProcessor = audioContext.createJavaScriptNode;
  	}

  	$record.on('click', function() {
  		$record.html('Success!');
    	if (audioRecorder.isRecording()) {
    	  	stopRecording(true);
    	} else {
      		startRecording();
    	}
  	});




}).call(this);