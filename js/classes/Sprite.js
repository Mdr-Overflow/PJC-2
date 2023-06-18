class Sprite {
  constructor({
    position,
    imageSrc,
    frameRate = 1,
    frameBuffer = 3,
    scale = 1,
    loop
   // framesMax = 1                     frameRate is max frames , frame buffer is frame hold
  }) {
    this.position = position
    this.scale = scale
    this.loaded = false
    this.image = new Image()
    this.image.onload = () => {
      this.width = (this.image.width / this.frameRate) * this.scale
      this.height = this.image.height * this.scale
      this.loaded = true
      // console.log("LOADED " + this.image)
      // console.log("LOADED " + this.image)
      // console.log("LOADED " + this.image)
      // console.log("LOADED " + this.image)
      // console.log("LOADED " + this.image)
      // console.log("LOADED " + this.image)
      // console.log("LOADED " + this.image)
      // console.log("LOADED " + this.image)
      // console.log("LOADED " + this.image)
      // console.log("LOADED " + this.image)
    }
    this.image.src = imageSrc
    this.frameRate = frameRate
    this.currentFrame = 0
    this.frameBuffer = frameBuffer
    this.elapsedFrames = 0
    this.loop = loop
    console.info(this.loop)

 //   this.framesMax = framesMax
 //   this.framesCurrent = 0
    // this.framesElapsed = 0
   // this.framesHold = 5
  }

  draw() {
    if (!this.image) return

    const cropbox = {
      position: {
        x: this.currentFrame * (this.image.width / this.frameRate),
        y: 0,
      },
      width: this.image.width / this.frameRate,
      height: this.image.height,
    }

    c.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update() {
    this.draw()
    this.updateFrames()
  }

  updateFrames() {
    this.elapsedFrames++
    //this.currentFrame++

    if (this.loop === false) {
      this.currentFrame = 1
      console.info("IN NO LOOP")
      return;
    } 

    // PROBLEM IS NOT BUFFER , IT WON'T ENTER SECOND IF FOR THE SECOND TIME FOR SOME REASON , 
    // PROBLEM IS NOT ANOTHER ANIM. OVERWRITTING IT 
    // SEEMS TO NOT BE ABLE TO KEEP CURRENT FRAME COUNTER
    // NOT A LOADING PROBLEM
      console.info("UPDATED FRAMES")
      console.info("CURRENT FRAME = " + this.currentFrame)
      console.info("FRAME RATE = " +this.frameRate)
      console.info("this.elapsedFrames % this.frameBuffer === " + this.elapsedFrames % this.frameBuffer)
      console.info(this.image)
    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1)  {
      this.currentFrame++
      console.info("CURRENT FRAME IN UPDATE = " + this.currentFrame)
      console.info(this.elapsedFrames)
      console.info(this.frameRate)
      console.info("Buffer ="+  this.frameBuffer)
      console.info(this.image)
    }
      else{
        console.info("CURRENT FRAME IN SET 0 = " + this.currentFrame)
        this.currentFrame = 0
      
        console.info("SET FRAMES TO 0")
        
      }
    }
    else {

      //this.currentFrame++

    }
    console.info("CURRENT FRAME OUTSIDE LOGIC = " + this.currentFrame)
  }
}
