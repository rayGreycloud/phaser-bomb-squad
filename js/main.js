var game;
var score;
var highScore;
var gameButtons;
var gameMedia;
var soundOn = true;
var musicOn = true;
var wrongTag = '';
// Add other globals here
var cursors;
var level = 1;

// Portrait or landscape
const useLandscape = true;

window.onload = function () {

  // Check screen width and set size
  var width, height;

  if (screen.width > 1500) {
    // Desktop
    width = useLandscape == true ? 640 : 480;
    height = useLandscape == true ? 480 : 640;

  } else {
    // Mobile
    width = window.innerWidth;
    height = window.innerHeight;
  }

  // Display wrong way message
  if (screen.width < 1500) {
    wrongTag = useLandscape == true ? 'wrongWayLandscape' : 'wrongWayPortrait';
  }

  // Initiate game
  game = new Phaser.Game(width, height, Phaser.AUTO, 'ph_game');

  // Initiate game media and buttons
  gameMedia = new GameMedia();
  gameButtons = new GameButtons();

  // Game states/screens
  game.state.add('StateMain', StateMain);
  game.state.add("StateLoad", StateLoad);
  game.state.add("StateInit", StateInit);
  game.state.add('StateTitle', StateTitle);
  // game.state.add('StateInstructions', StateInstructions);
  game.state.add('StateOver', StateOver);

  // Start initial state
  game.state.start('StateInit');
}
