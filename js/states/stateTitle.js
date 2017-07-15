var StateTitle = {
  preload: function () {

  },

  create: function () {
    // display game title
    var titleText = game.add.text(game.world.centerX, game.world.centerY - 100, 'Robot Bomb Squad');
    titleText.fill = '#ffffff';
    titleText.anchor.set(0.5, 0.5);
    // Add start button
    this.btnStart = gameButtons.addButton('start', -1, -1, this.startGame, this);
  },

  startGame: function () {
    // Start game
    game.state.start('StateMain');
  },

  update: function () {

  }

}
