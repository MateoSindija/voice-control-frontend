const CHAR_MOVE_MS = 500;
const MOVE_T_L = 20;
const MOVE_B_R = 10;

let canvas = document.getElementById("game");
canvas.width = 1500;
canvas.height = 600;

const circle = canvas.getContext("2d");
const finishCtx = canvas.getContext("2d");

const finish = {
  x: 100,
  y: 400,
  size: 100,
};

const character = {
  x: 23,
  y: 577,
  size: 10,
  speed: 15,
};

const borders = {
  left: 0,
  right: canvas.width - character.size,
  top: 0,
  bottom: canvas.height - character.size,
};

const isOnLeft = () => {
  let distX = Math.abs(character.x - finish.x - finish.size / 2);
  let distY = Math.abs(character.y - finish.y - finish.size / 2);

  if (distX > finish.size / 2 + character.size / 2) {
    return false;
  }
  if (distY > finish.size / 2 + character.size / 2) {
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
  return dx * dx + dy * dy <= (character.size / 2) * (character.size / 2);
};

const update = () => {
  requestAnimationFrame(update);

  // Clear the canvas
  circle.clearRect(0, 0, canvas.width, canvas.height);
  finishCtx.clearRect(0, 0, canvas.width, canvas.height);

  finishCtx.fillStyle = "blue";
  finishCtx.fillRect(finish.x, finish.y, finish.size, finish.size);

  // Draw the character
  circle.beginPath();
  circle.arc(character.x, character.y, 20, 0, 2 * Math.PI);
  circle.fillStyle = "yellow";
  circle.strokeStyle = "red";
  circle.stroke();
  circle.fill();

  if (isOnLeft()) {
    document.querySelector("#stop").click();
    clearAllIntervals();
    alert("You won");
    return;
  }
};

const clearAllIntervals = () => {
  var killId = setTimeout(() => {
    for (var i = killId; i > 0; i--) clearInterval(i);
  }, 5);
};

const characterMovementByStep = (voiceCommand) => {
  if (voiceCommand.includes("up")) {
    character.y = Math.max(
      character.y - character.speed,
      borders.top + MOVE_T_L
    );
  } else if (voiceCommand.includes("down")) {
    character.y = Math.min(
      character.y + character.speed,
      borders.bottom - MOVE_B_R
    );
  } else if (voiceCommand.includes("left")) {
    character.x = Math.max(
      character.x - character.speed,
      borders.left + MOVE_T_L
    );
  } else if (voiceCommand.includes("right")) {
    character.x = Math.min(
      character.x + character.speed,
      borders.right - MOVE_B_R
    );
  }
};

const characterMovementContinous = (voiceCommand) => {
  if (voiceCommand.includes("up")) {
    clearAllIntervals();
    setInterval(() => {
      character.y = Math.max(
        character.y - character.speed,
        borders.top + MOVE_T_L
      );
    }, [CHAR_MOVE_MS]);
  } else if (voiceCommand.includes("down")) {
    clearAllIntervals();
    setInterval(() => {
      character.y = Math.min(
        character.y + character.speed,
        borders.bottom - MOVE_B_R
      );
    }, [CHAR_MOVE_MS]);
  } else if (voiceCommand.includes("left")) {
    clearAllIntervals();
    setInterval(() => {
      character.x = Math.max(
        character.x - character.speed,
        borders.left + MOVE_T_L
      );
    }, [CHAR_MOVE_MS]);
  } else if (voiceCommand.includes("right")) {
    clearAllIntervals();
    setInterval(() => {
      character.x = Math.min(
        character.x + character.speed,
        borders.right - MOVE_B_R
      );
    }, [CHAR_MOVE_MS]);
  } else if (voiceCommand.includes("stop")) {
    clearAllIntervals();
  }
};

update();
