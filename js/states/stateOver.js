var StateOver = {

  preload: function () {

  },

  create: function () {

    // Create game over message
    var overText = game.add.text(game.world.centerX, game.world.centerY - 100, 'Game Over');
    overText.fill = '#ffffff';
    overText.anchor.set(0.5, 0.5);
    // Event listener
    this.btnPlayAgain = gameButtons.addButton('playAgain', -1, -1, this.playAgain, this);
  },

  playAgain: function () {
    // Restart game
    game.state.start('StateMain');
  },

  update: function () {

  }

}
