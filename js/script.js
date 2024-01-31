// class Player {
//   constructor(){
//       this.width = 10;
//       this.height = 15;
//       this.positionX = 50;
//       this.positionY = 0;
//       this.domElm = null;

//       this.createDomElement();
//   }
//   createDomElement(){
//       // step1: create the element
//       this.domElm = document.createElement("div");

//       // step2: add content or modify
//       this.domElm.setAttribute("id", "player");
//       this.domElm.style.width = this.width + "vw"
//       this.domElm.style.height = this.height + "vh"
//       this.domElm.style.left = this.positionX + "vw";
//       this.domElm.style.bottom = this.positionY + "vh";

//       //step3: append to the dom: `parentElm.appendChild()`
//       const boardElm = document.getElementById("game-board");
//       boardElm.appendChild(this.domElm);
//   }
//   moveLeft() {
//       if (this.positionX > 0) {
//           this.positionX--;
//           this.domElm.style.left = this.positionX + "vw";
//       }
//   }
//   moveRight() {
//       if (this.positionX + this.width < 100) {
//           this.positionX++;
//           this.domElm.style.left = this.positionX + "vw";
//       }
//   }
// }

class Player {
  constructor() {
    this.width = 10;
    this.height = 15;
    this.positionX = 50;
    this.positionY = 0;
    this.domElm = null;

    this.moveIncrement = 2; // Adjust this value to control the speed

    this.createDomElement();
  }

  createDomElement() {
    this.domElm = document.createElement("div");
    this.domElm.setAttribute("id", "player");
    this.domElm.style.width = this.width + "vw";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.left = this.positionX + "vw";
    this.domElm.style.bottom = this.positionY + "vh";

    const boardElm = document.getElementById("game-board");
    boardElm.appendChild(this.domElm);
  }

  moveLeft() {
    if (this.positionX > 0) {
      this.positionX -= this.moveIncrement; // Adjust position change based on speed
      this.domElm.style.left = this.positionX + "vw";
    }
  }

  moveRight() {
    if (this.positionX + this.width < 100) {
      this.positionX += this.moveIncrement; // Adjust position change based on speed
      this.domElm.style.left = this.positionX + "vw";
    }
  }
}

class FallingObject {
  constructor(className) {
    this.width = 10;
    this.height = 15;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
    this.positionY = 100;
    this.domElm = null;
    this.className = className;

    this.createDomElement();
  }

  createDomElement() {
    this.domElm = document.createElement("div");
    this.domElm.setAttribute("class", this.className);
    this.domElm.style.width = this.width + "vw";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.left = this.positionX + "vw";
    this.domElm.style.bottom = this.positionY + "vh";

    const boardElm = document.getElementById("game-board");
    boardElm.appendChild(this.domElm);
  }

  remove() {
    this.domElm.remove();
  }

  moveDown() {
    this.positionY--;
    this.domElm.style.bottom = this.positionY + "vh";
  }
}

class Item extends FallingObject {
  constructor() {
    super("item");
  }

  // Add any specific functionality for items if needed
}

class Obstacle extends FallingObject {
  constructor() {
    super("obstacle");
  }

  // Add any specific functionality for obstacles if needed
}

const player = new Player();
const items = [];
const obstacles = [];
const level2 = document.getElementById("level");

setTimeout(() => {
  clearInterval(itemInterval);
  clearInterval(objectInterval);

  itemInterval = setInterval(() => {
    const newItem = new Item();
    ensureNoOverlap(newItem, items, obstacles);
    items.push(newItem);
  }, 3500);

  objectInterval = setInterval(() => {
    const newObstacle = new Obstacle();
    ensureNoOverlap(newObstacle, obstacles, items);
    obstacles.push(newObstacle);
  }, 1000);

  level2.hidden = false;

  setTimeout(() => {
    level2.hidden = true;
  }, 1000);
}, 7000);

// generate items at a different interval
let itemInterval = setInterval(() => {
  const newItem = new Item();
  ensureNoOverlap(newItem, items, obstacles);
  items.push(newItem);
}, 4000); // spawn items every 4 seconds

// generate obstacles at a different interval
let objectInterval = setInterval(() => {
  const newObstacle = new Obstacle();
  ensureNoOverlap(newObstacle, obstacles, items);
  obstacles.push(newObstacle);
}, 3000); // spawn obstacles every 3 seconds

function ensureNoOverlap(newObject, existingObjects1, existingObjects2) {
  // Check for overlap with existingObjects1
  while (existingObjects1.some((obj) => isOverlap(newObject, obj))) {
    newObject.positionX = Math.floor(
      Math.random() * (100 - newObject.width + 1)
    );
  }

  // Check for overlap with existingObjects2
  while (existingObjects2.some((obj) => isOverlap(newObject, obj))) {
    newObject.positionX = Math.floor(
      Math.random() * (100 - newObject.width + 1)
    );
  }

  // Update the DOM element position after ensuring no overlap
  newObject.domElm.style.left = newObject.positionX + "vw";
}

function isOverlap(obj1, obj2) {
  return (
    obj1.positionX < obj2.positionX + obj2.width &&
    obj1.positionX + obj1.width > obj2.positionX &&
    obj1.positionY < obj2.positionY + obj2.height &&
    obj1.positionY + obj1.height > obj2.positionY
  );
}

// move falling objects & detect collision
setInterval(() => {
  [...items, ...obstacles].forEach((fallingObject) => {
    fallingObject.moveDown();

    if (
      player.positionX < fallingObject.positionX + fallingObject.width &&
      player.positionX + player.width > fallingObject.positionX &&
      player.positionY < fallingObject.positionY + fallingObject.height &&
      player.positionY + player.height > fallingObject.positionY
    ) {
      if (fallingObject instanceof Item) {
        console.log("Item caught!");
        removeItem(fallingObject);
      } else if (fallingObject instanceof Obstacle) {
        console.log("Game over - Hit an obstacle!");
        location.href = "gameover.html";
      }
    }
  });
}, 30);

function removeItem(item) {
  // Remove the item from the items array
  const itemIndex = items.indexOf(item);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
  }

  // Remove the item from the DOM
  const boardElm = document.getElementById("game-board");
  boardElm.removeChild(item.domElm);
}

function removeObstacle() {}

// add event listeners
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    player.moveLeft();
  } else if (e.code === "ArrowRight") {
    player.moveRight();
  }
});
