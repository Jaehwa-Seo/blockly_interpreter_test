
const iframe_result = document.getElementById("iframe_result");
const iframe_result_code = iframe_result.contentWindow;
const run_button = document.getElementById("run_button");
const reset_button = document.getElementById("reset_button");
const next_button = document.getElementById("clear_bottom_div_next_button");
const clear_time_text = document.getElementById("clear_time_text");
const clear_div = document.getElementById("clear_div");


const myMainWorkSpace = Blockly.getMainWorkspace();

function run_code() {
    run_button.disabled = true;
    reset_button.disabled = true;

    var simulation_code = make_simulation_code_code()
    
    // trace the executing block.
    Blockly.JavaScript.addReservedWords('highlightBlock');
    Blockly.JavaScript.STATEMENT_PREFIX = 'await highlightBlock(%1);\n';

    var my_code = Blockly.JavaScript.workspaceToCode(myMainWorkSpace);

    window.onbeforeunload=function(){return ""};

    iframe_result_code.run_code(simulation_code, my_code, function(err, is_success) {
        // console.log("ENTER IN CALLBACK");
        window.onbeforeunload=function(){null};
        Blockly.JavaScript.STATEMENT_PREFIX = '';

        if (err) {
            // document.body.style.backgroundColor = "#FF0000";
        } else {
            // unhighlight the last executed block.
            if (Blockly.mainWorkspace.highlightedBlocks_.length > 0) {
                Blockly.mainWorkspace.highlightedBlocks_[0].setHighlighted(false);
            }
            if (is_success) {
                // document.body.style.backgroundColor = "#00BFFF";
                resultTime = iframe_result_code.TimeCalculator();
                resultTime_text = resultTime["minute"] + Blockly.Msg["CLEAR_MINUTE"] + " " + resultTime["second"] + Blockly.Msg["CLEAR_SECOND"];
                
                clear_time_text.textContent = resultTime_text;
                onWin();
            } else {
                run_button.disabled = false;
                reset_button.disabled = false;
                // document.body.style.backgroundColor = "#D2691E";
            }
        }
    })
}

function reset() {
    // run_button.disabled = true    
    
    iframe_result_code.CheckReady(function(is_success) {
    //     // run_button.disabled = false
    });
}

function retry() {
    iframe_result_code.ResetTime();
    clear_div.style.display = "none";
}

function onWin() {
    if (level < max_level) {
        setTimeout(() => {
            clear_div.style.display = "block";

            const next_level_button = document.getElementById("next_level_button");
            next_level_button.style.display = "inline-block";
            // next_level_button.textContent = "Next level (" + (level + 1) + ")";
            next_level_button.textContent = Blockly.Msg["NEXT_LEVEL_BTN_PART1"] + (level + 1) + Blockly.Msg["NEXT_LEVEL_BTN_PART2"];
            next_level_button.onclick = function () {
                location.href = "/level_" + (level + 1);
            };;
            next_button.onclick = function () {
                location.href = "/level_" + (level + 1);
            };;

            run_button.disabled = false;
            reset_button.disabled = false;
        }, 3000);
    } else {
        // next_level_button.textContent = "Success";
        run_button.disabled = false;
        reset_button.disabled = false;
        if (typeof displayFinalVictory !== 'undefined' && typeof displayFinalVictory === 'function') {
            // displayFinalVictory();
            setTimeout(displayFinalVictory, 2000);
        } else {
            alert("Game completed")
        }
    }
}

function getNumberOfBlocks() {
    return Blockly.mainWorkspace.getAllBlocks().length;
}

const block_left_p = document.getElementById("block_left_p");
function updateNumberBlockLeft(){

    if (typeof max_blocks !== "undefined" && max_blocks) {
        block_left_p.textContent = Blockly.Msg["BLOCK_LEFT"] + (max_blocks - getNumberOfBlocks()) + "/" + max_blocks;
        
    }

}


function set_iframe_events(disable_btn_event, enable_btn_event) {  
    iframe_result_code.set_events(disable_btn_event, enable_btn_event);
    // iframe_result_code.set_func2();
}




// setTimeout(function() {
//     set_func(disable_btns);
// }, 2000);

// function checkIframeLoaded() {
//     // Get a handle to the iframe element
//     // var iframe = document.getElementById('i_frame');
//     // var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

//     // Check if loading is complete
//     console.log(iframe_result.readyState);
//     if (  iframe_result_code.readyState  == 'complete' ) {
//         //iframe.contentWindow.alert("Hello");
//         iframe_result.contentWindow.onload = function(){
//             alert("I am loaded");
//         };
//         // The loading is complete, call the function we want executed once the iframe is loaded
//         afterLoading();
//         return;
//     } 

//     // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
//     window.setTimeout(checkIframeLoaded, 100);
// }

// checkIframeLoaded();


const disable_btns = function() {
    run_button.disabled = true;
    reset_button.disabled = true;
}

const enable_btns = function() {
    // console.log("enable_btns");
    run_button.disabled = false;
    reset_button.disabled = false;
}

function frameload() {
    set_iframe_events(disable_btns, enable_btns);
    // if (are_buttons_disable) {
    //     disable_btns();
    // } else {
    //     enable_btns();
    // }
}

disable_btns();



function get_element_location(elt) {
    
    var rect = elt.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left,rect.x , rect.y, rect.width, rect.height);
    return {a: rect.top, b: rect.right, c: rect.bottom, d:rect.left};
}

function display_tutorial_canvas() {
    var tutorial_canv = document.createElement('canvas');
    // tutorial_canv = document.createElement('p');
    // tutorial_canv.id = 'victory_canvas';

    const _innerWidth = window.innerWidth;
    const _innerHeight = window.innerHeight;

    tutorial_canv.width = _innerWidth;
    tutorial_canv.height = _innerHeight;

    // tutorial_canv.style.backgroundColor = "#0000FF";
    tutorial_canv.style.position = 'absolute';
    tutorial_canv.style.left = '0px';
    tutorial_canv.style.top = '0px';
    tutorial_canv.style.zIndex = "2";
    tutorial_canv.style.pointerEvents = "none";

    ctx = tutorial_canv.getContext("2d");


    const elt = document.getElementById("testdiv1");
    // var a, b, c, d;
    var {a, b, c, d} = get_element_location(elt);


    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.fillRect(0,0,d,_innerHeight);
    ctx.fillRect(b,0,_innerWidth,_innerHeight);
    ctx.fillRect(d,0,b-d,a);
    ctx.fillRect(d,c,b-d,_innerHeight);

    document.body.appendChild(tutorial_canv);

}

// Convert code to simulation code
function make_simulation_code_code() {
    var code = Blockly.JavaScript.workspaceToCode(myMainWorkSpace)

    code = code.replaceAll("/*_*/if (! await /*_*/",'')
    code = code.replaceAll("/*_*/) { return;}/*_*//*_;_*/",'')

    code = code.replaceAll("Run()","CheckRun(currentPosition, mapColumnSize, mapRowSize)")
    code = code.replaceAll("Jump()","CheckJump(currentPosition, mapColumnSize, mapRowSize)")

    return code
}


// function display_javascript() {
//     if (code_info_div.style.display === "none") {
//         code_info_div.style.display = "";
//         var my_code = Blockly.JavaScript.workspaceToCode(myMainWorkSpace);
//         var clean_code = "";
//         var arr = my_code.split("/*_*/");
//         for (var i = 0; i < arr.length; i++)
//         {
//             console.log(arr[i]);
//             if (i % 2 == 0) {
//                 clean_code += arr[i];
//             }
//         }
//         clean_code = clean_code.replaceAll("/*_;_*/", ";\n");
//         // alert(clean_code);
//         var code_info_content = document.getElementById("code_info_content");
//         code_info_content.textContent = clean_code;
//     } else {
//         code_info_div.style.display = "none";
//     }
// }


// setTimeout(function() {

// display_tutorial_canvas();
// }, 1000);
