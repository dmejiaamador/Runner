Runner.mainMenu = function() {};

Runner.mainMenu.prototype = {
    
    create: function() {
        // tile sprite lets you tile the image as manytimes as you like... I think it make the image repeat paramerters are(width,                  height,width repeate, height repeate, asset hey)
        this.background= this.game.add.tileSprite(0,0,this.game.width,512,'background');
        this.background.autoScroll(-100,0);
        
        this.foreground= this.game.add.tileSprite(0,470,this.game.width,this.game.height-533,'foreground');
        this.foreground.autoScroll(-100,0);
        
        this.ground = this.game.add.tileSprite(0,this.game.height-73,this.game.width,73,'ground');
        this.ground.autoScroll(-400,0);
        
        this.player= this.game.add.sprite(200,this.game.height/2,'player');
        this.player.anchor.setTo(.5);
        this.player.scale.setTo(0.3);
        
        // to animate sprite
        //animations.add with parameters (key, and array of pictures to run through. defined in preload.js when spritesheet was first loaded
        this. player.animations.add('fly',[0,1,2,3,2,1]);
        // animations.play with parameters (key, frames per second and , whether you want the animation to loop
        this.player.animations.play('fly',8,true);
        
        //tween animation... look at documentation
        //add a between animation to the object player
        //that will alter its y position to its curent y position-16, and it will do that every 500 milisecond
        //the phaser.easing thing is to add smooth ness
        // true is for the auto start... wheter it should begin immeadietly or not 
        //0 for the delay ,infinity for the number of time this tween animation will occur and true for yoyo effect
        this.game.add.tween(this.player).to({y: this.player.y-16},500,Phaser.Easing.Linear.NONE, true, 0, Infinity,true);
    
        // adding the logo image to main menu
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");
        this.splash.anchor.setTo(0.5);
        //adding text to it 
        this.startText = this.game.add.bitmapText(0,0,'minecraftia','tap to start', 32);
        this.startText.x=this.game.width/2-this.startText.textWidth/2;
        this.startText.y=this.game.height/2+this.splash.height;
    },
    
    
    update: function() {
        if(this.game.input.activePointer.justPressed()){
            this.game.state.start("Game");
        }
    }
};
    
        