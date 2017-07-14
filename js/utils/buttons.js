GameButtons = function () {

  this.addButton = function (type, xx, yy, f, scope) {
    var over = 0;
    var down = 1;

    xx = xx == -1 ? game.world.centerX : xx;
    yy = yy == -1 ? game.world.centerY : yy;

    switch (type) {
      case 'start':
        over = 6;
        down = 7;
        break;

      case 'playAgain':
        over = 0;
        down = 1;
        break;

      case 'yes':
        over = 2;
        down = 3;
        break;

      case 'no':
        over = 4;
        down = 5;
        break;
    }

    var button = game.add.button(xx, yy, 'buttons', f, scope, down, over, down);
    button.anchor.set(0.5, 0.5);

    return button;
  },

  this.addAudioButton = function (type, xx, yy, f, scope) {
    xx = xx == -1 ? game.world.centerX : xx;
    yy = yy == -1 ? game.world.centerY : yy;

    var mButton = game.add.sprite(xx, yy, 'soundButtons');

    if (type == 'music') {
      mButton.frame = 2;
      this.musicButton = mButton;
    } else {
      this.soundButton = mButton;
    }

    mButton.inputEnabled = true;
    mButton.events.onInputDown.add(f, scope);
    return mButton;
  },

  this.updateButtons = function () {
    this.musicButton.frame = musicOn == true ? 2 : 3;
    this.soundButton.frame = soundOn == true ? 0 : 1;
  },

  this.toggleMusic = function (target, scope) {
    musicOn = !musicOn;
    target.frame = musicOn == true ? 2 : 3;
    gameMedia.updateMusic();
  },

  this.toggleSound = function (target, scope) {
    soundOn = !soundOn;
    target.frame = soundOn == true ? 0 : 1;
  }
}
