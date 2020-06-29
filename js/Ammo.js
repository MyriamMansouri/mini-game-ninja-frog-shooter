class Ammo {
  constructor(game, x, y) {
    this.game = game;
    this.x = x + PLAYER_HEIGHT / 2;
    this.y = y + PLAYER_HEIGHT / 2;
    this.spot = Math.floor(this.y / ENEMY_HEIGHT);
    this.destroyed = false;
    this.hasKilledEnemy = false;
    this.domElement = document.createElement("img");

    this.domElement.src = "./images/ammo.png";
    // We modify the CSS style of the DOM node.
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;

    game.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25;
  }

  update(timeDiff) {
    this.x = this.x + timeDiff * this.speed;
    this.domElement.style.left = `${this.x}px`;
    if (this.x > GAME_WIDTH || this.hasKilledEnemy === true) {
      this.game.removeChild(this.domElement);

      this.destroyed = true;
    }
  }
}
