var playerImagePath = ""

var playerframetick = 0;

class Player {
    constructor(posx=0,posy=0,image={}) {
        this.speed = 20 * screenRatio
        this.position = {
            x: posx,
            y: posy
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.height = 650 * screenRatio

        this.playerHeightDifference = 5;

        this.sprites = {}
        if(image != {})
        {
            levelsPlayerAnimationList[level].forEach((spriteName) => {
                var spriteHeight,spriteWidth,spriteHeightDifference
                if(spriteName == "Idle")
                {
                    spriteHeight = 650 * screenRatio
                    spriteWidth = img_data[spriteName]["width"]/img_data[spriteName]["items"] * spriteHeight / img_data[spriteName]["height"]
                    spriteHeightDifference = - 5
                }
                else
                {
                    spriteHeight = 650 * img_data[spriteName]["height"] / img_data["Idle"]["height"] * screenRatio
                    spriteWidth = img_data[spriteName]["width"]/img_data[spriteName]["items"] * spriteHeight / img_data[spriteName]["height"]      
                    spriteHeightDifference = spriteHeight - (650 * screenRatio) - 5
                }
                
                var sprite = new Sprite(spriteHeight,spriteWidth,image[spriteName],spriteName,img_data[spriteName]["width"]/img_data[spriteName]["items"],img_data[spriteName]["height"],img_data[spriteName]["items"]-1,spriteHeightDifference)

                this.sprites[spriteName] = sprite
            })
        }

        this.currentState = "Idle"
        this.lastState
    }

    update(cameraPosition) {
        this.position.x += this.velocity.x  
        this.position.y += this.velocity.y
        
        if(this.position.y + this.height + this.velocity.y <= canvas.height && this.currentState != 'Jump' && !isChecking)
        {
            this.velocity.y += gravity
        }

        levelsPlayerAnimationList[level].forEach((spriteName) => {
            if(spriteName == this.currentState)
            {
                this.sprites[spriteName].update({x : this.position.x - cameraPosition.x, y : this.position.y - cameraPosition.y - this.sprites[spriteName].spriteHeightDifference})
            }
        })
    }

    AnimationChange(animationName) {
        this.lastState = this.currentState
        this.currentState = animationName

        if(animationName == "Jump")
        {
            targetX = this.position.x + (blockSize * screenRatio) * 2

            // Animation has different frame, so change the speed to show all the animation.
            this.velocity.x = 16.4 * screenRatio
        }
        else
        {
            this.velocity.x = this.speed
            targetX = this.position.x + (blockSize * screenRatio)
        }
        
        if(this.lastState != this.currentState || this.currentState == "Jump")
            this.sprites[animationName].frames = 0
        
        
    }
}

let player = new Player()

async function Run()
{
    player.AnimationChange("Running")

    await WaitAnimation()

    player.velocity.x = 0

    var isFail = await CheckFalling()

    return !isFail
}

async function Jump()
{
    player.AnimationChange("Jump")

    await WaitAnimation()

    player.velocity.x = 0

    var isFail = await CheckFalling()

    return !isFail
}

// async function DoubleJump()
// {
//   targetX = player.position.x + blockSize
//   player.velocity.y -= 10
//   player.velocity.x = player.speed

//   await waitAnimation()

//   player.velocity.y -= 10
//   targetX = player.position.x + blockSize*2

//   await waitAnimation()

//   player.velocity.x = 0

//   if(player.velocity.y > 1)
//     return false;
//   else
//     return true;
// }