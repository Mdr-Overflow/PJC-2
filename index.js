// import {BackPack} from 'Inventory/InventoryMain.js';

// GET FULL SCREEN
document.body.style.overflow = "hidden";
const displayWidth = window.innerWidth;
const displayHeight = window.innerHeight;

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = displayWidth;
canvas.height = displayHeight;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

const collisionBlocks = [];
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
      );
    }
  });
});

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}

const platformCollisionBlocks = [];
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
      );
    }
  });
});

const gravity = 0.1;

const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc: "./img/warrior/Idle.png",
  frameRate: 11,
  animations: {
    Idle: {
      imageSrc: "./img/warrior/Idle.png",
      frameRate: 11,
      frameBuffer: 11,
    },
    Run: {
      imageSrc: "./img/warrior/Run.png",
      frameRate: 8,
      frameBuffer: 10,
    },
    Jump: {
      imageSrc: "./img/warrior/Jump.png",
      frameRate: 4,
      frameBuffer: 5,
    },
    Fall: {
      imageSrc: "./img/warrior/Fall.png",
      frameRate: 4,
      frameBuffer: 5,
    },
    FallLeft: {
      imageSrc: "./img/warrior/FallLeft.png",
      frameRate: 4,
      frameBuffer: 5,
    },
    RunLeft: {
      imageSrc: "./img/warrior/RunLeft.png",
      frameRate: 8,
      frameBuffer: 10,
    },
    IdleLeft: {
      imageSrc: "./img/warrior/IdleLeft.png",
      frameRate: 11,
      frameBuffer: 11,
    },
    JumpLeft: {
      imageSrc: "./img/warrior/JumpLeft.png",
      frameRate: 4,
      frameBuffer: 5,
    },

    Charge: {
      imageSrc: './img/warrior/Charge.png',
      frameRate: 4,
      frameBuffer: 1,
    },
    ChargeLeft: {
      imageSrc: './img/warrior/ChargeLeft.png',
      frameRate: 4,
      frameBuffer: 1,
    }
      // CHARGE FURTHER , ATTACK AND GET HURT ANIMATIONS
  },

});

  wPressTime : 0,
  fallEndTime : 0,
  MaxJumps : 1,
  jumpsPerformed : 0 ,
  lastKeyPressTime : 0
})


let inventory = new BackPack();

let store = new ItemStore();

let sword = store.getItem("Sword of Valor"); // Shield of Aegis
let shield = store.getItem("Shield of Aegis");
inventory.addItem(sword);
inventory.addItem(shield);
// inventory.addItem('sword', 'This sword has the blessing of the wind');
inventory.getItems();

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },

};

  w: {
    pressed: false,
  }

}


const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});

const backgroundImageHeight = 432;

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.scale(4, 4);
  c.translate(camera.position.x, camera.position.y);
  background.update();
  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.update()
  // })

  // platformCollisionBlocks.forEach((block) => {
  //   block.update()
  // })

  player.checkForHorizontalCanvasCollision();
  player.update();


  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.switchSprite("Run");
    player.velocity.x = 1.5;
    player.lastDirection = "right";
    player.shouldPanCameraToTheLeft({ canvas, camera });
  } else if (keys.a.pressed) {
    player.switchSprite("RunLeft");
    player.velocity.x = -1.5;
    player.lastDirection = "left";
    player.shouldPanCameraToTheRight({ canvas, camera });
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === "right") player.switchSprite("Idle");
    else player.switchSprite("IdleLeft");
  }

  if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ camera, canvas });
    if (player.lastDirection === "right") player.switchSprite("Jump");
    else player.switchSprite("JumpLeft");
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ camera, canvas });
    if (player.lastDirection === "right") player.switchSprite("Fall");
    else player.switchSprite("FallLeft");
  }


  player.velocity.x = 0
  // Handle horizontal movement and animations
  if (keys.d.pressed) {
    player.switchSprite('Run');
    player.velocity.x = 1.5;
    player.lastDirection = 'right';
    player.shouldPanCameraToTheLeft({ canvas, camera });
  } else if (keys.a.pressed) {
    player.switchSprite('RunLeft');
    player.velocity.x = -1.5;
    player.lastDirection = 'left';
    player.shouldPanCameraToTheRight({ canvas, camera });
  } else {
    player.velocity.x = 0;
    if (player.lastDirection === 'right') {
      player.switchSprite('Idle');
    } else {
      player.switchSprite('IdleLeft');
    }
  }

  // Handle vertical movement and animations
  if (keys.w.pressed && player.isJumpCharging) {
    if (player.lastDirection === 'right') {
      player.switchSprite('Charge');
    } else {
      player.switchSprite('ChargeLeft');
    }
  } else if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ canvas, camera });
    if (player.lastDirection === 'right') {
      player.switchSprite('Jump');
    } else {
      player.switchSprite('JumpLeft');
    }
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ canvas, camera });
    if (player.lastDirection === 'right') {
      player.switchSprite('Fall');
    } else {
      player.switchSprite('FallLeft');
    }
  }

    // If the fall animation has just ended, record the time
    if (this.currentAnimation !== 'Fall' && this.previousAnimation === 'Fall') {
      player.fallEndTime = Date.now();
      
    }
  
    if (player.velocity.y == 0) 
     player.jumpsPerformed = 0;  

  if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ canvas, camera })}
    if (player.velocity.y > 0) {
      player.shouldPanCameraUp({ canvas, camera });
    }
// 

  // DRAW INVENTORY LOGIC
  inventory.drawInventory(c, camera);

  c.restore();
}

animate();

// Add a method to perform the jump based on the charge time
function performJump() {
  let jumpStrength;


  if (player.jumpChargeTime >= 0.5 && player.jumpChargeTime < 1) {

  player.wPressTime = 0;

  if (player.jumpChargeTime >= 0 && player.jumpChargeTime < 0.5 ) {

    // Small jump
    jumpStrength = -3 ;
    player.jumpChargeTime = 0;

  } else if (player.jumpChargeTime >= 0.5 && player.jumpChargeTime < 1.0) {
    // Medium jump
    jumpStrength = -3 * 1.25;
    player.jumpChargeTime = 0;
  } else if (player.jumpChargeTime >= 1.5) {
    // Max jump

    jumpStrength = -2 * 2;
  } else {

    jumpStrength = -3 * 1.5;
    player.jumpChargeTime = 0;
  }
  else{

    jumpStrength = 0;
  }
  player.velocity.y = jumpStrength;
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // ... other cases ...

    case "i":
      inventory.showInventory();
      break;
  }
});


window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = 0;
      player.isJumpCharging = true;



window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      // Only allow running if player is not charging and not in the fall animation
      if (!player.isJumpCharging && player.currentAnimation !== 'Fall') {
        keys.d.pressed = true;
      }
      break;
    case 'a':
      // Only allow running if player is not charging and not in the fall animation
      if (!player.isJumpCharging && player.currentAnimation !== 'Fall') {
        keys.a.pressed = true;
      }
      break;
    case 'w':
      // Only allow jump if player is not falling, not running, not in the fall animation, and has not reached the maximum number of jumps
      // Also, only allow jump if 0.1 seconds have passed since the last keypress
      if (player.velocity.y <= 0 && !(keys.d.pressed || keys.a.pressed) && player.currentAnimation !== 'Fall' && player.jumpsPerformed < player.MaxJumps && Date.now() - player.lastKeyPressTime >= 100) {
        keys.w.pressed = true; 
        player.velocity.y = 0;
        player.isJumpCharging = true;
        player.wPressTime = Date.now(); // Record the time when 'w' is pressed
        player.jumpsPerformed++;
        player.lastKeyPressTime = Date.now(); // Record the time of the last keypress
      } else if (player.velocity.y <= 0 && (keys.d.pressed || keys.a.pressed) && player.jumpsPerformed < player.MaxJumps && Date.now() - player.lastKeyPressTime >= 100) {
        // If player is running and 'w' is pressed, perform normal jump
        keys.w.pressed = true; 
        player.velocity.y = -3; // Normal jump strength
        player.jumpsPerformed++;
        player.lastKeyPressTime = Date.now(); // Record the time of the last keypress
      }

      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      player.isJumpCharging = false;

      this.performJump();
      player.jumpChargeTime = 0;

      break;
  }
});

document
  .querySelector("#inventory-icon")
  .addEventListener("click", (event) => {
    inventory.showInventory();
  });

      let elapsedTime = player.wPressTime - Date.now()  // Calculate the time elapsed since 'w' was pressed
     // console.log(player.wPressTime)
      console.log(elapsedTime)
      if (elapsedTime >= -500) {
        // If 'w' was held down for 0.5 seconds or more, perform a charged jump
       
        performJump();
        player.jumpsPerformed++; // Increment the number of jumps performed
      } else {
        // If 'w' was held down for less than 0.5 seconds, perform a normal jump
        // But only if 0.3 seconds have passed since the fall animation ended and the player has not reached the maximum number of jumps
        if (Date.now() - player.fallEndTime >= 150 && player.jumpsPerformed < player.MaxJumps) {
          player.velocity.y = -3; // Normal jump strength
          player.jumpsPerformed++; // Increment the number of jumps performed
          player.jumpChargeTime = 0;
          player.wPressTime = 0;
        }

        player.jumpChargeTime = 0;
      }
      break;
  }
});

