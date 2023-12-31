
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
  width: canvas.width / 4 , // /4    576 1092  , 7.5
  height: canvas.height / 4,  // /4  432 2340 , 21.6
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 68) {   //36
  floorCollisions2D.push(floorCollisions.slice(i, i + 68))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 2256) {
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
for (let i = 0; i < platformCollisions.length; i += 68) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 68))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 2256) {
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

const gravity = 0.08

// 1192 2240

const shop = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './assets/shop.png',
  scale: 2.75,
  framesMax: 6
})



const player = new Player({
  position: {
    x: 300,  //300 si 100
    y: 2200,
  },
  canvasSizeHoriz : 2240, 
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc: './img/warrior/Idle.png',
  frameRate: 11,
  animations: {
    Idle: {
      imageSrc: './img/warrior/Idle.png',
      frameRate: 11,
      frameBuffer: 5,
    //  loop: true,
    },
    Run: {
      imageSrc: './img/warrior/Run.png',
      frameRate: 8,
      frameBuffer: 8,
      loop: true,
    },
    Jump: {
      imageSrc: './img/warrior/Jump.png',
      frameRate: 4,
      frameBuffer: 5,
      loop: true,
    },
    Fall: {
      imageSrc: './img/warrior/Fall.png',
      frameRate: 4,
      frameBuffer: 5,
      loop: true,
    },
    FallLeft: {
      imageSrc: './img/warrior/FallLeft.png',
      frameRate: 4,
      frameBuffer: 5,
      loop: true,
    },
    RunLeft: {
      imageSrc: './img/warrior/RunLeft.png',
      frameRate: 8,
      frameBuffer: 8,
      loop: true,
    },
    IdleLeft: {
      imageSrc: './img/warrior/IdleLeft.png',
      frameRate: 11,
      frameBuffer: 11,
    //  loop: true,
    },
    JumpLeft: {
      imageSrc: './img/warrior/JumpLeft.png',
      frameRate: 4,
      frameBuffer: 5,
      loop: true,
    },

    Charge: {
      imageSrc: './img/warrior/Charge.png',
      frameRate: 4,
      frameBuffer: 1,
      loop: true,
    },
    ChargeLeft: {
      imageSrc: './img/warrior/ChargeLeft.png',
      frameRate: 4,
      frameBuffer: 1,
      loop: true,
    },
      // ATTACK AND GET HURT ANIMATIONS


      Attack: {
        imageSrc: './img/warrior/Attack2.png',
        frameRate: 6,
        frameBuffer: 12,
        loop: false,
      },

      AttackLeft: {
        imageSrc: './img/warrior/AttackLeft.png',
        frameRate: 6,
        frameBuffer: 12,
        loop: false,
      },
      Hurt: {
        imageSrc: './img/warrior/Hurt.png',
        frameRate: 4,
        frameBuffer: 8,
        loop: false,
      },
      HurtLeft: {
        imageSrc: './img/warrior/HurtLeft.png',
        frameRate: 4,
        frameBuffer: 8,
        loop: false,
      },
      Death: {
        imageSrc: './img/warrior/Death.png',
        frameRate: 11,
        frameBuffer: 11,
        loop: false,
      },
      DeathLeft: {
        imageSrc: './img/warrior/DeathLeft.png',
        frameRate: 11,
        frameBuffer: 11,
        loop: false,
      }

  },
  wPressTime : 0,
  fallEndTime : 0,
  MaxJumps : 1,
  jumpsPerformed : 0 ,
  lastKeyPressTime : 0,
  canMove: true,
  lastAnimationEndTime: 0,
  animationQueue: [],
  maxQueueSize:  3,
  attackBox: {
    offset: {
      x: 100,
      y: 300
    },
    width: 14,                ///  TEST A LOT
    height: 12
  }

})

let inventory = new BackPack();

let store = new ItemStore();

let sword = store.getItem("Sword of Valor"); // Shield of Aegis
let shield = store.getItem("Shield of Aegis");
let helmet = store.getItem("Great Helmet");
let t_shirt = store.getItem("Simple T-shirt");
let shoes = store.getItem("Fancy Shoes");


inventory.addItem(sword);
inventory.addItem(shield);
inventory.addItem(helmet);
inventory.addItem(t_shirt);
inventory.addItem(shoes);
// inventory.addItem('sword', 'This sword has the blessing of the wind');

inventory.getItems();



const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  space: {
    pressed: false
  }

}

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/background.png',
})

const backgroundImageHeight = 2240 // 432

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
}


// LOAD PLAYER STUFF

player.loadState(camera);
playMusic();


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
  // Handle horizontal movement and animations
  if (player.velocity.y == 0) 
  player.jumpsPerformed = 0;  

if (player.velocity.y < 0) {
 player.shouldPanCameraDown({ canvas, camera })}
 if (player.velocity.y > 0) {
   player.shouldPanCameraUp({ canvas, camera });
 }



  if (player.canMove){



      // Check if there are any animations in the queue
      if (player.animationQueue.length > 0) {
        // Get the first animation in the queue
        const animation = player.animationQueue.shift();
  
        // Execute the animation
        switch (animation) {
          // case 'attack':
          //   player.attack();
          //   break;
          case 'run':
            keys.a.pressed = true;
            break;
          case 'runLeft':
            keys.d.pressed = true;
            break;
          case 'jump':
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
            break;
          case 'jumpLeft':
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
            break;
          // ... other cases for other animations ...
        }
  
        // Return to prevent other animations from executing
        //return;
      }





  if (keys.d.pressed) {
    player.switchSprite('Run');
    player.velocity.x = 1.25;
    player.lastDirection = 'right';
    player.shouldPanCameraToTheLeft({ canvas, camera });
  } else if (keys.a.pressed) {
    player.switchSprite('RunLeft');
    player.velocity.x = -1.25;
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

    // HURT AND DEATH




    // If the player's health drops to 0, switch to the death animation
  if (player.health <= 0) {
    if (player.lastDirection === 'right') {
      player.switchSprite('Death');
      player.canMove = false;
    } else {
      player.switchSprite('DeathLeft');
      player.canMove = false;
    }
  }

  if (player.damageTaken > 0) {
    if (player.lastDirection === 'right') {
      player.switchSprite('Hurt');
    } else {
      player.switchSprite('HurtLeft');
    }
    player.health -= player.damageTaken;
  }


  // ATTACK

  if (!player.isJumpCharging && player.currentAnimation !== 'Fall' && player.currentAnimation !== 'Attack' && player.currentAnimation !== 'AttackLeft' 
  &&  keys.space.pressed ) {
   player.canMove = false;
   setTimeout(() => {
     player.canMove = true;
   }, 500);
   if (player.lastDirection === 'right') {
     player.switchSprite('Attack');
   } else {
     player.switchSprite('AttackLeft');
   }
}}


 // if player misses
 if (player.isAttacking && player.currentFrame === 4) {
  player.isAttacking = false
}
  
player.cameraPosition.x = camera.position.x;
player.cameraPosition.y = camera.position.y;

console.log(player.position.x, player.position.y)
  c.restore()


  
}



animate()

// Add a method to perform the jump based on the charge time
function performJump() {
  let jumpStrength;

  player.wPressTime = 0;

  if (player.jumpChargeTime >= 0.1 && player.jumpChargeTime < 1.0 ) {
    // Small jump
    jumpStrength = -3 * 1.2 ;
    player.jumpChargeTime = 0;

  } else if (player.jumpChargeTime >= 1.0 && player.jumpChargeTime < 1.5) {
    // Medium jump
    jumpStrength = -3 * 1.3;
    player.jumpChargeTime = 0;
  } else if (player.jumpChargeTime >= 1.5) {
    // Max jump
    jumpStrength = -3 * 1.4;
    player.jumpChargeTime = 0;
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
          inventory.showInventory();
          break;
  }
});



window.addEventListener('keydown', (event) => {
 
  const currentTime = Date.now();
  if (currentTime - player.lastAnimationEndTime < 100) {

  }
  player.lastAnimationEndTime = currentTime;

  
  // if (!player.canMove) {
  //   return;
  // }
  switch (event.key) {

    
    case 'd':
      // Only allow running if player is not charging and not in the fall animation
      if (!player.isJumpCharging && player.currentAnimation !== 'Fall') {
        if (player.canMove) {
        keys.d.pressed = true;
        }
        else if (this.animationQueue.length < this.maxQueueSize) {
        player.animationQueue.push('runLeft');
        }
      }
      break;
    case 'a':
      // Only allow running if player is not charging and not in the fall animation
      if (!player.isJumpCharging && player.currentAnimation !== 'Fall') {
        if (player.canMove) {
        keys.a.pressed = true;
        }
        else if ( player.animationQueue.length < player.maxQueueSize ){
        player.animationQueue.push('run');
        }
      }
      break;
    case 'w':


      if ( player.canMove === false && player.animationQueue.length < player.maxQueueSize ){

      if (player.lastDirection === 'right') player.animationQueue.push('jump');
      else player.animationQueue.push('jumpLeft');
      }
    
      // Only allow jump if player is not falling, not running, not in the fall animation, and has not reached the maximum number of jumps
      // Also, only allow jump if 0.1 seconds have passed since the last keypress
      if (player.velocity.y <= 0 && !(keys.d.pressed || keys.a.pressed) && player.currentAnimation !== 'Fall' && player.jumpsPerformed < player.MaxJumps && Date.now() - player.lastKeyPressTime >= 100) {
      
        if (player.canMove) {
        keys.w.pressed = true; 
        player.velocity.y = 0;
        player.isJumpCharging = true;
        player.wPressTime = Date.now(); // Record the time when 'w' is pressed
        player.jumpsPerformed++;
        

        player.lastKeyPressTime = Date.now(); // Record the time of the last keypress
        }

      } else if (player.velocity.y <= 0 && (keys.d.pressed || keys.a.pressed) && player.jumpsPerformed < player.MaxJumps && Date.now() - player.lastKeyPressTime >= 100) {
        // If player is running and 'w' is pressed, perform normal jump
       
        if (player.canMove) {
        keys.w.pressed = true; 
        player.velocity.y = -3; // Normal jump strength
        player.jumpsPerformed++;
        player.lastKeyPressTime = Date.now(); // Record the time of the last keypress
        }

     
      }
      break;
  }
});

// Inventory icon click event
document
  .querySelector("#inventory-icon")
  .addEventListener("click", (event) => {
    inventory.showInventory();
  });

// Backpack inventory slots click event
document
  .querySelector("#backpack")
  .addEventListener("click", (event) => {
    // Find the closest parent element with the inventory-slot class
    const inventorySlot = event.target.closest('.inventory-slot');

    // Check if an inventory slot was found
    if (inventorySlot) {
      if(inventorySlot.classList.contains("current")){
        const actionButton = event.target.closest('button');
        inventory.performBackpackItemAction(actionButton.dataset.action)
      } else {
        // Get the item title from the inventory slot
        const itemTitle = inventorySlot.querySelector('.item-title').textContent;
        inventory.selectBackpackItem(itemTitle);
      }
    } else {
      inventory.selectBackpackItem(null);
    }
  })

// Backpack inventory slots click event
document
  .querySelector("#hero-model")
  .addEventListener("click", (event) => {
    // Find the closest parent element with the inventory-slot class
    const inventorySlot = event.target.closest('.inventory-slot');

    // Check if an inventory slot was found
    if (inventorySlot) {
      if(inventorySlot.classList.contains("current")){
        const actionButton = event.target.closest('button');
        inventory.performHeroItemAction(actionButton.dataset.action)
      } else {
        // Get the item title from the inventory slot
        const itemTitle = inventorySlot.querySelector('.item-title').textContent;
        inventory.selectHeroItem(itemTitle);
      }
    } else {
      inventory.selectHeroItem(null);
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
      
     




      let elapsedTime = player.wPressTime - Date.now()  // Calculate the time elapsed since 'w' was pressed
     // console.log(player.wPressTime)
      console.log(elapsedTime)
      if (elapsedTime >= -1000) {
        // If 'w' was held down for 1.0 seconds or more, perform a charged jump
       
        performJump();
        player.jumpsPerformed++; // Increment the number of jumps performed
      } else {
        // If 'w' was held down for less than 0.5 seconds, perform a normal jump
        // But only if 0.3 seconds have passed since the fall animation ended and the player has not reached the maximum number of jumps
        if (player.jumpsPerformed < player.MaxJumps) {
          player.velocity.y = -3; // Normal jump strength
          player.jumpsPerformed++; // Increment the number of jumps performed
          player.jumpChargeTime = 0;
          player.wPressTime = 0;
        }

        player.jumpChargeTime = 0;
      }
      break;
    case ' ':
      keys.space.pressed = false;

      

      break
  }
})

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case ' ':
      if (!player.isJumpCharging && player.currentAnimation !== 'Jump' && player.currentAnimation !== 'Charge' && player.currentAnimation !== 'Fall')
        player.attack();
        player.animationQueue.push('attack');
      break;
  }
})



function playMusic(){

  // Define an Audio object and provide the path to the music file
let music = new Audio('img\\S1Music.mp3');

// Set the music to play automatically and loop when it finishes
music.autoplay = true;
music.loop = true;

// Control the volume of the music (0 is mute, 1 is maximum)
music.volume = 0.1;

// Start playing the music
music.play();

}



// Define a function to stop the music
function stopMusic() {
  music.pause();  // Pause the music
  music.currentTime = 0;  // Reset the music to the start
}


window.addEventListener('keydown', (e) => {
  e.preventDefault();

  if (e.key === 'Escape') {

    e.preventDefault();
    window.location.href = "test.html";
    player.saveState();
    stopMusic();


  }


  
});
// 484.74 37.99000000000001
someWinningXPosition = 484.74;
someWinningYPosition = 37.99;


// Listen for the restart button click
document.getElementById('restart-button').addEventListener('click', function() {
  document.getElementById('win-card').style.display = 'none';
  window.location.href = "test.html";
})

function checkWinCondition() {
  if (player.position.x > someWinningXPosition && player.position.y > someWinningYPosition) {
    // If the player has reached the winning position, show the win card
    document.getElementById('win-card').style.display = 'block';
    // Optionally stop the game or the music when the player wins
    stopMusic();
    // stopGame();
  }
}

// Run the checkWinCondition function every frame or at an interval of your choosing
setInterval(checkWinCondition, 100); // check every 100ms