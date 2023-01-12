const CHAR_MOVE_MS = 100;

let levelData;
let jsonUrl = "";
export let timer = 1;
export let isOver = false;

const timerDiv = document.querySelector("#timer");
const url = window.location.href;
export let isContinuous = false;
const nextBtn = document.querySelector("#next");
let canvas = document.getElementById("game");
const message = document.querySelector("#message");
let isMovementByStepCalled = true;
let characterIsMoving = false;
let currentVoiceCommand = "";

canvas.width = 1500;
canvas.height = 600;

const circle = canvas.getContext("2d");
const finishCtx = canvas.getContext("2d");

if (!url.includes("level")) {
  jsonUrl = "./src/json/practice.json";
} else if (url.includes("level1.")) {
  jsonUrl = "../json/level1.json";
} else if (url.includes("level2.")) {
  jsonUrl = "../json/level2.json";
} else if (url.includes("level3.")) {
  jsonUrl = "../json/level3.json";
} else if (url.includes("level4.")) {
  jsonUrl = "../json/level4.json";
} else if (url.includes("level5.")) {
  jsonUrl = "../json/level5.json";
} else if (url.includes("level6.")) {
  jsonUrl = "../json/level6.json";
} else if (url.includes("level7.")) {
  jsonUrl = "../json/level7.json";
} else if (url.includes("level8.")) {
  jsonUrl = "../json/level8.json";
} else if (url.includes("level9.")) {
  jsonUrl = "../json/level9.json";
} else if (url.includes("level10.")) {
  jsonUrl = "../json/level10.json";
} else if (url.includes("level11.")) {
  jsonUrl = "../json/level11.json";
} else if (url.includes("level12.")) {
  jsonUrl = "../json/level12.json";
} else if (url.includes("level13.")) {
  jsonUrl = "../json/level13.json";
} else if (url.includes("level14.")) {
  jsonUrl = "../json/level14.json";
} else if (url.includes("level15.")) {
  jsonUrl = "../json/level15.json";
} else if (url.includes("level16.")) {
  jsonUrl = "../json/level16.json";
} else if (url.includes("level17.")) {
  jsonUrl = "../json/level17.json";
} else if (url.includes("level18.")) {
  jsonUrl = "../json/level18.json";
} else if (url.includes("level19.")) {
  jsonUrl = "../json/level19.json";
} else if (url.includes("level20.")) {
  jsonUrl = "../json/level20.json";
} else if (url.includes("level21.")) {
  jsonUrl = "../json/level21.json";
} else if (url.includes("level22.")) {
  jsonUrl = "../json/level22.json";
} else if (url.includes("level23.")) {
  jsonUrl = "../json/level23.json";
} else if (url.includes("level24.")) {
  jsonUrl = "../json/level24.json";
} else if (url.includes("level25.")) {
  jsonUrl = "../json/level25.json";
} else if (url.includes("level26.")) {
  jsonUrl = "../json/level26.json";
} else if (url.includes("level27.")) {
  jsonUrl = "../json/level27.json";
} else if (url.includes("level28.")) {
  jsonUrl = "../json/level28.json";
} else if (url.includes("level29.")) {
  jsonUrl = "../json/level29.json";
} else if (url.includes("level30.")) {
  jsonUrl = "../json/level30.json";
} else if (url.includes("level31.")) {
  jsonUrl = "../json/level31.json";
} else if (url.includes("level32.")) {
  jsonUrl = "../json/level32.json";
}

export const character = {
  x: 20,
  y: 577,
  radius: 18,
  speed: 55,
};

const finish = {
  x: 100,
  y: 100,
  size: 70,
};

const borders = {
  left: 0 + character.radius,
  right: canvas.width - character.radius,
  top: 0 + character.radius,
  bottom: canvas.height - character.radius,
};

fetch(jsonUrl)
  .then((response) => response.json())
  .then((json) => {
    levelData = json;

    if (levelData.type === "step") {
      isContinuous = false;
    } else if (levelData.type === "continuous") {
      isContinuous = true;
    }

    finish.x = levelData.x;
    finish.y = levelData.y;
    finish.size = levelData.size;

    const isCollision = () => {
      let distX = Math.abs(character.x - finish.x - finish.size / 2);
      let distY = Math.abs(character.y - finish.y - finish.size / 2);

      if (distX > finish.size / 2 + character.radius) {
        return false;
      }
      if (distY > finish.size / 2 + character.radius) {
        return false;
      }

      if (distX <= finish.size / 2) {
        return true;
      }

      if (distY <= finish.size / 2) {
        return true;
      }

      let dx = distX - finish.size / 2;
      let dy = distY - finish.size / 2;
      return dx * dx + dy * dy <= character.radius * character.radius;
    };

    const update = async () => {
      requestAnimationFrame(update);

      // Clear the canvas
      circle.clearRect(0, 0, canvas.width, canvas.height);

      finishCtx.fillStyle = "blue";
      finishCtx.fillRect(finish.x, finish.y, finish.size, finish.size);

      // Draw the character
      circle.beginPath();
      circle.arc(character.x, character.y, character.radius, 0, 2 * Math.PI);
      circle.fillStyle = "yellow";
      circle.strokeStyle = "red";
      circle.stroke();
      circle.fill();

      //character is at border and command is not stop
      if (character.y === borders.bottom && currentVoiceCommand === "down") {
        characterIsMoving = false;
      } else if (
        (character.x === borders.left && currentVoiceCommand === "left") ||
        (character.x === borders.left &&
          (character.y === borders.bottom || character.y === borders.top))
      ) {
        characterIsMoving = false;
      } else if (character.y === borders.top && currentVoiceCommand === "top") {
        characterIsMoving = false;
      } else if (
        (character.x === borders.right && currentVoiceCommand === "right") ||
        (character.x === borders.right &&
          (character.y === borders.bottom || character.y === borders.top))
      ) {
        characterIsMoving = false;
      } else if (currentVoiceCommand !== "stop" && currentVoiceCommand !== "") {
        characterIsMoving = true;
      }

      //handle continous end
      if (isCollision() && isContinuous && !characterIsMoving && !isOver) {
        if (nextBtn) nextBtn.disabled = false;
        clearAllIntervals();

        message.style.visibility = "visible";
        isOver = true;
        isMovementByStepCalled = true;
        await document.querySelector("#stop").click();
        if (url.includes("level"))
          document.querySelector("#start").style.visibility = "hidden";
        timer = 0;
        characterIsMoving = false;
      }

      //handle step end
      if (isCollision() && !isOver && !isContinuous) {
        if (nextBtn) nextBtn.disabled = false;
        clearAllIntervals();

        message.style.visibility = "visible";
        isOver = true;
        isMovementByStepCalled = true;
        await document.querySelector("#stop").click();
        if (url.includes("level"))
          document.querySelector("#start").style.visibility = "hidden";
        timer = 0;
      }
    };

    update();
  })
  .catch((error) => console.log(error));

export const clearAllIntervals = () => {
  var killId = setTimeout(() => {
    for (let i = killId; i > 0; i--) clearInterval(i);
  }, 5);
};

export const setCharacterAtStart = () => {
  character.x = 20;
  character.y = 577;
};

export const setIsOver = () => {
  isOver = false;
};

export const setIsMovementByStepCalled = () => {
  if (url.includes("level") && !isContinuous) {
    clearAllIntervals();
    isMovementByStepCalled = true;
  }
};

const movementByStepTimer = (isMovementByStepCalled) => {
  if (
    url.includes("level") &&
    !isContinuous &&
    isMovementByStepCalled &&
    !isOver
  ) {
    setInterval(() => {
      timer = Math.round((timer + 0.1) * 100) / 100;

      timerDiv.innerHTML = timer + " s";
    }, 100);
  }
};

export const characterMovementByStep = (voiceCommand) => {
  character.speed = 20;
  movementByStepTimer(isMovementByStepCalled);

  if (voiceCommand !== "") currentVoiceCommand = voiceCommand;

  isMovementByStepCalled = false;

  if (voiceCommand === "up") {
    character.y = Math.max(character.y - character.speed, borders.top);
  } else if (voiceCommand === "down") {
    character.y = Math.min(character.y + character.speed, borders.bottom);
  } else if (voiceCommand === "left") {
    character.x = Math.max(character.x - character.speed, borders.left);
  } else if (voiceCommand === "right") {
    character.x = Math.min(character.x + character.speed, borders.right);
  }
};

const incrementTimerForContinous = () => {
  timer =
    Math.round((timer + CHAR_MOVE_MS / 1000) * CHAR_MOVE_MS) / CHAR_MOVE_MS;
  if (timerDiv) timerDiv.innerHTML = timer + " s";
};

export const resetTimer = () => {
  timer = 0;
};

export const handleCountinousChange = (isContinuousChecked) => {
  isContinuous = isContinuousChecked;
};

export const characterMovementcontinuous = (voiceCommand) => {
  character.speed = 10;

  if (voiceCommand !== "") currentVoiceCommand = voiceCommand;

  if (voiceCommand === "up") {
    currentVoiceCommand = voiceCommand;

    clearAllIntervals();
    setInterval(() => {
      character.y = Math.max(character.y - character.speed, borders.top);

      incrementTimerForContinous();
    }, [CHAR_MOVE_MS]);
  } else if (voiceCommand === "down") {
    clearAllIntervals();

    setInterval(() => {
      character.y = Math.min(character.y + character.speed, borders.bottom);

      incrementTimerForContinous();
    }, [CHAR_MOVE_MS]);
  } else if (voiceCommand === "left") {
    clearAllIntervals();

    setInterval(() => {
      character.x = Math.max(character.x - character.speed, borders.left);

      incrementTimerForContinous();
    }, [CHAR_MOVE_MS]);
  } else if (voiceCommand === "right") {
    clearAllIntervals();

    setInterval(() => {
      character.x = Math.min(character.x + character.speed, borders.right);

      incrementTimerForContinous();
    }, [CHAR_MOVE_MS]);
  } else if (voiceCommand === "stop") {
    characterIsMoving = false;

    clearAllIntervals();

    setInterval(() => {
      incrementTimerForContinous();
    }, [CHAR_MOVE_MS]);
  }
};
