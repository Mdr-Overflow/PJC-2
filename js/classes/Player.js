class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc,
    frameRate,
    scale = 0.5,
    animations,
    loop,
    attackBox = { offset: {}, width: undefined, height: undefined }
  }) {
    super({ imageSrc, frameRate, scale })
    this.position = position
    this.velocity = {
      x: 0,
      y: 1,
    }
    

    this.collisionBlocks = collisionBlocks
    this.platformCollisionBlocks = platformCollisionBlocks
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 12,
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
     this.dead = false
  }

  switchSprite(key) {

    // overriding all other animations for death anim
    if (this.image === this.animations.Death.image) {
      if (this.framesCurrent === this.animations.Death.framesMax - 1)
        this.dead = true
      return
    }

    if (this.image === this.animations.DeathLeft.image) {
      if (this.framesCurrent === this.animations.DeathLeft.framesMax - 1)
        this.dead = true
      return
    }

    // overriding all other animations with the attack animation
    if (
      this.image === this.animations.Attack.image &&
      this.framesCurrent < this.animations.Attack.framesMax - 1
    )
      return

      if (
        this.image === this.animations.AttackLeft.image &&
        this.framesCurrent < this.animations.AttackLeft.framesMax - 1
      )
        return

    // override when fighter gets hit
    if (
      this.image === this.animations.Hurt.image &&
      this.framesCurrent < this.animations.Hurt.framesMax - 1
    )
      return

      if (
        this.image === this.animations.HurtLeft.image &&
        this.framesCurrent < this.animations.HurtLeft.framesMax - 1
      )
        return

    if (this.image === this.animations[key].image || !this.loaded) return

    // this.currentFrame = 0                                     // HERE IT HAPPENS
    this.image = this.animations[key].image
    this.frameBuffer = this.animations[key].frameBuffer
    this.frameRate = this.animations[key].frameRate
    this.health = 100; 
    this.damageTaken = 0; 
  }

  updateCamerabox() {
    this.camerabox = {
      position: {
        x: this.position.x - 50,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    }
  }

  checkForHorizontalCanvasCollision() {
    if (
      this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
      this.hitbox.position.x + this.velocity.x <= 0
    ) {
      this.velocity.x = 0
    }
  }

  shouldPanCameraToTheLeft({ canvas, camera }) {
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
    const scaledDownCanvasWidth = canvas.width / 4

    if (cameraboxRightSide >= 576) return

    if (
      cameraboxRightSide >=
      scaledDownCanvasWidth + Math.abs(camera.position.x)
    ) {
      camera.position.x -= this.velocity.x
    }
  }

  shouldPanCameraToTheRight({ canvas, camera }) {
    if (this.camerabox.position.x <= 0) return

    if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x
    }
  }

  shouldPanCameraDown({ canvas, camera }) {
    if (this.camerabox.position.y + this.velocity.y <= 0) return

    if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y
    }
  }

  shouldPanCameraUp({ canvas, camera }) {
    if (
      this.camerabox.position.y + this.camerabox.height + this.velocity.y >=
      432   // CHANGE THIS TO MAX MAP HEIGHT
    )
      return

    const scaledCanvasHeight = canvas.height / 4

    if (
      this.camerabox.position.y + this.camerabox.height >=
      Math.abs(camera.position.y) + scaledCanvasHeight
    ) {
      camera.position.y -= this.velocity.y
    }
  }

  update() {
    this.updateFrames()
    this.updateHitbox()

    this.updateCamerabox()
 


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
     
    
    if (this.isJumpCharging) {
      this.jumpChargeTime += 0.016; // Assuming 60 FPS, so each frame is about 0.016 seconds
      console.log(this.jumpChargeTime)
    }
  }


  attack() {

    keys.space.pressed = true;
    
 
    this.isAttacking = true

  }

  takeHit() {
    this.health -= 20

    if (this.health <= 0) {

      if (this.lastDirection === 'right') this.switchSprite('Death')
      else this.switchSprite('DeathLeft')


    } else {
      
      if (this.lastDirection === 'right') this.switchSprite('Hurt')
      else this.switchSprite('HurtLeft')

  }
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
