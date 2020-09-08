// In this file we have functions that will be used in the Engine.js file.
// nextEnemySpot is a variable that refers to a function. The function has one parameter,
// which we called enemies. enemies will refer to an array that will contain instances of the
// Enemy class. To get more information about the argument that will get passed to this function,
// please see the Engine.js file.

// The purpose of this function is to determine in which slot to place our next enemy.
const nextSpot = (targetArr) => {
  // spots will refer to the number of spots available (can you calculate it?)
  const spots = Math.floor(GAME_HEIGHT / ENEMY_HEIGHT);

  // To find out where to place an enemy, we first need to find out which are the spots available.
  // We don't want to place two enemies in the same lane. To accomplish this, we first create an
  // array with 5 elements (why 5?) and each element is false.
  // We then use forEach to iterate through all the enemies.
  // If you look at the constructor of the Enemy class, you can see that every instance will have a spot property.
  // We can use this property to modify the spotsTaken array.
  const spotsTaken = [];
  for (i = 0; i < spots; i++) {
    spotsTaken.push(false);
  }

  targetArr.forEach((target) => {
    spotsTaken[target.spot] = true;
  });

  // We are now in a position to find out position. We declare a variable candidate that is initially undefined.
  // candidate represents a potential spot. The variable will be repeatedly assigned different numbers.
  // We will randomly try different spots until we find out that is available
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * spots);
  }
  // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
  return candidate;
};

// addBackground contains all the logic to display the background of the game and add a music to it.
// It is a variable that refers to a function.
// The function takes one parameter
// The parameter represents the DOM node to which we will add the background
const addBackground = (root) => {
  //create div containing game + some music

  // add music
  const music = document.createElement("audio");
  music.autoplay = true;
  music.loop = true;
  music.src = "assets/music.wav";
  music.height = 0;
  music.width = 0;

  // add explosion sound
  const boom = document.createElement("audio");
  boom.src = "assets/boom.wav";
  boom.height = 0;
  boom.width = 0;
  boom.setAttribute("id", "boom-soundclip")

  const game = document.createElement("div");
  
  game.style.height = `${GAME_HEIGHT}px`;
  game.style.width = `${GAME_WIDTH}px`;
  game.id = "game-section";
  game.style.position = "relative";
  game.style.overflow = "none";
  game.style.display = "flex";
  game.style.justifyContent = "center";
  game.style.alignItems = "center";
  game.style.flexDirection = "column";

  // We add it to the root DOM node
  root.append(music);
  root.append(boom);
  root.append(game);

  console.log('ici',)
};
