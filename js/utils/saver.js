function checkHighScore(key, score) {
// 2nd refactor
  var currentHighScore = localStorage.getItem(key);

  if (currentHighScore === null || score > currentHighScore) {
    localStorage.setItem(key, score);
    return score;
  } else {
    return currentHighScore;
  }
}

// 1st refactor
//   var currentHighScore = localStorage.getItem(key);
//
//   if (currentHighScore === null || score > currentHighScore) {
//     localStorage.setItem(key, score);
//     highScore = score;
//   } else {
//     highScore = currentHighScore;
//   }
//
//   return highScore;
// }

// Original code
//   if (localStorage.getItem(key) === null) {
//     localStorage.setItem(key, score);
//     highScore = score;
//   } else {
//     if (score > localStorage.getItem(key)) {
//       localStorage.setItem(key, score);
//       highScore = score;
//     } else {
//       return localStorage.getItem(key);
//     }
//   }
//   return highScore;
// }
