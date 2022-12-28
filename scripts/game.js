let canvas = document.getElementById("game");
canvas.width = 1500;
canvas.height = 600;

const ctx = canvas.getContext("2d");
const finishCtx = canvas.getContext("2d");

const finish = {
    x: 500,
    y: 100,
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

const update = () => {
    requestAnimationFrame(update);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    finishCtx.clearRect(0, 0, canvas.width, canvas.height);

    finishCtx.fillStyle = "blue";
    finishCtx.fillRect(finish.x, finish.y, finish.size, finish.size);

    // Draw the character
    ctx.beginPath();
    ctx.arc(character.x, character.y, 20, 0, 2 * Math.PI);
    ctx.stroke();
};

const characterMovement = (voiceCommand) => {
    if (voiceCommand.includes("up")) {
        character.y = Math.max(character.y - character.speed, borders.top + 20);
    } else if (voiceCommand.includes("down")) {
        character.y = Math.min(
            character.y + character.speed,
            borders.bottom - 10
        );
    } else if (voiceCommand.includes("left")) {
        character.x = Math.max(
            character.x - character.speed,
            borders.left + 20
        );
    } else if (voiceCommand.includes("right")) {
        character.x = Math.min(
            character.x + character.speed,
            borders.right - 10
        );
    }
};

update();
