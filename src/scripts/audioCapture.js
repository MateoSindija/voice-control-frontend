import {
  characterMovementByStep,
  characterMovementcontinuous,
  character,
  clearAllIntervals,
  isContinuous,
  timer,
  handleCountinousChange,
  isOver,
  setIsMovementByStepCalled,
  setIsOver,
  setCharacterAtStart,
  resetTimer,
} from "../scripts/game.js";

import { db, collection, addDoc } from "./firebase.js";

const message = document.querySelector("#message");
let transcript = "";
const checkboxcontinuous = document.querySelector("#continuous");
const microphoneSvg = document.querySelector("#microphone");
const labelContinuous = document.querySelector("#labelContinuous");
const beginButton = document.querySelector("#begin");
const timerDiv = document.querySelector("#timer");
const nextBtn = document.querySelector("#next");
const url = window.location.href;
const currentSubjectName = localStorage.getItem("testSubject");
let wordCounter = 0;

microphoneSvg.style.display = "none";

if (nextBtn) nextBtn.disabled = true;

if (beginButton) {
  beginButton.onclick = () => {
    const userName = window.prompt("Your name");

    localStorage.setItem("testSubject", userName);

    if (!userName) return;

    location.href = "./src/levels/level1.html";
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

        if (
          transcript.trim().split(" ").pop() === "down" ||
          transcript.trim().split(" ").pop() === "up" ||
          transcript.trim().split(" ").pop() === "left" ||
          transcript.trim().split(" ").pop() === "right" ||
          transcript.trim().split(" ").pop() === "stop"
        )
          wordCounter++;
      }

      if (isContinuous) {
        characterMovementcontinuous(transcript.trim().split(" ").pop());
      } else {
        characterMovementByStep(transcript.trim().split(" ").pop());
      }

      document.querySelector("#transcription").innerHTML = transcript
        .trim()
        .split(" ")
        .pop();
      transcript = "";
    }
  };

  // Set the onClick property of the start button
  document.querySelector("#start").onclick = () => {
    //if checkbox exist check it
    if (checkboxcontinuous) {
      checkboxcontinuous.disabled = true;
      handleCountinousChange(checkboxcontinuous.checked);
    }

    setCharacterAtStart();
    setIsOver();

    message.style.visibility = "hidden";

    // Start the Speech Recognition
    speechRecognition.start();

    microphoneSvg.style.display = "block";

    document.querySelector("#start").disabled = true;
    if (labelContinuous) labelContinuous.style.color = "grey";
  };
  // Set the onClick property of the stop button
  document.querySelector("#stop").onclick = async () => {
    // Stop the Speech Recognition
    speechRecognition.stop();
    clearAllIntervals();

    if (!isOver) {
      setCharacterAtStart();
    }
    setIsMovementByStepCalled();

    if (checkboxcontinuous) checkboxcontinuous.disabled = false;
    // if (
    //   timerDiv &&
    //   url.includes("level") &&
    //   currentSubjectName &&
    //   isOver &&
    //   timer !== 0
    // ) {
    //   try {
    //     await addDoc(collection(db, "test-results"), {
    //       userName: currentSubjectName,
    //       timer: timer,
    //       level: url,
    //       wordCounter: wordCounter,
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    wordCounter = 0;
    resetTimer();
    if (timerDiv) timerDiv.innerHTML = "";
    document.querySelector("#start").disabled = false;
    microphoneSvg.style.display = "none";
    if (labelContinuous) labelContinuous.style.color = "black";
  };
} else {
  console.log("Speech Recognition Not Available");
}
