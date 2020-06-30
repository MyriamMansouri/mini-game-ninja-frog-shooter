// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(game) {
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.x = 10;

    // ammo fired by player
    this.ammos = [];
    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
    
    this.spot = Math.floor(GAME_HEIGHT / ENEMY_HEIGHT * 0.5); // commence au milieu de la hauteur de l'écran
    this.y = this.spot * ENEMY_HEIGHT;
    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement = document.createElement("div");
    this.domElement.id = "player";
    this.domElement.style.background = "url(images/frog.png)";
    this.domElement.style.backgroundSize = "cover";
    this.domElement.style.height = `${PLAYER_HEIGHT}px`;
    this.domElement.style.width = `${PLAYER_WIDTH}px`;
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = "10";
    game.appendChild(this.domElement);
    this.game = game;
  }

  // This method will be called when the user presses the left key. See in Engine.js
  // how we relate the key presses to this method
  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.x}px`;
  }

  // We do the same thing for the right key. See Engine.js to see when this happens.
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }

  moveUp() {
    if (this.y > 0) {
      this.y = this.y - ENEMY_HEIGHT;
      this.spot = Math.floor(this.y / ENEMY_HEIGHT);
    }
    this.domElement.style.top = `${this.y}px`;
  }

  moveDown() {
    if (this.y + PLAYER_HEIGHT < GAME_HEIGHT) {
      this.y = this.y + ENEMY_HEIGHT;
      this.spot = Math.floor(this.y / ENEMY_HEIGHT);
    }
    this.domElement.style.top = `${this.y}px`;
  }

  // when player loses one life, bounce animation
  bounce = () => {
    this.domElement.classList.add("bounce-me");
    setTimeout(() => {
      this.domElement.classList.remove("bounce-me");
    }, 1000);
  };

  fireAmmo = () => {
    const ammo = new Ammo(this.game, this.x, this.y);
    this.ammos.push(ammo);
  };

  render = () => {
    let tID;
    let position = 0; //start position for the image slicer
    const interval = 100; //100 ms of interval for the setInterval()
    tID = setInterval(() => {
      this.domElement.style.backgroundPosition = `-${position}px 0px`;

      if (position < 768) {
        position = position + PLAYER_WIDTH;
      } else {
        position = 0;
      }
      //reset the position to 256px, once position exceeds 1536px
    }, interval);
  };
}
