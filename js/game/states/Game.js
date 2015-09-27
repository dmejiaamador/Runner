Runner.Game = function () {
    this.playerMinAngle = -20;
    this.playerMaxAngle = 20;

    this.coinRate = 1000;
    this.coinTimer = 0;

    this.enemyRate= 500;
    this.enemyTimer=0;

    this.score =0;

    //this.stText= this.game.add.bitmapText(10,10,'minecraftia','Score: ',20);

}

Runner.Game.prototype = {

    create: function () {

        // tile sprite lets you tile the image as manytimes as you like... I think it make the image repeat paramerters are(width, height,width              repeat, height repeate, asset hey)
        this.background = this.game.add.tileSprite(0, 0, this.game.width, 254, 'background');
        this.background.autoScroll(-100, 0);
        this.background.scale.setTo(2.5);

        this.foreground = this.game.add.tileSprite(0, 470, this.game.width, this.game.height - 533, 'foreground');
        this.foreground.autoScroll(-100, 0);
        this.foreground.scale.setTo(2);

        this.ground = this.game.add.tileSprite(0, this.game.height - 73, this.game.width, 73, 'ground');
        this.ground.autoScroll(-400, 0);

        this.player = this.game.add.sprite(200, this.game.height / 2, 'player');
        this.player.anchor.setTo(.5);
        this.player.scale.setTo(2);

        // to animate sprite
        //animations.add with parameters (key, and array of pictures to run through. defined in preload.js when spritesheet was first loaded
        this.player.animations.add('fly', [0, 1, 2, 3, 2, 1]);
        // animations.play with parameters (key, frames per second and , whether you want the animation to loop
        this.player.animations.play('fly', 8, true);

        // physics engine

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //adding gravity
        this.game.physics.arcade.gravity.y = 400;
        //adding gravity to objects on page;
        //this next line make the ground be affected by the gravity set up in the game engine. this line by itself will make the                           ground fall at a rate of 400 px in the y dierection
        this.game.physics.arcade.enableBody(this.ground);

        //these next lines of code will be be to make sure the ground does not fall but is still considered a collidable object

        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        //adding gravity to player so that it will be affected by it
        this.physics.arcade.enableBody(this.player);
        //this line will make it so that the player doesnt fall through the window of the game. this is good but this alone  isnt           going           to stop it from going throught the ground sprite.
        this.player.body.collideWorldBounds = true;
        //this will make him bounce of the stage when he falls
        this.player.body.bounce.set(.5);


        // to add Coins add a group so that you can add coin on whim

        this.coins = this.game.add.group();


        //enemy group
        this.enemies = this.game.add.group();
        this.scoreText = this.game.add.bitmapText(10,10,'minecraftia','Score: 0', 32);

    },

    update: function () {

        // to make player move and record user imput
        if (this.game.input.activePointer.isDown) {
            this.player.body.velocity.y -= 25;
        }

        //this rotates the player when making his move look more natural. he lean forward  and backward when moving
        if ((this.player.body.velocity.y < 0) || (this.game.input.activePointer.isDown)) {

            if (this.player.angle > 0) {
                this.player.angel = 0;
            }
            if (this.player.angle > this.playerMinAngle) {
                this.player.angle -= 0.5;
            }
        } else if ((this.player.body.velocity.y >= 0) && (!this.game.input.activePointer.isDown)) {

            if (this.player.angle < this.playerMaxAngle) {
                console.log('this is happening');
                this.player.angle += 0.5;
            }
        }
        if (this.coinTimer < this.game.time.now) {
            this.createCoin();
            this.coinTimer = this.game.time.now + this.coinRate;
        }

         if (this.enemyTimer < this.game.time.now) {
            this.createEnemy();
            this.enemyTimer = this.game.time.now + this.enemyRate;
        }

        // this the function that checks for the collision;
        this.game.physics.arcade.collide(this.player, this.ground,this.groundHit,null,this);
        this.game.physics.arcade.overlap(this.player,this.coins,this.coinHit,null,this);
        this.game.physics.arcade.overlap(this.player,this.enemies,this.enemyHit,null,this);
    },

    groundHit: function(player, ground) {
        player.body.velocity.y = -200;
    },

    //missing ground hit function... look at player movement end of vidoe
    shutdown: function () {
      // review video for it. destroy apperently gets rid of all the empty coins and enemies groups and allows garbage colletion to pick it up
      this.coins.destroy();
      this.enemies.destroy();
      this.score = 0;
      this.coinTimer = 0;
      this. enemyTimer = 0;

    },

    createCoin: function () {
        console.log('coin is collected');
        var x = this.game.width;
        var y = this.game.rnd.integerInRange(50, this.game.world.height - 192);
        var coin = this.coins.getFirstExists(false);
        if (!coin) {
            coin = new Coin(this.game, 0, 0);
            this.coins.add(coin);
        }
        coin.reset(x, y);
        coin.revive();

    },


     createEnemy: function () {
        var x = this.game.width;
        var y = this.game.rnd.integerInRange(50, this.game.world.height - 192);
        var enemy = this.enemies.getFirstExists(false);
        if (!enemy) {
            enemy = new Enemy(this.game, 0, 0);
            this.enemies.add(enemy);
        }
        enemy.reset(x, y);
        enemy.revive();
     },

    coinHit: function (player,coin){
        this.score++;
        this.scoreText.text = 'Score: ' + this.score;
        coin.kill();

    },

    enemyHit: function (player,enemy){
      player.kill();
      enemy.kill();
      this.ground.stopScroll();
      this.foreground.stopScroll();
      this.background.stopScroll();

      this.enemies.setAll('body.velocity.x',0);
      this.coins.setAll('body.velocity.x',0);

      this.enemyTimer=Number.MAX_VALUE;
      this.coinTimer=Number.MAX_VALUE;
      var scoreboard = new Scoreboard(this.game);
      scoreboard.show(this.score);

    }


};
