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

canvas.width = 1500;
canvas.height = 600;

const circle = canvas.getContext("2d");
const finishCtx = canvas.getContext("2d");

if (!url.includes("level")) {
  jsonUrl = "./src/json/practice.json";
} else if (url.includes("level1.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level1.json";
} else if (url.includes("level2.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level2.json";
} else if (url.includes("level3.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level3.json";
} else if (url.includes("level4.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level4.json";
} else if (url.includes("level5.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level5.json";
} else if (url.includes("level6.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level6.json";
} else if (url.includes("level7.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level7.json";
} else if (url.includes("level8.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level8.json";
} else if (url.includes("level9.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level9.json";
} else if (url.includes("level10.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level10.json";
} else if (url.includes("level11.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level11.json";
} else if (url.includes("level12.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level12.json";
} else if (url.includes("level13.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level13.json";
} else if (url.includes("level14.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level14.json";
} else if (url.includes("level15.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level15.json";
} else if (url.includes("level16.")) {
  jsonUrl = "http://127.0.0.1:5500/src/json/level16.json";
}

export const character = {
  x: 23,
  y: 577,
  radius: 20,
  speed: 55,
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
    console.log(levelData);
    if (levelData.type === "step") {
      isContinuous = false;
    } else if (levelData.type === "continuous") {
      isContinuous = true;
    }

    const finish = {
      x: levelData.x,
      y: levelData.y,
      size: 100,
    };

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

    const update = () => {
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

      if (isCollision()) {
        if (nextBtn) nextBtn.disabled = false;
        clearAllIntervals();

        message.style.visibility = "visible";
        isOver = true;
        isMovementByStepCalled = true;
        document.querySelector("#stop").click();
        timer = 0;
      }
    };

    update();
  })
  .catch((error) => console.log(error));

export const clearAllIntervals = () => {
  var killId = setTimeout(() => {
    for (let i = killId; i > 0; i--) clearInterval(i);
  }, 6);
};

export const setIsOver = () => {
  isOver = false;
};

export const setIsMovementByStepCalled = () => {
  if (url.includes("level") && !isContinuous) {
    clearAllIntervals();
    isMovementByStepCalled = true;
    timer = 0;

    timerDiv.innerHTML = "";
  }
};

const movementByStepTimer = (isMovementByStepCalled) => {
  if (url.includes("level") && !isContinuous && isMovementByStepCalled) {
    setInterval(() => {
      timer = Math.round((timer + 0.1) * 100) / 100;

      timerDiv.innerHTML = timer + " s";
    }, 100);
  }
};

export const characterMovementByStep = (voiceCommand) => {
  character.speed = 55;

  movementByStepTimer(isMovementByStepCalled);

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

export const handleCountinousChange = (isContinuousChecked) => {
  isContinuous = isContinuousChecked;
};

export const characterMovementcontinuous = (voiceCommand) => {
  character.speed = 10;

  if (voiceCommand === "up") {
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
    clearAllIntervals();
  }
};
