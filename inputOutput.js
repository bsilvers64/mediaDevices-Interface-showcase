const audioInputEl = document.querySelector('#audio-input')
const audioOutputEl = document.querySelector("#audio-output");
const videoInputEl = document.querySelector("#video-input");

// we are basically getting all permitted devices, and adding them to out options tag  
const getDevices = async() => {
    try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);

        devices.forEach(d => {
          const option = document.createElement("option"); //create the option tag
          option.value = d.deviceId;
          option.text = d.label;

          // add the option tag we just created to the right select
          if (d.kind === "audioinput") {
            audioInputEl.appendChild(option);
          }else if (d.kind === "audiooutput") {
            audioOutputEl.appendChild(option);
          }else if (d.kind === "videoinput") {
            videoInputEl.appendChild(option);
          } 
        })
    }
    catch (err){
        console.log(err);
    }
}


const changeAudioOutput = async (e) => {
    await videoEl.setSinkId(e.target.value);
    console.log("changed audio device");
};

const changeAudioInput = async (e) => {
    const deviceId = e.target.value;
    const newConstraints = {
        audio: {deviceId: {exact: deviceId}},
        video: true,
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia(newConstraints);
        console.log(stream);
          const tracks = stream.getAudioTracks();
            console.log(tracks);
    }    
    catch (err){
        console.log(err);
    }

}

const changeVideoInput = async (e) => {
    // changed video input 
  const deviceId = e.target.value;
  console.log(deviceId);
  const newConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(newConstraints);
    console.log(stream);
    const tracks = stream.getVideoTracks();
    console.log(tracks);
  } catch (err) {
    console.log(err);
  }
};