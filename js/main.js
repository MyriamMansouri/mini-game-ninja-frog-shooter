// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`

startGameEngine = () => {
  startScreen.removeScreen();
  const gameEngine = new Engine(app);
  // keydownHandler is a variable that refers to a function. The function has one parameter
  // (does the parameter name matter?) which is called event. As we will see below, this function
  // will be called every time the user presses a key. The argument of the function call will be an object.
  // The object will contain information about the key press, such as which key was pressed.
  const keydownHandler = (event) => {
    if (event.code === "ArrowLeft") {
      gameEngine.player.moveLeft();
    }

    if (event.code === "ArrowRight") {
      gameEngine.player.moveRight();
    }

    if (event.code === "ArrowUp") {
      gameEngine.player.moveUp();
    }

    if (event.code === "ArrowDown") {
      gameEngine.player.moveDown();
    }

    if (event.code === "Space") {
      gameEngine.player.fireAmmo();
    }
  };

  // touch handlers to make work on mobile phones
  let onTouchInterval;
  let direction = 0;
  onTouch = (event) => {
    // as player moves, she fires bullets
    // flag if user tapped screen to move player up or down
    // direction = 1, move player up. direction = 2 move player down. direction = 0 when user is not touching the screen
    if (direction === 0) {
      direction = gameEngine.player.y > event.touches[0].clientY ? 1 : 2;
    }

    if (direction === 1) {
      gameEngine.player.moveUp();
    } else if (direction === 2) {
      gameEngine.player.moveDown();
    }
    if (gameEngine.isGameOver === false) gameEngine.player.fireAmmo();
  };

  const touchHandler = (event) => {
    clearInterval(onTouchInterval);
    onTouchInterval = setInterval(() => onTouch(event), 50);
  };

  const removeTouchHandler = () => {
    direction = 0;
    clearInterval(onTouchInterval);
  };

  // We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
  // as long as game is not over,
  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("touchstart", touchHandler);
  document.addEventListener("touchend", removeTouchHandler);

  // We call the gameLoop method to start the game
  gameEngine.gameLoop();
};

const startScreen = new Screen(app);

// change start message if on computer or mobile
let startMessage;
if (document.body.clientWidth < 480) {
  startMessage =
    "Get the fruits, do not let the enemies cross. Tap screen to move and shoot.";
} else {
  startMessage =
    "Get the fruits, do not let the enemies cross. Use the space bar to fire ammo and arrow keys to move across the screen.";
}
startScreen.addText(startMessage);
startScreen.addBtn("Start Game");
startScreen.startGameEventListener(startGameEngine);
