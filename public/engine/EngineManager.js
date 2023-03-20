// Canvas setting
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d',{ alpha: false })

canvas.width = screenWidth  
canvas.height = screenHeight  

SetCanvasRatio()

// Boolean
var isLose = false;
var isWin = false;
var isChecking = false;

// Use in Lose Scene 
let sceneOpacity = 0;

// Use in Loading Scene
var fontSize = 144 * screenRatio

// Game Setting variable
const gravity = 0.8 * screenRatio

let targetX



// Image object
var backgroundImage
var platformImage = []
var playerAnimations = {}
var partnerAnimations = {}

var currentTime = Date.now();


async function Loading()
{
    SetLoadingScreen()

    //Background Loading
    var checkBackgroundLoading = {
        count : 0
    }
    backgroundImage = CreateImage(levelsbackground[level].image.image,checkBackgroundLoading)

    while(checkBackgroundLoading.count == 0)
    {
        await sleep(10)
    }

    SetBackground()
    
    //Platform Loading
    var checkPlatformLoading = {
        count : 0
    }

    levelsPlatformSprites[level].forEach((platformSprite) => {
        platformImage.push(CreateImage(platformSprite,checkPlatformLoading))
    })

    while(checkPlatformLoading.count != levelsPlatformSprites[level].length)
    {
        await sleep(10)
    }

    SetPlatform()

    //Player Loading
    var checkPlayerLoading = {
        count : 0
    }

    levelsPlayerAnimationList[level].forEach((animationName) => {
        playerAnimations[animationName] = CreateImage(playerImagePath+img_data[animationName]["img"],checkPlayerLoading)
    })

    // playerAnimations["VictoryCustom1"] = CreateImage("./assets/img/test_cut_16384.png",checkPlayerLoading)
    

    
    while((checkPlayerLoading.count) != levelsPlayerAnimationList[level].length)
    {
        await sleep(10)
    }

    // var _cropheight = 890
    // var _item = 298
    // var _cropwidth = 159965 / (_item + 1)
    // var _spriteHeight = 650 * _cropheight / 325 * screenRatio
    // var _spriteWidth = _cropwidth * _spriteHeight / _cropheight      
    // var _spriteHeightDifference = _spriteHeight - (650 * screenRatio) - 5
    
    // player.sprites["VictoryCustom1"] = new Sprite(_spriteHeight,_spriteWidth,playerAnimations["VictoryCustom1"],"VictoryCustom1",_cropwidth,_cropheight,_item,_spriteHeightDifference)

    //Partner Loading
    var checkPartnerLoading = {
        count : 0
    }

    partnerAnimationList.forEach((animationName) => {
        partnerAnimations[animationName] = CreateImage(partnerImagePath+partnerImgData[animationName]["img"],checkPartnerLoading)
    })

    while(checkPartnerLoading.count != partnerAnimationList.length)
    {
        await sleep(10)
    }
    
    SceneReset(true)
    Animate()
    SpriteAnimate()
}

// If isReset true, play the first camera movement
async function SceneReset(isShowAllMap)
{
    isWin = false;
    isLose = false;
    isChecking = false;

    camera = new Camera(CopyPositionQueue(levelsCameraMoveQueue[level]));

    player = new Player(startPosition.x,startPosition.y,playerAnimations)
    partner = new Partner(goalPosition.x,goalPosition.y,partnerAnimations)

    BackgroundPositionReset()

    if(isShowAllMap)
    {
        if(!camera.CheckBeginningCameraMoving())
        {
            EnableButton();
        }   
    }
    else
    {
        camera = new Camera(CopyPositionQueue([levelsCameraMoveQueue[level][levelsCameraMoveQueue[level].length-1]])); 
    }
}


function Animate(){
    requestAnimationFrame(Animate)

    SetCanvasRatio()

    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width,canvas.height)

    // Background draw
    backgroundObjects.forEach((genericObject) => {
        genericObject.draw(camera.position)
    })

    platforms.forEach((platform) => {
        platform.draw(camera.position)
    })

    partner.update(camera.position)
    player.update(camera.position)

    platforms.forEach((platform) => {
        // Check each platform to check conflict with player
        // -5 is different of player real position is air, so block gravity problem
        // for velocity y
        if(player.position.y + player.height <= platform.position.y - (5 * screenRatio) && 
        player.position.y + player.height + player.velocity.y >= platform.position.y - (5 * screenRatio) && 
        player.position.x + player.sprites[player.currentState].width >= platform.position.x && 
        player.position.x <= platform.position.x + platform.width)
        {
            player.velocity.y = 0
        }
        
        // for velocity x
        if(player.position.y < platform.position.y + blockSize * screenRatio && 
        player.position.y + player.height > platform.position.y &&
        player.position.x + player.sprites[player.currentState].width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
        )
        {
            player.velocity.x = 0;
            targetX = player.position.x;
        }
    })  

    if(isLose)
    {
        c.globalAlpha = sceneOpacity;
        sceneOpacity += 0.01;
        c.fillStyle = 'black'
        c.fillRect(0,0,canvas.width,canvas.height)
        c.globalAlpha = 1;
    }

    if(camera.isAutoMoving)
    {
        camera.CameraAutoMoving();
    }
    else
    {
        camera.CameraMove(backgroundObjects);
    }
}

Loading()




//////////////////////////////////////////////////////

async function CheckResult()
{ 
    isChecking = true;
    if(isWin == false && isLose == false)
    {
        player.position.y = Math.ceil(player.position.y)

        goalPosition.y = Math.ceil(goalPosition.y)

        if(player.position.x === goalPosition.x && player.position.y === goalPosition.y)
        {
            isWin = true;
            player.currentState = 'Victory'
            player.sprites['Victory'].frames = 0
            partner.currentState = 'Victory'
        }
        else
        {
            player.currentState = 'Defeat'
            player.sprites['Defeat'].frames = 0

            await sleep(2000)

            isLose = true;
            sceneOpacity = 0;
        }
    }
}

async function run_code(simulation_code,code, callback) {
    // definition of highlight function.
    var jsForHighlightBlockFunction = `async function highlightBlock(id) \{
        parent.Blockly.mainWorkspace.highlightBlock(id)
    \}`

    var my_str = "(async () => { " + "SceneReset(false);" + "await sleep(400);" + code + "player.currentState='Idle';"  +"  })();";
    
    // add the definition on top of code.
    my_str = jsForHighlightBlockFunction + my_str;

    GetSimulationResult(simulation_code)
    
    try {
        const x = await eval(my_str);
        await sleep(200);
        await CheckResult();

        callback(undefined, isWin);
    } catch(er) {
        console.log(er);
        callback("ERR", false);
    }
}

async function CheckReady(callback) {
    await SceneReset(true)
    callback(true)
}

// Simulate this code is success or not
async function GetSimulationResult(code){
    var currentPosition = {x:-1,y:-1,result:""}
    var goalPosition = {x:-1,y:-1}

    currentPosition = FindPosition('S')
    goalPosition = FindPosition('G')
    
    code = "(async () => { " + code + "})();"

    const  x = await eval(code)

    if(currentPosition.x == goalPosition.x && currentPosition.y == goalPosition.y && currentPosition.result != "Fail")
    {
        console.log("success")
    }
    else
    {
        console.log("fail")
    }
}

//Simulate run, jump. Check block by wall or falling to floor
async function CheckRun(currentPosition, mapColumnSize, mapRowSize)
{
    if(currentPosition.result != "Fail")
    {
        CheckMoveFront(currentPosition, mapRowSize,1)
        CheckFall(currentPosition, mapColumnSize)
    }
}

async function CheckJump(currentPosition, mapColumnSize, mapRowSize)
{
    if(currentPosition.result != "Fail")
    {
        CheckMoveFront(currentPosition, mapRowSize,2)
        CheckFall(currentPosition, mapColumnSize)
    }
}

//Check block by wall. If not block by wall, move front
function CheckMoveFront(currentPosition, mapRowSize, moveAmount)
{
    var isBlock = false
    for(var i = 1; i<=moveAmount; i++)
    {
        if(mapRowSize > currentPosition.x + i)
        {
            if(mapData[currentLevel][currentPosition.y][currentPosition.x+i] == "F")
                isBlock = true;

            if(currentPosition.y != 0)
            {
                if(mapData[currentLevel][currentPosition.y-1][currentPosition.x+i] == "F")
                    isBlock = true;
            }
        }
    }

    if(isBlock)
        currentPosition.result = "Fail"
    else   
        currentPosition.x += moveAmount
}

//Check falling state to prevent simulator move in the air
function CheckFall(currentPosition, mapColumnSize)
{
    var isFloor = false
    for(var i = currentPosition.y; i < mapColumnSize-1;i++)
    {
        if(mapData[currentLevel][i+1][currentPosition.x] == "F")
        {
            currentPosition.y = i
            isFloor = true
            break;
        }
    }

    if(!isFloor)
    {
        currentPosition.result = "Fail"
    }
}





//TODO : DELETE
document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '37') {
        // left arrow
        console.log("left")
        camera.Move(-100,0,backgroundObjects)
    }
    else if (e.keyCode == '39') {
        // right arrow
        console.log("right")
        camera.Move(100,0,backgroundObjects)
    }
    else if (e.keyCode == '38') {
        // left arrow
        console.log("up")
        camera.Move(0,-100,backgroundObjects)
    }
    else if (e.keyCode == '40') {
        // right arrow
        console.log("down")
        camera.Move(0,100,backgroundObjects)
    }
    else if (e.keyCode == '81') {
        // right arrow
        console.log("Run")
        player.currentState = "Running"
        Run()
    }
    else if (e.keyCode == '87') {
        // right arrow
        console.log("right")
        player.currentState = "Idle"
    }
    else if (e.keyCode == '69') {
        // right arrow
        console.log("right")
        player.currentState = "Jump"
    }
    else if (e.keyCode == '82') {
        // right arrow
        console.log("right")
        player.currentState = "Defeat"
    }
    else if (e.keyCode == '84') {
        // right arrow
        console.log("right")
        player.currentState = "Victory"
    }
}
