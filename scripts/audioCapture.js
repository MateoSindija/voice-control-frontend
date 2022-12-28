let transcript = "";

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
        }

        characterMovement(transcript);

        document.querySelector("#transcription").innerHTML = transcript;
        transcript = "";
    };

    // Set the onClick property of the start button
    document.querySelector("#start").onclick = () => {
        // Start the Speech Recognition
        speechRecognition.start();
    };
    // Set the onClick property of the stop button
    document.querySelector("#stop").onclick = () => {
        // Stop the Speech Recognition
        speechRecognition.stop();
        character.x = 23;
        character.y = 577;
    };
} else {
    console.log("Speech Recognition Not Available");
}
