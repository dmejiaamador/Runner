var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.state.add('Boot', Runner.Boot);
game.state.add('preload', Runner.preload);
game.state.add('mainMenu',Runner.mainMenu);



game.state.start('Boot');
//game.state.start('preload');
