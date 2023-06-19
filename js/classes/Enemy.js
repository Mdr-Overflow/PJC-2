class Enemy extends Sprite {
    constructor({
      position,
      collisionBlocks,
      platformCollisionBlocks,
      imageSrc,
      frameRate,
      scale = 0.5,
      animations,
      loop,
      attackBox = { offset: {}, width: undefined, height: undefined },
      attackDmg, 
      armour,
      health,
    }) {
      super({ imageSrc, frameRate, scale })
        
      this.position = position
      this.velocity = {
        x: 0,
        y: 1,
      }
      
      this.animationQueue = []
      this.collisionBlocks = collisionBlocks
      this.platformCollisionBlocks = platformCollisionBlocks
      this.hitbox = {
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        width: 10,
        height: 10,
      }
  
      this.attackBox = {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        offset: attackBox.offset,
        width: attackBox.width,
        height: attackBox.height
      }
  
      this.animations = animations
      this.lastDirection = 'right'
  
      for (let key in this.animations) {
        const image = new Image()
        image.src = this.animations[key].imageSrc
  
        this.animations[key].image = image
      }
  
      this.camerabox = {
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        width: 200,
        height: 80,
      }
  
        
       // Add a property to track the jump charge time
       this.jumpChargeTime = 0;
       // Add a property to track if the jump key is currently being held down
       this.isJumpCharging = false;
       this.runAnimationEndTime = 0;
       this.wPressTime = 0;
       this.fallEndTime = 0;
       this.jumpsPerformed = 0;
       this.MaxJumps = 1;
       this.lastKeyPressTime = 0;
       this.dead = false;
       this.canMove = true;
       this.lastAnimationEndTime = 0;
       this.maxQueueSize = 3;
      
       this.health = health; 
       this.damageTaken = 0; 
       this.attackDmg = attackDmg;
       this.armour = armour;
    }
  
    switchSprite(key) {

   

        if (this.image === this.animations[key].image || !this.loaded) return
        if ( true === this.animations[key].loop ){
                this.currentFrame = 0                      
        }                // HERE IT HAPPENS
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
      
    
      }
    
    
    
      checkForHorizontalCanvasCollision() {
        if (
          this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
          this.hitbox.position.x + this.velocity.x <= 0
        ) {
          this.velocity.x = 0
        }
      }
    
    
    
      update() {
        this.updateFrames()
        this.updateHitbox()
       
    
    
        this.draw()
    
    
    
        this.position.x += this.velocity.x
        this.updateHitbox()
        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.updateHitbox() 
        this.checkForVerticalCollisions()
        
         // attack boxes
         this.attackBox.position.x = this.position.x + this.attackBox.offset.x
         this.attackBox.position.y = this.position.y + this.attackBox.offset.y
         
      }
    
    
      attack() {
    
        keys.space.pressed = true;
        this.isAttacking = true
    
      }
    
    
    
      
    
      updateHitbox() {
        this.hitbox = {
          position: {
            x: this.position.x + 35,
            y: this.position.y + 26,
          },
          width: 1,
          height: 16,
        }
      }
    
      checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
          const collisionBlock = this.collisionBlocks[i]
    
          if (
            collision({
              object1: this.hitbox,
              object2: collisionBlock,
            })
          ) {
            if (this.velocity.x > 0) {
              this.velocity.x = 0
    
              const offset =
                this.hitbox.position.x - this.position.x + this.hitbox.width
    
              this.position.x = collisionBlock.position.x - offset - 0.01
              break
            }
    
            if (this.velocity.x < 0) {
              this.velocity.x = 0
    
              const offset = this.hitbox.position.x - this.position.x
    
              this.position.x =
                collisionBlock.position.x + collisionBlock.width - offset + 0.01
              break
            }
          }
        }
      }
    
   
    
  
    takeHit(dmg) {
      this.health += dmg - this.armour;
  
      if (this.health <= 0) {
        if (this.lastDirection === 'right') this.switchSprite('Death')
        else this.switchSprite('DeathLeft')
      } else {
        if (this.lastDirection === 'right') this.switchSprite('Hurt')
        else this.switchSprite('HurtLeft')
      }
    }
  
    applyGravity() {
        this.velocity.y += gravity
        this.position.y += this.velocity.y
      }

    
      checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
          const collisionBlock = this.collisionBlocks[i]
    
          if (
            collision({
              object1: this.hitbox,
              object2: collisionBlock,
            })
          ) {
            if (this.velocity.y > 0) {
              this.velocity.y = 0
    
              const offset =
                this.hitbox.position.y - this.position.y + this.hitbox.height
    
              this.position.y = collisionBlock.position.y - offset - 0.01
              break
            }
    
            if (this.velocity.y < 0) {
              this.velocity.y = 0
    
              const offset = this.hitbox.position.y - this.position.y
    
              this.position.y =
                collisionBlock.position.y + collisionBlock.height - offset + 0.01
              break
            }
          }
        }
    
        // platform collision blocks
        for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
          const platformCollisionBlock = this.platformCollisionBlocks[i]
    
          if (
            platformCollision({
              object1: this.hitbox,
              object2: platformCollisionBlock,
            })
          ) {
            if (this.velocity.y > 0) {
              this.velocity.y = 0
    
              const offset =
                this.hitbox.position.y - this.position.y + this.hitbox.height
    
              this.position.y = platformCollisionBlock.position.y - offset - 0.01
              break
            }
          }
        }
      }
        } 