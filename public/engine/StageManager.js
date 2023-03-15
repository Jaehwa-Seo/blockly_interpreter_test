var levelsCameraMoveQueue = [
    [{x:0,y:0}],
    [{x:0,y:0}],
    [{x:0,y:0}],
    [{x:0,y:0}],
    [{x:1160,y:0},{x:0,y:0}],
    [{x:0,y:0}],
    [{x:1900,y:0},{x:0,y:0}],
    [{x:3580,y:0},{x:0,y:0}],
    [{x:1500,y:0},{x:0,y:0},{x:0,y:-1000}],
    [{x:3600,y:0},{x:0,y:0},{x:0,y:-800}],
]

let levelsbackground = 
[
    {
        x:0,
        y:0,
        image : backgroundhouseImage
    },
    {
        x:-400,
        y:0,
        image : backgroundparkImage
    },
    {
        x:-400,
        y:0,
        image : backgroundparkImage
    },
    {
        x:0,
        y:0,
        image : backgroundcityImage
    },
    {
        x:0,
        y:0,
        image : backgroundcityImage
    },
    {
        x:0,
        y:0,
        image : backgrounddesertImage
    },
    {
        x:0,
        y:0,
        image : backgroundiceImage
    },
    {
        x:0,
        y:0,
        image : backgroundiceImage
    },
    {
        x:0,
        y:-1000,
        image : backgroundice2Image
    },
    {
        x:-1700,
        y:0,
        image : backgroundparkImage
    },
]

let levelsPlatformSprites = [
    [platformblockHouse],
    [platformblockCity],
    [platformblockPark],
    [platformblockCity],
    [platformblockCity],
    [platformblockDesert],
    [platformblockIce],
    [platformblockIce],
    [platformblockIce],
    [platformblockCity],
]

var levelsPlayerAnimationList = [
    ["Idle","Running","Defeat","Victory"],
    ["Idle","Running","Defeat","Victory"],
    ["Idle","Jump","Defeat","Victory"],
    ["Idle","Running","Jump","Defeat","Victory"],
    ["Idle","Running","Jump","Defeat","Victory"],
    ["Idle","Running","Defeat","Victory"],
    ["Idle","Running","Jump","Defeat","Victory"],
    ["Idle","Running","Jump","Defeat","Victory"],
    ["Idle","Running","Jump","Defeat","Victory"],
    ["Idle","Running","Jump","Defeat","Victory"],
]

var goalPosition = {x:-1,y:-1}
var startPosition = {x:-1,y:-1}
var mapColumnSize
var mapRowSize

var mapData =  {
    level_1 : [
        ['S', 'G', ' '],
        ['F', 'F', 'F']
    ],
    level_2 : [
        ['S', ' ', ' ', 'G'],
        ['F', 'F', 'F', 'F']
    ],
    level_3 : [
        ['S', ' ', ' ', ' ', 'G', ' '],
        ['F', ' ', 'F', ' ', 'F', 'F']
    ],
    level_4 : [
        ['S', ' ', ' ', 'G', ' '],
        ['F', 'F', ' ', 'F', 'F']
    ],
    level_5 : [
        ['S', ' ', ' ', ' ', ' ', ' ', 'G', ' '],
        ['F', 'F', ' ', 'F', 'F', ' ', 'F', 'F']
    ],
    level_6 : [
        ['S', ' ', ' ', ' ', ' ', 'G', ' '],
        ['F', 'F', 'F', 'F', 'F', 'F', 'F']
    ],
    level_7 : [
        ['S', ' ', ' ', ' ', ' ', ' ', 'G', ' '],
        ['F', 'F', ' ', 'F', 'F', ' ', 'F', 'F']
    ],
    level_8 : [
        ['S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' '],
        ['F', ' ', 'F', 'F', ' ', 'F', 'F', ' ', 'F', 'F', ' ', 'F', 'F', 'F']
    ],
    level_9 : [
        ['S', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['F', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', 'G', ' '],
        [' ', 'F', 'F', 'F', 'F', ' ', 'F', 'F'],
    ],
    level_10 : [
        ['S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['F', ' ', 'F', ' ', 'F', ' ', 'F', ' ', 'F', ' ', 'F'],
        [' ', ' ', ' ', 'F', ' ', ' ', ' ', ' ', 'F', ' ', 'F'],
        ['F', ' ', 'F', ' ', ' ', ' ', 'F', ' ', ' ', 'G', 'F'],
        ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
    ],
}  

function FindPosition(character)
{
    for(var i = 0;i<mapColumnSize;i++)
    {
        var index = mapData[currentLevel][i].findIndex((e) => e == character)

        if(index != -1)
        {
            return currentPosition = {x:index,y:i}
        }
    }
}

function SetMapSize()
{
    mapColumnSize = mapData[currentLevel].length
    mapRowSize = mapData[currentLevel][0].length
}

function SetStartPosition()
{
    var mapIndex = FindPosition('S')

    var startX = 600 + (mapIndex.x * 500) 
    var startY = 1650 - (500 * (mapColumnSize - mapIndex.y - 1))

    startPosition = {x : startX * screenRatio, y : startY * screenRatio}
}

function SetGoalPosition()
{
    var mapIndex = FindPosition('G')

    var goalX = 600 + (mapIndex.x * 500) 
    var goalY = 1650 - (500 * (mapColumnSize - mapIndex.y - 1))

    goalPosition = {x : goalX * screenRatio, y : goalY * screenRatio}
}

function SetPlatform()
{
    for(var i = 0; i < mapColumnSize; i++)
    {
        for(var j = 0; j < mapRowSize; j++)
        {
            if(mapData[currentLevel][i][j] == "F")
            {
                var x = 500 + (j * 500) 
                var y = 1805 - (500 * (mapColumnSize - i - 1))

                platforms.push(new Platform({
                    x:x,
                    y:y,
                    image: platformImage[0],
                    }))
        
            }
        }
    }
}

SetMapSize()
SetStartPosition()
SetGoalPosition()
