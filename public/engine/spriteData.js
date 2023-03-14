var spriteData = {
    "partnervictory":
    [
        {
            img:'/partnervictory-1.png',
            cropWidth : 150,
            cropHeight : 167,
            frameCount : 108
        },
        {
            img:'/partnervictory-2.png',
            cropWidth : 150,
            cropHeight : 167,
            frameCount : 88
        }
    ]
}

var spriteObj = []

async function TestLoading()
{
    

    for(var i=0;i< spriteData["partnervictory"].length; i++)
    {
        var spriteHeight = 400 * screenRatio
        var spriteWidth = spriteHeight * spriteData["partnervictory"][i].cropWidth / spriteData["partnervictory"][i].cropHeight    

        var checkImageLoading = {
            count : 0
        }

        var image = CreateImage("/assets/img"+ spriteData["partnervictory"][i].img,checkImageLoading)

        while(checkImageLoading.count != 1)
        {
            await sleep(10)
        }


        spriteObj.push(new Sprite(spriteHeight,spriteWidth,image,"partnervictory",spriteData["partnervictory"][i].cropWidth,spriteData["partnervictory"][i].cropHeight,spriteData["partnervictory"][i].frameCount))
    }
    // console.log(spriteObj)
}

var frameSequence = {
    count : 0,
    max : 2
}

function SpriteAnimate(){
    requestAnimationFrame(SpriteAnimate)
    spriteObj[frameSequence["count"]].updateframe(camera.position,frameSequence)
}

TestLoading()