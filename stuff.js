var gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(update, 20);
    window.addEventListener('keydown', function (e) {
      gameArea.keys = (gameArea.keys || []);
      gameArea.keys[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {
      gameArea.keys[e.keyCode] = false; 
    })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

var player = {
  acceleration : 2
  maxSpeed : 10
  x : 0
  y : 0
  z : 0
  xVel : 0
  yVel : 0
  zVel : 0
  gravityAcceleration : 0
  playerSprite : sprite(10, 10, "BLUE", 0, 0)
  update : function() {
    
    // WASD
    if (gameArea.keys && gameArea.keys[87]) {this.xVel += 2 * acceleration}
    if (gameArea.keys && gameArea.keys[65]) {this.zVel += 2 * acceleration}
    if (gameArea.keys && gameArea.keys[83]) {this.xVel -= 2 * acceleration}
    if (gameArea.keys && gameArea.keys[68]) {this.zVel -= 2 * acceleration}
    
    if (this.xVel < 0) {this.xVel += acceleration}
    if (this.zVel < 0) {this.zVel += acceleration}
    if (this.xVel > 0) {this.xVel -= acceleration}
    if (this.zVel > 0) {this.zVel -= acceleration}
        
    this.x += this.xVel
    this.y += this.yVel
    this.z += this.zVel
    
    this.playerSprite.x = this.x //TODO create a sprite function for this, allow it to render in different modes
    this.playerSprite.y = this.y
  }
}

function sprite(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y; 
  this.update = function(){
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function start() { // Initialize game.
  gameArea.start()
}
function update() { // Main loop runs every 20 ms.
  gameArea.clear();
  player.update();
}