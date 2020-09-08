class Bonus {

    constructor(game, bonusSpot) {
      this.game = game;
      this.spot = bonusSpot;
      this.y = bonusSpot * ENEMY_HEIGHT;
      this.x = GAME_WIDTH  + BONUS_WIDTH;

      this.wasCaught = false; // caught by player
      this.destroyed = false; // either ennemy was killed or out of the game screen => remove it
  
      this.domElement = document.createElement("div");

      this.domElement.style.position = "absolute";
      this.domElement.style.background = `url(images/bonus/bonus-${Math.floor(Math.random()*8 + 1)}.png)`; // display random bonus image
      this.domElement.style.backgroundSize = "cover";
      this.domElement.style.height = `${BONUS_HEIGHT}px`;
      this.domElement.style.width = `${BONUS_WIDTH}px`;;
      this.domElement.style.left = `${this.x}px`;
      this.domElement.style.top = `${this.y}px`;
      this.domElement.style.zIndex = 5;

      game.appendChild(this.domElement);
      this.speed = Math.random() / 2 ;
    }
    update(timeDiff) {

      this.x = this.x - timeDiff * this.speed;
      this.domElement.style.left = `${this.x}px`;
  
      if (this.x < -80 || this.wasCaught) {
        this.game.removeChild(this.domElement);
  
        this.destroyed = true;
      }
    }
  
    render = () => {
      let tID;
      let position = 0; //start position for the image slicer
      const interval = 100; //100 ms of interval for the setInterval()
      tID = setInterval(() => {
        this.domElement.style.backgroundPosition = `-${position}px 0px`;
  
        if (position < 1088) {
          position = position + BONUS_WIDTH;
        } else {
          position = 0;
        }
        //reset the position to BONUS_WIDTH, once position exceeds 1088px
      }, interval);
    };
  
  }
  