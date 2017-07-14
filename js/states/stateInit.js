var StateInit = {

  preload: function () {
    // Load bar images
    game.load.image("loadingEmpty", "assets/images/loading/progress_none.png");
    game.load.image("loadingFull", "assets/images/loading/progress_all.png");

    // Enforce orientation on mobile
    if (screen.width < 1500) {

      if (useLandscape == true) {
        game.scale.forceOrientation(true, false);
      } else {
        game.scale.forceOrientation(false, true);
      }
      // Display use portrait mode message
      game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
      game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
    }
  },

  create: function () {
    // Proceed to load game
    game.state.start("StateLoad");
  },

  update: function () {

  },
  // Don't display orientation message
  rightWay: function () {
    document.getElementById(wrongTag).style.display = "none";
  },
  // Display orientation message
  wrongWay: function () {
    document.getElementById(wrongTag).style.display = "block";
  }

}
