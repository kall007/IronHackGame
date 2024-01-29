class Player {
  constructor() {
    this.width =
      this.height =
      this.positionX =
      this.positionY =
      this.domElm =
        null;

    this.createDomElement();
  }

  createDomElement() {
    this.domElm = createDomElement("div");

    //add content to the div we created in the line above
    this.domElm.setAttribute("id", "player");
    this.domElm.style.width = this.width + "vw";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.left = this.positionX + "vw";
    this.domElm.style.bottom = this.positionY + "vh";

    // append to the div with #board in html
    const boardElm = document.getElementById("game-board");
    boardElm.appendChild(this.domElm);
  }
  moveLeft() {
    if (this.position > 0) {
      this.position--;
      this.domElm.style.left = this.positionX + "vw";
    }
  }

  moveRight() {
    if (this.position < 0) {
      this.position++;
      this.domElm.style.left = this.positionX + "vw";
    }
  }
}

class Item {
  constructor() {
    this.width =
      this.height =
      this.positionX =
      this.positionY =
      this.domeElm =
        null;

    this.createDomElement();
  }

  createDomElement() {
    //first creating the element
    this.domElm = createElement("div");

    //adding content to the newly created element above
    this.domElm.setAttribute("class, items");
    this.domElm.style.width = this.width + "vw";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.left = this.positionX + "vw";
    this.domElm.style.bottom = this.positionY + "vh";

    const boardElm = document.getElementById("game-board");
    boardElm.appendChild(this.domElm);
  }

  itemsFall() {
    this.positionY--;
    this.domElm.style.bottom = this.positionY + "vh";
  }
}

const player = new Player ();
const items = [];
let score = 0;

setInterval(() => {
    const newItem = new Item ();
    items.push(newItem)
}, 3000); // speed at which the items are gonna fall


setInterval(() => {
    items.forEach((itemInstance) => {

        // call the function that moves the item
        itemInstance.moveDown();


        //checking for a collision between the player and the obstacle
        if ( player.positionX < itemInstance.positionX + itemInstance.width &&
            player.positionX + player.width > itemInstance.positionX &&
            player.positionY < itemInstance.positionY + itemInstance.height &&
            player.positionY + player.height > itemInstance.positionY) {    
                // should count the score ++
            }
    })
}, 30)

//adding event listener so the player can move left and right
document.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowLeft') {
        player.moveLeft();
    } else if (e.code === 'ArrowRight') {
        player.moveRight();
    }
});