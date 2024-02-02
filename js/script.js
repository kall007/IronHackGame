class Player {
  constructor() {
    this.width = 7;
    this.height = 19;
    this.positionX = 50;
    this.positionY = 0;
    this.domElm = null;
    this.score = 0;

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

  increaseScore() {
    this.score++;
    let scorePoints = document.querySelector("#playerPoints");
    scorePoints.textContent = `Score: ${this.score}`;
  }
}

class FallingObject {
  constructor(className) {
    this.width = 5;
    this.height = 10;
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
const level2 = document.getElementById("level2");
const level3 = document.getElementById("level3")
const level4 = document.getElementById("level4")



//objects start falling faster after 10 seconds and shows the level 2
setTimeout(() => {
  clearInterval(itemInterval);
  clearInterval(objectInterval);

  itemInterval = setInterval(() => {
    const newItem = new Item();
    ensureNoOverlap(newItem, items, obstacles);
    items.push(newItem);
  }, 3000);

  objectInterval = setInterval(() => {
    const newObstacle = new Obstacle();
    ensureNoOverlap(newObstacle, obstacles, items);
    obstacles.push(newObstacle);
  }, 2000);

  level2.hidden = false;

  setTimeout(() => {
    level2.hidden = true;
  }, 1000);
}, 10000);


//objects start falling faster after 20 seconds and shows the level 3
setTimeout(() => {
  clearInterval(itemInterval);
  clearInterval(objectInterval);

  itemInterval = setInterval(() => {
    const newItem = new Item();
    ensureNoOverlap(newItem, items, obstacles);
    items.push(newItem);
  }, 2500);

  objectInterval = setInterval(() => {
    const newObstacle = new Obstacle();
    ensureNoOverlap(newObstacle, obstacles, items);
    obstacles.push(newObstacle);
  }, 1000);

  level3.hidden = false;

  setTimeout(() => {
    level3.hidden = true;
  }, 1000);
}, 20000);


//objects start falling faster after 30 seconds and shows the level 4
setTimeout(() => {
  clearInterval(itemInterval);
  clearInterval(objectInterval);

  itemInterval = setInterval(() => {
    const newItem = new Item();
    ensureNoOverlap(newItem, items, obstacles);
    items.push(newItem);
  }, 2000);

  objectInterval = setInterval(() => {
    const newObstacle = new Obstacle();
    ensureNoOverlap(newObstacle, obstacles, items);
    obstacles.push(newObstacle);
  }, 500);

  level4.hidden = false;

  setTimeout(() => {
    level4.hidden = true;
  }, 1000);
}, 30000);

//objects start falling faster after 30 seconds and shows the level 4
setTimeout(() => {
  clearInterval(itemInterval);
  clearInterval(objectInterval);

  itemInterval = setInterval(() => {
    const newItem = new Item();
    ensureNoOverlap(newItem, items, obstacles);
    items.push(newItem);
  }, 1500);

  objectInterval = setInterval(() => {
    const newObstacle = new Obstacle();
    ensureNoOverlap(newObstacle, obstacles, items);
    obstacles.push(newObstacle);
  }, 250);

  level5.hidden = false;

  setTimeout(() => {
    level5.hidden = true;
  }, 1000);
}, 40000);


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
        player.increaseScore();
        
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


const startSound = document.getElementById("starting-sound")
const startButton = document.getElementById('start-button')
startButton.addEventListener("click", () => {
    startSound.play() 
})

