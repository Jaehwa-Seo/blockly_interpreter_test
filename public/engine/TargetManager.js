class TargetObject {
    constructor({x,y,image}) {
        this.position = {
            x:x+15,
            y
        }
  
        this.image = image
        this.width = 50 
        this.height = 50
        this.startX = this.position.x
        this.startY = this.position.y
        this.moveSpeed = 0.5;
        this.getTarget = false;
    }
  
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y,this.width,this.height)
    }
  
    update() {
      this.position.y += this.moveSpeed;
  
      if(this.position.y >= this.startY + 20 || this.position.y <= this.startY - 20)
      {
        this.moveSpeed *= (-1)
      }
      
      if(this.position.x - (this.width/2) <= player.position.x + (player.width/2) && this.position.x + (this.width/2) >= player.position.x - (player.width/2) && this.position.y-(this.height/2) <= player.position.y +(player.height/2) && this.position.y + (this.height/2) >= player.position.y - (player.height/2))
        this.getTarget = true
      if(!this.getTarget)
        this.draw()
    }
  }