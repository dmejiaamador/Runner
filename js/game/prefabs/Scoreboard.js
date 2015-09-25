var Scoreboard = function(game) {
  Phaser.Group.call(this, game);
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function(score) {
  var bmd, background, gameoverText, scoreText, highScoreText, newHighScoreText, starText;
  //bitmapData are extended canvas's that can be drawn on.
  bmd = this.game.add.bitmapData(this.game.width, this.game.height);
  bmd.ctx.fillStyle = '#000';
  //draws a rectangle
  bmd.ctx.fillRect(0,0, this.game.width, this.game.height);

  background = this.game.add.sprite(0,0, bmd);
  // opacity
  background.alpha = 0.5;

  this.add(background);

  var isNewHighScore = false;

  var highscore = localStorage.getItem('highscore');
  if(!highscore || highscore < score) {
    isNewHighScore = true;
    highscore = score;
    localStorage.setItem('highscore', highscore);
  }
  // set the y property of score board  to bottom of screen so that we can animate it
  this.y = this.game.height;
  // set the game text that will appear

  gameoverText = this.game.add.bitmapText(0,100, 'minecraftia', 'You Died.', 36);
  //set its location
  gameoverText.x = this.game.width/2 - (gameoverText.textWidth / 2);
  // add it to the Scoreboard.
  this.add(gameoverText);

  // same thing as above but different text and location
  scoreText = this.game.add.bitmapText(0, 200, 'minecraftia', 'Your Score: ' + score, 24);
  scoreText.x = this.game.width / 2 - (scoreText.textWidth / 2);
  this.add(scoreText);

  highScoreText = this.game.add.bitmapText(0, 250, 'minecraftia', 'Your High Score: ' + highscore, 24);
  highScoreText.x = this.game.width / 2 - (highScoreText.textWidth / 2);
  this.add(highScoreText);

  startText = this.game.add.bitmapText(0, 300, 'minecraftia', 'Tap to play again!', 16);
  startText.x = this.game.width / 2 - (startText.textWidth / 2);
  this.add(startText);

  if(isNewHighScore) {
    newHighScoreText = this.game.add.bitmapText(0, 100, 'minecraftia', 'New High Score!', 12);
    newHighScoreText.tint = 0x4ebef7; // '#4ebef7'
    newHighScoreText.x = gameoverText.x + gameoverText.textWidth + 40;
    newHighScoreText.angle = 45;
    this.add(newHighScoreText);
  }

  // adding a tween so that it pops up from the bottom.
  this.game.add.tween(this).to({y: 0}, 2000, Phaser.Easing.Bounce.Out, true);
  // when you click down then add a call to the restat so that you can onlyu press it once to restart game
  this.game.input.onDown.addOnce(this.restart, this);

};

Scoreboard.prototype.restart = function() {
  this.game.state.start('Game', true, false);
};
