var StateMain = {

    preload: function () {
      game.load.spritesheet('robot', 'assets/images/main/robot.png', 80, 111, 28);
    },

    create: function () {
      game.physics.startSystem(Phaser.Physics.ARCADE);

      this.robot = game.add.sprite(150, 150, 'robot');
      this.robot.animations.add('idle', [0,1,2,3,4,5,6,7,8,9], 12, true);
      this.robot.animations.add('walk', [10,11,12,13,14,15,16,17], 12, true);
      this.robot.animations.add('jump', [18,19, 20,21,22,23,24,25], 12, false);

      this.robot.animations.play('idle');
      this.robot.anchor.set(0.5, 0.5);
      game.physics.arcade.enable(this.robot);
      this.robot.body.gravity.y = 100;
      this.robot.body.bounce.set(0.25);
      this.robot.body.collideWorldBounds = true;
      
    },

    update: function () {

    }

}
