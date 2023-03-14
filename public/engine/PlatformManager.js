var platformblockCity = '/engine/img/cityblock.png'
var platformblockPark = '/engine/img/grassblock.png'
var platformblockHouse = '/engine/img/houseblock.png'
var platformblockIce = '/engine/img/iceblock.png'
var platformblockDesert = '/engine/img/sandblock.png'

var blockSize = 500 

class Platform {
    constructor({x,y,image}) {

        this.position = {
            x:x * screenRatio,
            y:y * screenRatio
        }

        this.image = image
        this.width = blockSize * screenRatio
        this.height = blockSize * screenRatio
    }

    draw(cameraPosition) {
        c.drawImage(this.image, this.position.x - cameraPosition.x , this.position.y - cameraPosition.y,this.width, this.height)
    }
}

let platforms = []
