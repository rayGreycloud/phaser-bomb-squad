var StateOver = {

  preload: function () {

  },

  create: function () {

    // Create game over message
    var overText = game.add.text(320, 140, 'GAME OVER');
    overText.fill = '#ffffff';
    overText.anchor.set(0.5, 0.5);
    // Event listener
    this.btnPlayAgain = gameButtons.addButton('playAgain', 320, 240, this.playAgain, this);

  },

  playAgain: function () {
    // Restart game
    game.state.start('StateMain');
  },

  update: function () {

  }

}
