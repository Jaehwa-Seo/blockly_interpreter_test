var ratio = 2

var screenWidth = 1024 * ratio
var screenHeight = 576 * ratio

var screenRatio = screenWidth / 4096;

var currentLevel = "level_" + (level + 1)

function SetCanvasRatio() {
    if(screenWidth/screenHeight < window.innerWidth / window.innerHeight)
    {
        canvas.style.height = window.innerHeight + "px"
        canvas.style.width = ""
    }
    else
    {
        canvas.style.width = window.innerWidth + "px"
        canvas.style.height = ""
    }
}

function SetLoadingScreen() {
    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width,canvas.height)
    c.fillStyle = "black";
    c.textBaseLine = 'middle'
    c.textAlign = 'center'
    c.font = fontSize + "px Pacifico";
    c.fillText("Loading....", canvas.width/2,canvas.height/2);
}

function CreateImage(imageSrc,checkobj) {
    const image = new Image()
    image.src = imageSrc
    image.onload = function()
    {
        //TODO : DELETE
        console.log("image "+image.src + " complete");
        checkobj.count++
    }
    
    return image
}

function sleep(ms) {   
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function CopyPositionQueue(obj)
{
    var clone = [];


    for(var key in obj)
    {
        clone.push({
            x:obj[key].x,
            y:obj[key].y,
        })
    }
    return clone
}

async function WaitAnimation() {
    while(player.position.x < targetX)
    {
        await sleep(1)
    }
    player.position.x = targetX
}

async function CheckFalling() {

    // Pre calculate how take time in falling
    var isFalling = true
    
    var playerFeetPosition = Math.round(player.position.y + player.height)
    
    platforms.forEach((platform) => {
        if(playerFeetPosition === platform.position.y - (5 * screenRatio) && 
        platform.position.x + (blockSize/5 * screenRatio) === player.position.x)
        {
            isFalling = false
        }
    })

    var isFail = false
    if(isFalling)
    {    
        player.lastState = player.currentState
        player.currentState = 'Idle'
        player.sprites["Idle"].frames = 0

        await sleep(500)
        while(player.velocity.y != 0)
        {
            await sleep(1)
            if(player.position.y > (2650 * screenRatio))
            {
                isFail = true
                break
            }
        }
        await sleep(500)
    }
    return isFail
}


function TimeCalculator()
{
    var timeResult = Date.now() - currentTime;

    var timeSecond = timeResult / 1000

    timeSecond = Math.round(timeSecond)

    var timeMinute = parseInt(timeSecond / 60)

    timeSecond = timeSecond % 60

    return {"minute":timeMinute,"second":timeSecond}
}

function ResetTime()
{
    currentTime = Date.now();
}



var is_disable_btn = true;
var is_first_camera_animation = false;

var enable_btn_event = undefined;
var disable_btn_event = undefined;

function set_events(_disable_btn_event, _enable_btn_event) {
    disable_btn_event = _disable_btn_event;
    enable_btn_event = _enable_btn_event;
    
    if (is_disable_btn) {
        _disable_btn_event();
    } else {
        _enable_btn_event();
    }
}

function disable_btn() {
    is_disable_btn = true;
    if (disable_btn_event !== undefined) {
        disable_btn_event();
    // } else {
        // document.body.style.backgroundColor = "#FF0000";
    }
}

function EnableButton() {
    is_disable_btn = false;
    if (enable_btn_event !== undefined) {
        enable_btn_event();
    // } else {
        // document.body.style.backgroundColor = "#FF0000";
    }
}
