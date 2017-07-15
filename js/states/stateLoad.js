var StateLoad = {

  preload: function () {
    // Add loading bar images
    var empty = game.add.image(0, 0, 'loadingEmpty');
    var full = game.add.image(0, 0, 'loadingFull');
    // Display loading bar
    center(empty);
    full.anchor.set(0, 0.5);
    full.x = game.world.centerX - empty.width / 2;
    full.y = empty.y;

    game.load.setPreloadSprite(full);
    // Load images and sounds
    game.load.spritesheet('buttons', 'assets/images/ui/buttons-red.png', 265, 75);
    game.load.spritesheet('soundButtons', 'assets/images/ui/soundButtons-blue.png', 44, 44 , 4);
    game.load.audio('backgroundMusic', 'assets/sounds/background/background.mp3');
    game.load.audio('boom', 'assets/sounds/sfx/boom.mp3');
    game.load.audio('collect', 'assets/sounds/sfx/collect.mp3');
    game.load.audio('jump', 'assets/sounds/sfx/jump.mp3');
    game.load.audio('tick', 'assets/sounds/sfx/tick.mp3');

    game.load.spritesheet('robot', 'assets/images/main/robot.png', 80, 111, 28);
    game.load.image('tiles', 'assets/images/tiles.png');

    game.load.spritesheet('arrow', 'assets/images/arrowButtons.png', 60, 60, 4);
    game.load.spritesheet('monster', 'assets/images/main/monsters.png', 50, 50, 2);

    game.load.image('bar1', 'assets/images/timer/bar1.png');
    game.load.image('bar2', 'assets/images/timer/bar2.png');
  },

  create: function () {
    // Proceed to title screen
    game.state.start('StateTitle');
  },

  update: function () {

  }

}
