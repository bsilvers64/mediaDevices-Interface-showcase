let mediaRecorder;
let recordedBlobs;

const startRecording = () => {
  // we can use mediaStream here to record the screenshare
  if (!stream) {
    alert("No current feed");
    return;
  }

  console.log("start recording");

  // we can use mediaStream here to record the screenshare
  mediaRecorder = new MediaRecorder(stream);
  console.log(mediaRecorder);
  
  recordedBlobs = []; // an array to hold the blobs for playback
  mediaRecorder.ondataavailable = (e) => {
    //  make a mediaRecorder form the constructer

    //ondataavailable will run when te stream ends, or stopped or we specifically asked for it

    console.log("Data is available for the media recorder!");

    recordedBlobs.push(e.data);
  };

  mediaRecorder.start();

  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "green",
    "blue",
    "grey",
    "blue",
  ]);
};

const stopRecording = () => {
        if (!mediaRecorder) {
          alert("please record before stopping");
          return;
        }

  console.log("stop recording");

  mediaRecorder.stop();
      changeButtons([
        "green",
        "green",
        "blue",
        "blue",
        "green",
        "green",
        "blue",
        "blue",
      ]);

};

const playRecording = () => {
        if (!recordedBlobs) {
          alert("No Recording saved");
          return;
        }

  console.log("play recording");

  const superBuffer = new Blob(recordedBlobs); // superbuffer is a our array of blobs
  console.log(recordedBlobs);
  const recordedVideoEl = document.querySelector("#other-video");

  // The URL.createObjectURL() static method creates a string containing a URL representing the object given in the parameter.
  recordedVideoEl.src = window.URL.createObjectURL(superBuffer);
console.log(recordedVideoEl.src);
  recordedVideoEl.controls = true
  recordedVideoEl.play()

        changeButtons([
          "green",
          "green",
          "blue",
          "blue",
          "green",
          "green",
          "green",
          "blue",
        ]);
};
