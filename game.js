var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
          myGameArea.keys = (myGameArea.keys || []);
          myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
          myGameArea.keys[e.keyCode] = false; 
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var player = {
  acceleration : 2,
  maxSpeed : 10,
  x : 60,
  y : 0,
  z : 60,
  xVel : 0,
  yVel : 0,
  zVel : 0,
  gravityAcceleration : 0,
  playerSprite : new sprite(30, 30, "red", 0, 0),
  update : function() {
   
    if (myGameArea.keys && myGameArea.keys[87]) {this.xVel += 2 * acceleration};
    if (myGameArea.keys && myGameArea.keys[65]) {this.zVel += 2 * acceleration};
    if (myGameArea.keys && myGameArea.keys[83]) {this.xVel -= 2 * acceleration};
    if (myGameArea.keys && myGameArea.keys[68]) {this.zVel -= 2 * acceleration};
      
    if (xVel < 0) {xVel += 1}; 
    if (xVel > 0) {xVel -= 1}; 
    if (zVel < 0) {zVel += 1}; 
    if (zVel > 0) {zVel -= 1};   
      
    this.x += this.xVel;
    this.y += this.yVel;
    this.z += this.zVel;
  
    this.playerSprite.x = this.x; 
    this.playerSprite.y = this.z;
    this.playerSprite.update()
  }
}

function sprite(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y; 
  this.update = function(){
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    player.update();
}

function startGame() {
    myGameArea.start();
}
