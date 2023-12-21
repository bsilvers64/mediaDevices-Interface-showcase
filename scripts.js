//green = btn-success
//blue = btn-primary
//grey = btn-secondary
//red = btn-danger

const buttonsById = [
  "share",
  "show-video",
  "stop-video",
  "change-size",
  "start-record",
  "stop-record",
  "play-record",
  "share-screen",
];

//buttonEls will be an array of dom elements in order of buttonsById
const buttonEls = buttonsById.map((buttonId) =>
  document.getElementById(buttonId)
);

// change the color of buttons
const changeButtons = (colorsArray) => {
  colorsArray.forEach((color, i) => {
    buttonEls[i].classList.remove("btn-success");
    buttonEls[i].classList.remove("btn-primary");
    buttonEls[i].classList.remove("btn-secondary");
    buttonEls[i].classList.remove("btn-danger");
    if (color === "green") {
      buttonEls[i].classList.add("btn-success");
    } else if (color === "blue") {
      buttonEls[i].classList.add("btn-primary");
    } else if (color === "grey") {
      buttonEls[i].classList.add("btn-secondary");
    } else if (color === "red") {
      buttonEls[i].classList.add("btn-danger");
    }
  });
};

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
  console.log(stream.getTracks());
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
