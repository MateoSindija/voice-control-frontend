const CHAR_MOVE_MS = 200;

let levelData;
let jsonUrl = "";

let canvas = document.getElementById("game");
canvas.width = 1500;
canvas.height = 600;

const circle = canvas.getContext("2d");
const finishCtx = canvas.getContext("2d");

const url = window.location.href;

if (!url.includes("level")) {
  jsonUrl = "../json/practice.json";
} else if (url.includes("level1")) {
  jsonUrl = "../json/level1.json";
} else if (url.includes("level2")) {
  jsonUrl = "../json/level2.json";
}

const character = {
  x: 23,
  y: 577,
  radius: 20,
  speed: 25,
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
      iscontinuous = false;
    } else if (levelData.type === "continuous") {
      iscontinuous = true;
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

        //alert may run faster than javascript so put it in settimeout to ensure order of execution
        setTimeout(() => {
          alert("You won");
          document.querySelector("#stop").click();
        }, 10);
      }
    };

    update();
  })
  .catch(() => console.log("no such file"));

const clearAllIntervals = () => {
  var killId = setTimeout(() => {
    for (let i = killId; i > 0; i--) clearInterval(i);
  }, 5);
};

const characterMovementByStep = (voiceCommand) => {
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

const characterMovementcontinuous = (voiceCommand) => {
  if (voiceCommand === "up") {
    clearAllIntervals();
    setInterval(() => {
      character.y = Math.max(character.y - character.speed, borders.top);
    }, [CHAR_MOVE_MS]);
  } else if (voiceCommand === "down") {
    clearAllIntervals();
    setInterval(() => {
      character.y = Math.min(character.y + character.speed, borders.bottom);
    }, [CHAR_MOVE_MS]);
  } else if (voiceCommand === "left") {
    clearAllIntervals();
    setInterval(() => {
      character.x = Math.max(character.x - character.speed, borders.left);
    }, [CHAR_MOVE_MS]);
  } else if (voiceCommand === "right") {
    clearAllIntervals();
    setInterval(() => {
      character.x = Math.min(character.x + character.speed, borders.right);
    }, [CHAR_MOVE_MS]);
  } else if (voiceCommand === "stop") {
    clearAllIntervals();
  }
};
