class Score {
    constructor(game) {
      this.game = game;
      this.number = 0;
  
      // add <div> with lifes to the DOM
      this.score = document.createElement("div");
      this.score.style.position = "absolute";
      this.score.style.left = `30px`;
      this.score.style.top = `10px`;
      this.score.style.zIndex = "10";
      this.score.id = "score"
      this.score.innerText = this.number;
      game.appendChild(this.score);
    }

    update = (points) => {
        this.number += points;
        this.score.innerText = this.number;
      };
}
  