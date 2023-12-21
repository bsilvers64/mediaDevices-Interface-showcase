const videoEl = document.querySelector("#my-video");
let stream = null;

const constraints = {
  audio: true,
  video: true,
};

const getMicandCamera = async (e) => {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    /* use the stream */
    changeButtons([
      "green",
      "blue",
      "blue",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
    ]);
  } catch (err) {
    console.log("user denied access to constraints");
    console.log(err);
    /* handle the error  in case of promise reject when user says no to the prompt*/
  }
};

const showMyFeed = (e) => {
  if (!stream) {
    alert("Stream is still loading...");
    return;
  }
  console.log("show my feed is working");
      changeButtons([
        "green",
        "green",
        "blue",
        "blue",
        "blue",
        "grey",
        "grey",
        "blue",
      ]);
  //console.log(stream.getTracks());
  // this will set MediaStream object to our video />
  videoEl.srcObject = stream;
};

const stopMyFeed = (e) => {
  if (!stream) {
    alert("Stream is still loading...");
    return;
  }
      changeButtons([
        "blue",
        "grey",
        "grey",
        "grey",
        "grey",
        "grey",
        "grey",
        "grey",
      ]); 
  //videoEl.srcObject = null;

  // we can also dissasociate the tracks with the source -

  const tracks = stream.getTracks();

  tracks.forEach((track) => {
    track.stop();
  });

  // but after this option, the feed won't start again as the tracks and source are disconnected
  console.log("feed stopped");
};

// this adds the on click event to the share button which runs this function -
document.querySelector("#share").addEventListener("click", (e) => {
  getMicandCamera(e);
});

// click on the show my video button
document.querySelector("#show-video").addEventListener("click", (e) => {
  showMyFeed(e);
});

document.querySelector("#stop-video").addEventListener("click", (e) => {
  stopMyFeed(e);
});
