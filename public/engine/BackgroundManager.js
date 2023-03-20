
var backgroundCity = '/engine/img/citybackground.jpg'
var backgroundPark = '/engine/img/parkbackground.png'
var backgroundHouse = '/engine/img/housebackground.jpg'
var backgroundIce = '/engine/img/icebackground.jpg'
var backgroundIce2 = '/engine/img/icebackground2.png'
var backgroundDesert = '/engine/img/desertbackground.jpg'



class GenericObject {
  constructor({x,y,image,width,height}) {
        this.image = image

        this.height = height*ratio
        this.width = width * ratio

        //Modify Background startpoint to leftdown
        this.modifyBackgroundY = this.height - screenHeight 

        this.position = {
            x:x,
            y:y-this.modifyBackgroundY
        }
  }
  

  draw(cameraPosition) {
      console.log(this.image)
      c.drawImage(this.image,this.position.x-cameraPosition.x/3,this.position.y-cameraPosition.y/3,this.width,this.height)
  }

  CheckBackgroundMove(cameraPosition,speed)
  {
    if(speed != undefined)
    {
        if(speed.x > 0)
        {
            if(cameraPosition.x  >= this.width * 3 * ((this.position.x / this.width) + 1))
            {
                this.position.x += (this.width * 2)
            }
        }
        else if(speed.x < 0)
        {
            if(cameraPosition.x < (this.position.x*3) - (screenWidth * 3))
            {
                this.position.x -= (this.width * 2)
            }
        }
        if(speed.y > 0)
        {
            if(cameraPosition.y > this.height * 3 * ((this.position.y / this.height) + 1))
            {
                this.position.y += (this.height * 2)
            }
        }
        else if(speed.y < 0)
        {
            if(cameraPosition.y < (this.position.y)*3 - this.height * 3)
            { 
                this.position.y -= (this.height * 2)
            }
        }
    }
  }
}

var backgroundObjects = []

let backgroundcityImage = {image:backgroundCity,width:1326,height:580}
let backgroundparkImage = {image:backgroundPark,width:1967,height:590}
let backgroundhouseImage = {image:backgroundHouse,width:1044,height:580}
let backgroundiceImage = {image:backgroundIce,width:1933,height:580}
let backgroundice2Image = {image:backgroundIce2,width:1920,height:1081}
let backgrounddesertImage = {image:backgroundDesert,width:1740,height:580}

function SetBackground()
{
    backgroundObjects.push(new GenericObject({
        x:levelsbackground[level].x,
        y:levelsbackground[level].y,
        image:backgroundImage, 
        width:levelsbackground[level].image.width, 
        height:levelsbackground[level].image.height
    }))
    backgroundObjects.push(new GenericObject({
        x:levelsbackground[level].x + levelsbackground[level].image.width * ratio,
        y:levelsbackground[level].y,
        image:backgroundImage, 
        width:levelsbackground[level].image.width, 
        height:levelsbackground[level].image.height
    }))
    backgroundObjects.push(new GenericObject({
        x:levelsbackground[level].x,
        y:levelsbackground[level].y - levelsbackground[level].image.height * ratio,
        image:backgroundImage, 
        width:levelsbackground[level].image.width, 
        height:levelsbackground[level].image.height
    }))
    backgroundObjects.push(new GenericObject({
        x:levelsbackground[level].x + levelsbackground[level].image.width * ratio,
        y:levelsbackground[level].y - levelsbackground[level].image.height * ratio,
        image:backgroundImage, 
        width:levelsbackground[level].image.width, 
        height:levelsbackground[level].image.height
    }))
}

function BackgroundPositionReset()
{
    backgroundObjects[0].position.x = levelsbackground[level].x
    backgroundObjects[0].position.y = levelsbackground[level].y
    backgroundObjects[1].position.x = levelsbackground[level].x + levelsbackground[level].image.width * ratio
    backgroundObjects[1].position.y = levelsbackground[level].y
    backgroundObjects[2].position.x = levelsbackground[level].x
    backgroundObjects[2].position.y = levelsbackground[level].y - levelsbackground[level].image.height * ratio
    backgroundObjects[3].position.x = levelsbackground[level].x + levelsbackground[level].image.width * ratio
    backgroundObjects[3].position.y = levelsbackground[level].y - levelsbackground[level].image.height * ratio
}
