var StateMain = {

    preload: function () {
      var mapPath = `assets/maps/map${level}.json`;

      // Load robot spritesheet
      game.load.spritesheet('robot', 'assets/images/main/robot.png', 80, 111, 28);
      // Load tiles and tilemap
      game.load.image('tiles', 'assets/images/tiles.png');
      game.load.tilemap('map', mapPath, null, Phaser.Tilemap.TILED_JSON);
    },

    create: function () {
      // Array of bombs per level
      this.bombCount = [4, 10];
      this.need = this.bombCount [level - 1];
      this.collected = 0;

      // Start physics
      game.physics.startSystem(Phaser.Physics.ARCADE);

      // Set robot size
      this.robotSize = 0.5;

      // Load map
      this.map = game.add.tilemap('map');
      this.map.addTilesetImage('tiles');
      // Create layer
      this.layer = this.map.createLayer('Tile Layer 1');
      this.layer.resizeWorld();
      this.map.setCollisionBetween(0, 24);

      // Create robot
      this.robot = game.add.sprite(150, 150, 'robot');
      // Create Animations
      this.robot.animations.add('idle', [0,1,2,3,4,5,6,7,8,9], 12, true);
      this.robot.animations.add('walk', [10,11,12,13,14,15,16,17], 12, true);
      this.robot.animations.add('jump', [18,19, 20,21,22,23,24,25], 12, false);
      // Settings
      // Robot scale
      this.robot.scale.x = this.robotSize;
      this.robot.scale.y = this.robotSize;
      // Starting animation
      this.robot.animations.play('idle');
      // Robot anchor
      this.robot.anchor.set(0.5, 0.5);
      // Robot physics
      game.physics.arcade.enable(this.robot);
      // Robot gravity
      this.robot.body.gravity.y = 100;
      // Bounce factor
      this.robot.body.bounce.set(0.25);
      this.robot.body.collideWorldBounds = true;
      game.camera.follow(this.robot);

      // Controls
      cursors = game.input.keyboard.createCursorKeys();

      // Pick up bomb
      this.map.setTileIndexCallback(25, this.gotBomb, this);
    },

    gotBomb: function (sprite, tile) {
      this.map.removeTile(tile.x, tile.y, this.layer);
      this.collected++;
      if (this.collected == this.need) {
        level++;
        game.state.start('StateMain');
      }
    },

    update: function () {
      // Make robot collide with map
      game.physics.arcade.collide(this.robot, this.layer);

      // Make sure robot on floor
      if (this.robot.body.onFloor()) {
        // Play walking or idle animation
        if (Math.abs(this.robot.body.velocity.x) > 100) {
          this.robot.animations.play('walk');
        } else {
          this.robot.animations.play('idle');
        }
      }
      // Check which way robot should face
      if (this.robot.body.velocity.x > 0) {
        this.robot.scale.x = this.robotSize;
      } else {
        this.robot.scale.x = -this.robotSize;
      }

      // Move left
      if (cursors.left.isDown) {
        this.robot.body.velocity.x = -250;
      }
      // Move right
      if (cursors.right.isDown) {
        this.robot.body.velocity.x = 250;
      }
      // jump
      if (cursors.up.isDown) {
        if (this.robot.body.onFloor()) {
          this.robot.body.velocity.y = -Math.abs(this.robot.body.velocity.x) - 100;
          this.robot.animations.play('jump');
        }
      }

      if (cursors.down.isDown) {
        this.robot.body.velocity.x = 0;
        this.robot.body.velocity.y = 0;
      }
    }

}
