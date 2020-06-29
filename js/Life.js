class Lifes {
  constructor(game) {
    this.game = game;
    this.number = MAX_LIFES;

    // add <div> with lifes to the DOM
    this.lifes = document.createElement("div");
    this.lifes.style.position = "absolute";
    this.lifes.style.right = `30px`;
    this.lifes.style.top = ` 10px`;
    this.lifes.style.zIndex = "10";
    game.appendChild(this.lifes);

    for (let i = 0; i < this.number; i++) {
      const domElement = document.createElement("img");
      domElement.src = "images/life.png";
      domElement.style.width = "60px";
      domElement.id = `life-${i + 1}`;
      this.lifes.appendChild(domElement);
    }
  }

  update = () => {
    if (this.number > 0) {
      const life = document.querySelector(`#life-${MAX_LIFES - this.number + 1}`);
      life.classList.add("blink-me");

      setTimeout(() => {
        this.lifes.removeChild(life);
      }, 500);
    }
    this.number--;
  };
}
