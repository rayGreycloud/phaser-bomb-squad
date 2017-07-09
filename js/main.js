var game;
var cursors;
var level = 1;

window.onload = function () {

  var width = screen.width > 1500 ? 640 : window.innerWidth;
  var height = screen.width > 1500 ? 480 : window.innerHeight;

  game = new Phaser.Game(width, height, Phaser.AUTO, 'ph_game');
  game.state.add('StateMain', StateMain);
  game.state.start('StateMain');

}
