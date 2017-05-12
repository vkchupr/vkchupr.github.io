(function(window){

	var $record, $save, $cancel, $player;

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	URL = window.URL || window.webkitURL;

	audioContext = new AudioContext;
  	if (audioContext.createScriptProcessor == null) {
    	audioContext.createScriptProcessor = audioContext.createJavaScriptNode;
  	}

  	startRecording = function() {
	    $record.html('STOP');
	    $cancel.removeClass('hidden');
	    disableControlsOnRecord(true);
	    audioRecorder.setOptions({
	      timeLimit: 60,
	      encodeAfterRecord: encodingProcess === 'separate',
	      progressInterval: $reportInterval[0].valueAsNumber * 1000,
	      mp3: {
	        bitRate: 64
	      }
	    });
	    audioRecorder.startRecording();
	    setProgress(0);
  	};

  	stopRecording = function(finish) {
	    $recording.addClass('hidden');
	    $record.html('RECORD');
	    $cancel.addClass('hidden');
	    disableControlsOnRecord(false);
	    if (finish) {
	      audioRecorder.finishRecording();
	    } else {
	      audioRecorder.cancelRecording();
	    }
  	};

  	saveRecording = function(blob, enc) {
	    var html, time, url;
	    time = new Date();
	    url = URL.createObjectURL(blob);
	    html = ("<p recording='" + url + "'>") + ("<audio controls src='" + url + "'></audio> ") + ("(" + enc + ") " + (time.toString()) + " ") + ("<a class='btn btn-default' href='" + url + "' download='recording." + enc + "'>") + "Save..." + "</a> " + ("<button class='btn btn-danger' recording='" + url + "'>Delete</button>");
	    "</p>";
	    $recordingList.prepend($(html));
	};

  	$record.on('click', function() {
    	if (audioRecorder.isRecording()) {
    	  	stopRecording(true);
    	} else {
      		startRecording();
    	}
  	});

  	$cancel.on('click', function() {
    	stopRecording(false);
  	});

  	$save.on('click', function() {
    	saveRecording(false);
  	});


}).call(this);