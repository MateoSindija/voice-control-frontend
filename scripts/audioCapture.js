let transcript = "";
let isContinous = false;
const checkboxContinous = document.querySelector("#continous");
const microphoneSvg = document.querySelector("#microphone");
const labelContionus = document.querySelector("#labelContionus");

microphoneSvg.style.display = "none";

if ("webkitSpeechRecognition" in window) {
  // Initialize webkitSpeechRecognition
  let speechRecognition = new webkitSpeechRecognition();

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = "en-AU";

  speechRecognition.onresult = (event) => {
    // Loop through the results from the speech recognition object.
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (!event.results[i].isFinal) {
        transcript = event.results[i][0].transcript;
      }

      if (isContinous) {
        characterMovementContinous(transcript.trim());
      } else {
        characterMovementByStep(transcript.trim());
      }

      document.querySelector("#transcription").innerHTML = transcript;
      transcript = "";
    }
  };

  // Set the onClick property of the start button
  document.querySelector("#start").onclick = () => {
    //if checkbox exist check it
    if (checkboxContinous) {
      checkboxContinous.disabled = true;
      isContinous = checkboxContinous.checked;
    }
    // Start the Speech Recognition
    speechRecognition.start();

    microphoneSvg.style.display = "block";

    document.querySelector("#start").disabled = true;
    if (labelContionus) labelContionus.style.color = "grey";
  };
  // Set the onClick property of the stop button
  document.querySelector("#stop").onclick = () => {
    // Stop the Speech Recognition
    speechRecognition.stop();
    character.x = 23;
    character.y = 577;

    if (checkboxContinous) checkboxContinous.disabled = false;

    document.querySelector("#start").disabled = false;
    microphoneSvg.style.display = "none";
    if (labelContionus) labelContionus.style.color = "black";
    clearAllIntervals();
  };
} else {
  console.log("Speech Recognition Not Available");
}
