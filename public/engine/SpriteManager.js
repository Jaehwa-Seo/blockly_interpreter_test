class Sprite {
    constructor(height=0,width=0,image=undefined,spriteName="",cropWidth=0,cropHiehgt=0,frameCount=0,spriteHeightDifference=0) {
        this.height = height
        this.frames = 0

        if(image != undefined)
            this.image = image
        this.cropWidth = cropWidth
        this.width = width
        this.cropHeight = cropHiehgt
        this.frameCount = frameCount

        this.frameTick = 0;
        this.spriteName = spriteName

        this.spriteHeightDifference = spriteHeightDifference
    }
  
    draw(position) {
        var roundWidth = Math.floor(this.width)
        c.drawImage(
            this.image,
            this.cropWidth * this.frames,
            0,
            this.cropWidth ,
            this.cropHeight,
            position.x,
            position.y,
            roundWidth,
            this.height
        )
    }

    update(position) {
        if(this.frameTick == 0)
        {
            this.frameTick = 1;
            this.frames++
            if (this.frames > this.frameCount) this.frames = 0
        }
        else
            this.frameTick -= 1;
    
        this.draw(position)
    }

    updateframe(position,frameSequence) {
        this.draw(position)
        if(this.frameTick == 0)
        {
            this.frameTick = frameTickSpeed;
            this.frames++
            if (this.frames > this.frameCount) 
            {
                this.frames = 0
                if(frameSequence.count < frameSequence.max - 1)
                {
                    frameSequence.count++;
                    frameTickSpeed = 1
                }
                else
                {
                    frameSequence.count = 0;
                }
            }
        }
        else
            this.frameTick -= 1;

       
    
        
    }
}
var frameTickSpeed = 1