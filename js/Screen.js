// This class is not used in the project yet.
class Screen {
  // The constructor has three parameters. Here is an example of how you would create
  // an instance of this class
  constructor(root) {
    // We create a DOM element, set its CSS attributes then append it to the parent DOM element. We also
    // set the \`domElement\` property of the instance to the newly created DOM element so we can update it later
    const div = document.createElement("div");
    const p = document.createElement("p");

    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.flexDirection = "column";
    div.style.textAlign = "center";
    div.style.maxWidth = "800px";
    div.style.height = "300px";
    div.style.zIndex = 2000;

    root.appendChild(div);
    div.appendChild(p);

    this.p = p;
    this.btn = undefined;
    this.div = div;
  }

  // This method is used to update the text displayed in the DOM element
  addText(txt) {
    this.p.innerHTML = txt;
  }

  addBtn(txt) {
    const btn = document.createElement("button");
    btn.innerText = txt;
    btn.className = "btn"; // see style in css
    this.div.appendChild(btn);
    this.btn = btn;
  }

  startGameEventListener = (startGameEngine) => {
    this.btn.addEventListener("click", startGameEngine);
  };

  reloadGameEventListener = () => {
    this.btn.addEventListener("click", function () {
      window.location.reload();
    });
  };

  removeScreen = () => {
    this.div.parentNode.removeChild(this.div);
  };
}
