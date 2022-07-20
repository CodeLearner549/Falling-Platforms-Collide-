// Falling Platforms

// Main Draw Loop
window.addEventListener("load", draw);

//Array of random platforms
let platforms = [];
for (let i = 1; i <= 10; i++) {
  platforms.push(newRandomPlatform());
}

function newRandomPlatform() {
  return {
    x: randomInt(0, cnv.width),
    y: 0, //top
    r: randomInt(1, 10), //size
    v: 2 * Math.random(),
    color: "rgb(128, 128, 128)",
    w: randomInt(50, 200),
    h: 15,
  };
}

requestAnimationFrame(draw);

function draw() {
  //Fill Canvas
  background("LightBlue");

  for (let i = 0; i < platforms.length; i++) {
    movePlatform(platforms[i]);
    drawPlatform(platforms[i]);
  }

  //Player
  drawPlayer();
  movePlayer();
  playerCollide();

  requestAnimationFrame(draw);
}

function drawPlatform(aPlatform) {
  fill(aPlatform.color);
  rect(aPlatform.x, aPlatform.y, aPlatform.w, aPlatform.h, "fill");
}

function movePlatform(aPlatform) {
  //function given single iteration
  aPlatform.y += aPlatform.v; //speed and direction
  if (aPlatform.y > cnv.height) {
    aPlatform.y = -2;
  }
}

//Remove a random platform every three seconds
setInterval(removePlatform, 3000);

function removePlatform() {
  platforms.splice(randomInt(1, platforms.length), 1);
}

//Helper function
function rect(x, y, w, h, mode) {
  if (mode === "fill") {
    ctx.fillRect(x, y, w, h);
  } else if (mode === "stroke") {
    ctx.strokeRect(x, y, w, h);
  }
}

function fill(color) {
  ctx.fillStyle = color;
}

function background(color) {
  fill(color);
  rect(0, 0, cnv.width, cnv.height, "fill");
}

//Assignment
let player = {
  x: 250,
  y: 500,
  w: 25,
  h: 25,
  speed: 2,
};

function drawPlayer() {
  fill("yellow");
  rect(player.x, player.y, player.w, player.h, "fill");
}

function movePlayer() {
  if (keyPressed["KeyW"] && player.y >= 0) {
    player.y += -player.speed;
  } else if (keyPressed["KeyS"]) {
    player.y += player.speed;
  }

  if (keyPressed["KeyA"] && player.x >= 0) {
    player.x += -player.speed;
  } else if (keyPressed["KeyD"] && player.x <= cnv.width - player.w) {
    player.x += player.speed;
  }
}

function playerCollide() {
  for (let i = 0; i < platforms.length; i++) {
    if (rectCollide(player, platforms[i])) {
      player.y = platforms[i].y + 15;
    }
  }
}
