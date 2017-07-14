var StateMain = {
  preload: function () {

  },

  create: function () {

    // Reset score
    score = 0;

    // Add buttons
    this.btnYes = gameButtons.addButton('yes', -1, -1, this.sayYes, this);
    this.btnNo = gameButtons.addButton('no', -1, this.btnYes.y - this.btnYes.height, this.sayNo, this);

    this.btnMusic = gameButtons.addAudioButton('music', 20, 20, gameButtons.toggleMusic, this);
    this.btnSound = gameButtons.addAudioButton('sound', 20, 70, gameButtons.toggleSound, this);

    // For scrolling game - fix position
    // this.audioGroup = game.add.group();
    // this.audioGroup.fixedToCamera = true;

    // Define sounds
    this.elephant = game.add.audio('elephant');

    // Background music
    // Define
    this.backgroundMusic = game.add.audio('backgroundMusic');
    // Add to game object
    gameMedia.setBackgroundMusic(this.backgroundMusic);
    // Initialize music
    gameMedia.updateMusic();

    // Initialize sound buttons
    gameButtons.updateButtons();
  },

  sayYes: function () {
    // Play sound
    gameMedia.playSound(this.elephant);
  },

  sayNo: function () {
    // Stop music
    this.backgroundMusic.stop();
    // Game over
    game.state.start('StateOver');
  },

  update: function () {

  }

}
