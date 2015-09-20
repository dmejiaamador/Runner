Runner.preload = function() {
    this.ready=false

};

Runner.preload.prototype = {
    preload: function() {
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");
        this.splash.anchor.setTo(0.5);
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY+ 128, "preloadBar");
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);
        
        // here you load all the game images and what not
        

        this.load.image('ground', 'assests/images/ground.png');
        this.load.image('background', 'assests/images/background.png');
        this.load.image('foreground', 'assests/images/foreground.png');
        
        //sprite hseets are dofferent
        //(monicer, path,width og each image, heigh of image, how many in sprite sheet
        this.load.spritesheet('coins', 'assests/images/coins-ps.png', 51 , 51, 7);
        this.load.spritesheet('player', 'assests/images/jetpack-ps.png', 229, 296, 4);
        this.load.spritesheet('missile','assests/images/missiles-ps.png', 361, 218, 4);
        
        // now lets load music
        // (monicer,[array of music so that web browser will decide which to play)
        
        this.load.audio('gameMusic', ['assests/audio/pamgaea.mp3', 'assests/audio/Pamgaea.ogg']);
        this.load.audio('rocket', 'assests/audio/rocket.wav');
        this.load.audio('bounce', 'assests/audio/bounce.wav');
        this.load.audio('coin', 'assests/audio/coin.wav');
        this.load.audio('death', 'assests/audio/death.wav');
        
        // loading bitmap fonts
        
        this.load.bitmapFont('minecraftia', 'assests/fonts/minecraftia/minecraftia.png','assests/fonts/minecraftia/minecraftia.xml');
        //event fire once it has loaded everythign
        //in phaser call  callback... nededsuper importnt yas 
        this.load.onLoadComplete.add(this.onLoadComplete, this);
        
    },
    create: function() {
        this.preloadBar.cropEnabled = false;   
    },
    
    update: function() {
        if(this.cache.isSoundDecoded('gameMusic') && this.ready ===true){
            this.state.start('mainMenu');
        }
    },
    onLoadComplete: function(){
        this.ready = true;
    }
};