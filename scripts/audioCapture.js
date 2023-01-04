let transcript = "";
let isContinuous = false;
const checkboxcontinuous = document.querySelector("#continuous");
const microphoneSvg = document.querySelector("#microphone");
const labelContinuous = document.querySelector("#labelContinuous");
const beginButton = document.querySelector("#begin");
const timerDiv = document.querySelector("#timer");
const nextBtn = document.querySelector("#next");

let timer = 1;

microphoneSvg.style.display = "none";

if (nextBtn) nextBtn.disabled = true;

if (beginButton) {
  beginButton.onclick = () => {
    const userName = window.prompt("Your name");

    localStorage.setItem("voiceUser", userName);

    if (!userName) return;

    location.href = "../levels/level1.html";
  };
}

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
      } else {
        transcript = "";
      }

      if (iscontinuous) {
        characterMovementcontinuous(transcript.trim());
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
    if (checkboxcontinuous) {
      checkboxcontinuous.disabled = true;
      iscontinuous = checkboxcontinuous.checked;
    }

    // Start the Speech Recognition
    speechRecognition.start();

    if (url.includes("level")) {
      setInterval(() => {
        timer = Math.round((timer + 0.1) * 100) / 100;

        timerDiv.innerHTML = timer + " s";
      }, 100);
    }

    microphoneSvg.style.display = "block";

    document.querySelector("#start").disabled = true;
    if (labelContinuous) labelContinuous.style.color = "grey";
  };
  // Set the onClick property of the stop button
  document.querySelector("#stop").onclick = () => {
    // Stop the Speech Recognition
    speechRecognition.stop();
    character.x = 23;
    character.y = 577;

    if (checkboxcontinuous) checkboxcontinuous.disabled = false;
    if (timerDiv) timer = 0;

    document.querySelector("#start").disabled = false;
    microphoneSvg.style.display = "none";
    if (labelContinuous) labelContinuous.style.color = "black";
    clearAllIntervals();
  };
} else {
  console.log("Speech Recognition Not Available");
}
