
// import {BackPack} from 'Inventory/InventoryMain.js';

// GET FULL SCREEN
document.body.style.overflow = 'hidden';
const displayWidth = window.innerWidth;
const displayHeight = window.innerHeight;


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = displayWidth
canvas.height = displayHeight

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      )
    }
  })
})

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
          height: 4,
        })
      )
    }
  })
})

const gravity = 0.1

const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc: './img/warrior/Idle.png',
  frameRate: 11,
  animations: {
    Idle: {
      imageSrc: './img/warrior/Idle.png',
      frameRate: 11,
      frameBuffer: 11,
    },
    Run: {
      imageSrc: './img/warrior/Run.png',
      frameRate: 8,
      frameBuffer: 10,
    },
    Jump: {
      imageSrc: './img/warrior/Jump.png',
      frameRate: 4,
      frameBuffer: 5,
    },
    Fall: {
      imageSrc: './img/warrior/Fall.png',
      frameRate: 4,
      frameBuffer: 5,
    },
    FallLeft: {
      imageSrc: './img/warrior/FallLeft.png',
      frameRate: 4,
      frameBuffer: 5,
    },
    RunLeft: {
      imageSrc: './img/warrior/RunLeft.png',
      frameRate: 8,
      frameBuffer: 10,
    },
    IdleLeft: {
      imageSrc: './img/warrior/IdleLeft.png',
      frameRate: 11,
      frameBuffer: 11,
    },
    JumpLeft: {
      imageSrc: './img/warrior/JumpLeft.png',
      frameRate: 4,
      frameBuffer: 5,
    },
  },
})

let inventory = new BackPack();

let store = new ItemStore();

let sword = store.getItem("Sword of Valor"); // Shield of Aegis
let shield = store.getItem("Shield of Aegis")
inventory.addItem(sword)
inventory.addItem(shield)
// inventory.addItem('sword', 'This sword has the blessing of the wind');

inventory.getItems();



const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
}

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/background.png',
})

const backgroundImageHeight = 432

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
}

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.save()
  c.scale(4, 4)
  c.translate(camera.position.x, camera.position.y)
  background.update()
  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.update()
  // })

  // platformCollisionBlocks.forEach((block) => {
  //   block.update()
  // })

  player.checkForHorizontalCanvasCollision()
  player.update()

  player.velocity.x = 0
  if (keys.d.pressed) {
    player.switchSprite('Run')
    player.velocity.x = 1.5
    player.lastDirection = 'right'
    player.shouldPanCameraToTheLeft({ canvas, camera })
  } else if (keys.a.pressed) {
    player.switchSprite('RunLeft')
    player.velocity.x = -1.5
    player.lastDirection = 'left'
    player.shouldPanCameraToTheRight({ canvas, camera })
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === 'right') player.switchSprite('Idle')
    else player.switchSprite('IdleLeft')
  }

  if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ camera, canvas })
    if (player.lastDirection === 'right') player.switchSprite('Jump')
    else player.switchSprite('JumpLeft')
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ camera, canvas })
    if (player.lastDirection === 'right') player.switchSprite('Fall')
    else player.switchSprite('FallLeft')
  }


  // DRAW INVENTORY LOGIC
  inventory.drawInventory(c, camera);



  c.restore()
}

animate()

// Add a method to perform the jump based on the charge time
function performJump() {
  let jumpStrength;


  if (player.jumpChargeTime >= 0.5 && player.jumpChargeTime < 1 ) {
    // Small jump
    jumpStrength = -2;
  } else if (player.jumpChargeTime >= 1 && player.jumpChargeTime < 1.5) {
    // Medium jump
    jumpStrength = -2 * 1.25;
  } else if (player.jumpChargeTime >= 1.5) {
    // Max jump
    jumpStrength = -2 * 2;
  }
  else{

    jumpStrength = 0;

  }
  player.velocity.y = jumpStrength;
}


window.addEventListener('keydown', (event) => {
  switch (event.key) {
      // ... other cases ...

      case 'i':
          inventory.showInventory = !inventory.showInventory;
          break;
  }
});

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      break
    case 'a':
      keys.a.pressed = true
      break
    case 'w':
      player.velocity.y = 0
      player.isJumpCharging = true;
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'w':
      player.isJumpCharging = false;
      this.performJump();
      player.jumpChargeTime = 0;
      
      break;
  }
})


 