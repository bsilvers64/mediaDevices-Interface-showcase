const shareScreen = async () => {
  const options = {
    video: true,
    audio: true,
    surfaceSwitching: "include",
  };

  try {
    stream = await navigator.mediaDevices.getDisplayMedia(options);
  } catch (err) {
    console.log("user denied access to constraints");
    console.log(err);
    /* handle the error  in case of promise reject when user says no to the prompt*/
  }
  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "green",
    "green",
    "green",
    "green",
  ]);
};
