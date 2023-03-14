// var partnerImagePath = "https://main.codingfamily.co.kr/content/character/mouse/sprites_fbx"
var partnerImagePath = "/assets/img"

var partnerImgData = 
{
  "Idle":
  {
    img:'/PartnerIdle.png',
    cropWidth : 120,
    cropHeight : 176,
    frameCount : 98
  },
  "Victory": {
    img: "/PartnerVictory.png",
    cropWidth: 150,
    cropHeight: 167,
    frameCount: 197
  }
}

var partnerAnimationList = ["Idle","Victory"]

class Partner {
    constructor(posx=0,posy=0,image=[]) {
      this.position = {
          x: posx,
          y: posy
      }
      this.velocity = {
          x: 0,
          y: 1
      }
      
      this.winposeX = this.position.x - 40

      this.sprites = {}

      this.height = 400 * screenRatio
      
      this.currentState = "Idle"

      this.partnerHeightDifference = 265 * screenRatio

      partnerAnimationList.forEach((spriteName) => {
        var spriteHeight,spriteWidth

        spriteHeight = 400 * screenRatio
        spriteWidth = this.height * partnerImgData[spriteName].cropWidth / partnerImgData[spriteName].cropHeight    
    
        var sprite = new Sprite(spriteHeight,spriteWidth,image[spriteName],spriteName,partnerImgData[spriteName].cropWidth,partnerImgData[spriteName].cropHeight,partnerImgData[spriteName].frameCount)

        this.sprites[spriteName] = sprite
    })
    }
  
    update(cameraPosition) {

    partnerAnimationList.forEach((spriteName) => {
        if(spriteName == this.currentState)
        {
            this.sprites[spriteName].update({x : this.position.x - cameraPosition.x, y : this.position.y + this.partnerHeightDifference - cameraPosition.y})
        }
    })
    }
}

let partner = new Partner()