var StateMain = {

    preload: function () {
      var mapPath = `assets/maps/map${level}.json`;

      // Load robot spritesheet
      game.load.spritesheet('robot', 'assets/images/main/robot.png', 80, 111, 28);
      // Load tiles and tilemap
      game.load.image('tiles', 'assets/images/tiles.png');
      game.load.tilemap('map', mapPath, null, Phaser.Tilemap.TILED_JSON);
      // Load gamepad
      game.load.spritesheet('arrow', 'assets/images/arrowButtons.png', 60, 60, 4);
      // Load monster
      game.load.spritesheet('monster', 'assets/images/main/monsters.png', 50, 50, 2);
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

      // Gamepad
      this.upArrow = game.add.sprite(0, 0, 'arrow');
      this.downArrow = game.add.sprite(0, 50, 'arrow');
      this.leftArrow = game.add.sprite(-50, 25, 'arrow');
      this.rightArrow = game.add.sprite(50, 25, 'arrow');

      this.upArrow.inputEnabled = true;
      this.downArrow.inputEnabled = true;
      this.leftArrow.inputEnabled = true;
      this.rightArrow.inputEnabled = true;

      this.upArrow.events.onInputDown.add(this.doJump, this);
      this.downArrow.events.onInputDown.add(this.doStop, this);
      this.leftArrow.events.onInputDown.add(this.goLeft, this);
      this.rightArrow.events.onInputDown.add(this.goRight, this);

      this.upArrow.frame = 0;
      this.downArrow.frame = 1;
      this.leftArrow.frame = 2;
      this.rightArrow.frame = 3;

      this.upArrow.anchor.set(0.5, 0.5);
      this.downArrow.anchor.set(0.5, 0.5);
      this.leftArrow.anchor.set(0.5, 0.5);
      this.rightArrow.anchor.set(0.5, 0.5);

      this.buttonGroup = game.add.group();
      this.buttonGroup.add(this.upArrow);
      this.buttonGroup.add(this.downArrow);
      this.buttonGroup.add(this.leftArrow);
      this.buttonGroup.add(this.rightArrow);

      this.buttonGroup.fixedToCamera = true;
      this.buttonGroup.cameraOffset.setTo(
        game.width - this.buttonGroup.width / 2,
        game.height - this.buttonGroup.height
      );

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

      // monster
      this.monsterGroup = game.add.group();
      this.monsterGroup.createMultiple(10, 'monster');

      // Enable physics
      game.physics.arcade.enable([this.robot, this.monsterGroup]);
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

      // Create monsters
      this.makeMonsters();
    },

    makeMonsters: function () {
      for (var i = 0; i < 10; i++) {
        var monster = this.monsterGroup.getFirstDead();
        var xx = game.rnd.integerInRange(0, game.world.width);
        monster.reset(xx, 50);
        monster.enabled = true;
        monster.body.velocity.x = -100;
        monster.body.gravity.y = 100;
        monster.body.collideWorldBounds = true;
        monster.name = 'monster';

        monster.animations.add('move', [0, 1], 12, true);
        monster.animations.play('move');
      }
    },

    gotBomb: function (sprite, tile) {
      if (sprite.name == 'monster') { return; }

      this.map.removeTile(tile.x, tile.y, this.layer);
      this.collected++;
      if (this.collected == this.need) {
        level++;
        game.state.start('StateMain');
      }
    },

    reverseMonster: function(monster, layer) {
      if (monster.body.blocked.left == true) {
        monster.body.velocity.x = 100;
      }
      if (monster.body.blocked.right == true) {
        monster.body.velocity.x = -100;
      }
    },

    update: function () {
      // Make robot and monsters collide with map
      game.physics.arcade.collide(this.robot, this.layer);
      game.physics.arcade.collide(this.monsterGroup, this.layer);
      game.physics.arcade.collide(this.monsterGroup, this.layer, null, this.reverseMonster);

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
        this.goLeft();
      }
      // Move right
      if (cursors.right.isDown) {
        this.goRight();
      }
      // Jump
      if (cursors.up.isDown) {
        this.doJump();
      }
      // Stop
      if (cursors.down.isDown) {
        this.doStop();
      }
    },

    render: function () {
      game.debug.bodyInfo(this.robot, 20, 20);
    },

    goLeft: function () {
      this.robot.body.velocity.x = -250;
    },

    goRight: function () {
      this.robot.body.velocity.x = 250;
    },

    doStop: function () {
      this.robot.body.velocity.x = 0;
      this.robot.body.velocity.y = 0;
    },

    doJump: function () {
      if (this.robot.body.onFloor()) {
        this.robot.body.velocity.y = -Math.abs(this.robot.body.velocity.x) - 100;
        this.robot.animations.play('jump');
      }
    }

}
