class Camera {
    constructor(cameraMoveQueue = []) {
      this.speed = 20 * screenRatio
      this.position = {
        x: 0,
        y: 0
    }
      if(cameraMoveQueue.length != 1)
      {
        this.position.x = 0
        this.position.y = 0
      }
      else
      {
        this.position.x = cameraMoveQueue[0].x * screenRatio
        this.position.y = cameraMoveQueue[0].y * screenRatio
      }

      this.cameraMoveQueue = cameraMoveQueue
      this.targetPosition = undefined
      this.targetMoveSpeed = undefined
      this.isxMoving = false
      this.isyMoving = false
      
      this.cameraDelay = 0

      this.isAutoMoving = false;
    }

    CheckBeginningCameraMoving()
    {
        this.position.x = this.cameraMoveQueue[0].x * screenRatio
        this.position.y = this.cameraMoveQueue[0].y * screenRatio
        this.cameraMoveQueue.shift()
        if(this.cameraMoveQueue.length >= 1)
        {
            this.cameraDelay = 100
            this.isAutoMoving = true;
            disable_btn();
            return true;
        }
        else
            return false;
    }
    
    CameraAutoMoving()
    {
        if(this.cameraDelay == 0)
        {
            if(this.targetPosition == undefined)
            {
                if(this.cameraMoveQueue.length == 0)
                {
                    this.isAutoMoving = false;
                    EnableButton()
                }
                else
                {
                    this.targetPosition = this.cameraMoveQueue[0]
                    this.targetPosition.x = this.targetPosition.x * screenRatio;
                    this.targetPosition.y = this.targetPosition.y * screenRatio;

                    this.cameraMoveQueue.shift();
                    
                    var speedX = (this.targetPosition.x - this.position.x)/100
                    var speedY = (this.targetPosition.y - this.position.y)/100

                    this.targetMoveSpeed = {x:speedX,y:speedY};
                    
                    this.isxMoving = true
                    this.isyMoving = true
                }
            }
            else
            {
                if((this.targetMoveSpeed.x >= 0 && this.position.x >= this.targetPosition.x) || (this.targetMoveSpeed.x < 0 && this.position.x <= this.targetPosition.x))
                {
                    this.isxMoving = false
                    this.position.x = this.targetPosition.x;
                }
                else 
                    this.position.x += this.targetMoveSpeed.x;
                if((this.targetMoveSpeed.y >= 0 && this.position.y >= this.targetPosition.y) || (this.targetMoveSpeed.y < 0 && this.position.y <= this.targetPosition.y))
                {
                    this.isyMoving = false
                    this.position.y = this.targetPosition.y;
                }
                else
                    this.position.y += this.targetMoveSpeed.y;

                if(!this.isyMoving && !this.isxMoving)
                {
                    this.targetPosition = undefined;
                    this.targetMoveSpeed = undefined;
                }

            }
        }
        else
        {
            this.cameraDelay--;
        }

    }

    CameraMove(backgroundObjects)
    {
        if(player.position.x - this.position.x> screenWidth/5*3)
        {
            this.position.x += this.speed

            backgroundObjects.forEach((genericObject) => {
                genericObject.CheckBackgroundMove(this.position,{x:this.speed,y:0})
            })
            
        }
        else if(player.position.x - this.position.x < screenWidth/5*2 && this.position.x > 0)
        {
            this.position.x -= this.speed

            var genericSpeed = (this.speed * -1) 

            backgroundObjects.forEach((genericObject) => {
                genericObject.CheckBackgroundMove(this.position,{x: genericSpeed ,y:0})
            })
        }

        if(player.position.y - this.position.y > 1150 * screenRatio && this.position.y < 0)
        {
            this.position.y += this.speed

            backgroundObjects.forEach((genericObject) => {
                genericObject.CheckBackgroundMove(this.position,{x:0 ,y: this.speed})
            })
        }

        // if(player.position.y - this.position.y < screenHeight/3)
        // {
        //     this.position.y -= this.speed

        //     var genericSpeed = (this.speed * -1) 

        //     backgroundObjects.forEach((genericObject) => {
        //         genericObject.CheckBackgroundMove(this.position,{x:0 ,y: genericSpeed})
        //     })
        // }
    }

    Move(speedX,speedY,backgroundObjects)
    {
        
        // if(this.position.x + speedX <= this.maxPosition.x - screenWidth && this.position.x + speedX >= 0)
        // {
            this.position.x += (speedX*ratio);
        // }

        // if(this.position.y + speedY >= this.maxPosition.y - screenHeight && this.position.y + speedY <= 0)
        // {
            this.position.y += (speedY*ratio);
        // }

        backgroundObjects.forEach((genericObject) => {
            genericObject.CheckBackgroundMove(this.position,{x:speedX,y:speedY})
        })

        console.log("x : " + this.position.x + " y : " + this.position.y)
    }

    // ChangePositionPossible(pos)
    // {
    //     if(pos.x < 0)
    //     {
    //         pos.x = 0
    //     }
    //     else if (pos.x + screenWidth > this.maxPosition.x)
    //     {
    //         pos.x = this.maxPosition.x - screenWidth;
    //     }

    //     if(pos.y > 0)
    //     {
    //         pos.y = 0
    //     }
    //     else if (pos.y - screenHeight < this.maxPosition.y)
    //     {
    //         pos.y = this.maxPosition.y + screenHeight;
    //     }

    //     return pos
    // }

    
      
 }
