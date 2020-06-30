// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We add the background image to the game
    addBackground(theRoot);
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.game = theRoot.querySelector("#game-section");
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.game);
    this.player.render();
    // Initially, we have no enemies and bonus in the game. The enemies property refers to an array
    // that contains instances of the Enemy class, same for bonus
    this.enemies = [];
    this.boni = [];
    // add lifes and score to game
    this.lifes = new Lifes(this.game);
    this.score = new Score(this.game);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();

    this.player.ammos.forEach((ammo) => {
      ammo.update(timeDiff);
    });

    this.player.ammos = this.player.ammos.filter((ammo) => {
      return !ammo.destroyed;
    });

    this.checkEnemyDead();

    // We use the number of milliseconds since the last call to gameLoop to update the enemy and bonus positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });
    this.boni.forEach((bonus) => {
      bonus.update(timeDiff);
    });
    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });
    this.boni = this.boni.filter((bonus) => {
      return !bonus.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextSpot(this.enemies);
      const newEnemy = new Enemy(this.game, spot);
      newEnemy.render();
      this.enemies.push(newEnemy);
    }

    while (this.boni.length < MAX_BONUS) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spotBonus = nextSpot(this.boni);
      const newBonus = new Bonus(this.game, spotBonus);
      newBonus.render();
      this.boni.push(newBonus);
    }

    // update number of lifes if player has lost a life
    this.updateRemainingLifes();

    this.catchBonus();

    	// game ends if player has no more lifes or player reaches 2000 points

    if (this.isPlayerDead() || this.score.number > 1999) {
      const endScreen = new Screen(this.game);
      const message = this.isPlayerDead() ? "Game over" : "You win !";
      console.log()
      endScreen.addText(message)
      endScreen.addBtn("Main menu");
      endScreen.reloadGameEventListener();
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  updateRemainingLifes = () => {
    // player loses life if overlaps enemy or enemy reaches the left of the screen
    for (let i = 0; i < this.enemies.length; i++) {
      if (
        this.enemies[i].spot === this.player.spot &&
        this.player.x + PLAYER_WIDTH > this.enemies[i].x &&
        this.player.x < this.enemies[i].x + ENEMY_WIDTH &&
        this.enemies[i].hasKilledPlayer === false
      ) {
        this.lifes.update();
        this.player.bounce();
        this.enemies[i].hasKilledPlayer = true;
        break;
      } else if (
        this.enemies[i].x < 0 &&
        this.enemies[i].hasKilledPlayer === false
      ) {
        this.lifes.update();
        this.enemies[i].hasKilledPlayer = true;
      }
    }
  };

  isPlayerDead = () => {
    let isDead = false;

    if (this.lifes.number < 0) {
      this.player.bounce();
      isDead = true;
    }
    return isDead;
  };

  // check if any bullet reached any enemy (enemy dead)
  checkEnemyDead = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = 0; j < this.player.ammos.length; j++) {
        if (
          this.enemies[i].spot === this.player.ammos[j].spot &&
          this.enemies[i].x < this.player.ammos[j].x + 10 &&
          this.enemies[i].wasKilled === false
        ) {
          this.player.ammos[j].hasKilledEnemy = true;
          this.enemies[i].wasKilled = true;
          this.score.update(10);
          break;
        }
      }
    }
  };

  catchBonus = () => {
    for (let i = 0; i < this.boni.length; i++) {
      if (
        this.boni[i].spot === this.player.spot &&
        this.player.x + PLAYER_WIDTH > this.boni[i].x &&
        this.player.x < this.boni[i].x + BONUS_WIDTH
      ) {
        this.boni[i].wasCaught = true;
        this.score.update(10);
        break;
      }
    }
  };
}
