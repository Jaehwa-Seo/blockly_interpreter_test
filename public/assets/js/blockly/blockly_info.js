/**
 * @license
 * 
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Example of including Blockly using the UMD bundle
 * @author samelh@google.com (Sam El-Husseini)
 */

 const code_info_div = document.getElementById("code_info_div");
 var code_info_content = document.getElementById("code_info_content");
 var workspace;
 var stepButton = document.getElementById("stepButton")

 document.addEventListener("DOMContentLoaded", function () {

    var toolbox = document.getElementById('toolbox');

    Blockly.Themes.CodingFamilyTheme = Blockly.Theme.defineTheme('codingfamilytheme', {
    'base': Blockly.Themes.Classic,
    'componentStyles': {
        'workspaceBackgroundColour': '#354649',
        // 'toolboxBackgroundColour': '#000000',
        'flyoutBackgroundColour': '#6C7A89',
        // 'scrollbarOpacity': 0.3,
    }

    });

    var workspaceInfo = {
        comments: true,
        collapse: true,
        disable: true,
        grid:
        {
            // spacing: 50,
            spacing: 25,
            // spacing: 5,
            // length: 3,
            // length: 5,
            length: 0,
            // colour: '#ccc',
            snap: true
            // snap: false
        },
        toolbox: toolbox,
        zoom:
        {
            // controls: true,
            // wheel: true,
            // startScale: 1.0,
            startScale: 1.5,
            // startScale: 2.0,
            maxScale: 4,
            minScale: 0.25,
            scaleSpeed: 1.1
        },
        theme: Blockly.Themes.CodingFamilyTheme,
    }

    if (typeof max_blocks !== "undefined" && max_blocks) {
        workspaceInfo["maxBlocks"] = max_blocks;
    }

    workspace = Blockly.inject('blocklyDiv', workspaceInfo);

    Blockly.JavaScript.STATEMENT_SUFFIX = 'highlightBlock(%1);';
    Blockly.JavaScript.addReservedWords('highlightBlock');
    
    //Load Default blocks if exists
    // if (typeof default_xml_text !== "undefined" && default_xml_text) {
    //     try {
    //         var dom = Blockly.Xml.textToDom(default_xml_text);
    //         console.log(default_xml_text)
    //         console.log(dom)
    //         console.log(workspace)
    //         Blockly.Xml.domToWorkspace(workspace, dom);
    //         // return true;
    //     } catch (e) {
    //         // return false;
    //         console.log(e);
    //     }
    // }

      Blockly.mainWorkspace.addChangeListener(onEventWorkspace);

    setButtonsTextFromLanguage();

    updateNumberBlockLeft();

    createLanguageDisplayEvents();

    createHintDisplayEvents();

});


function onEventWorkspace(event) {
    console.log(event);

//     if (event.type == Blockly.Events.BLOCK_CHANGE &&
//         event.element == 'comment' &&
//         !event.oldValue && event.newValue) {
//       alert('Congratulations on creating your first comment!')
//       workspace.removeChangeListener(onFirstComment);
//     }

    // TODO: Check only for needed event
    if (event.type == Blockly.Events.BLOCK_MOVE) {
        console.log("UPD")
        updateNumberBlockLeft();
    }
}

function setButtonsTextFromLanguage() {
    const run_button = document.getElementById("run_button");
    const reset_button = document.getElementById("reset_button");

    const clear_title = document.getElementById("clear_top_div_title");
    const clear_retry_button = document.getElementById("clear_bottom_div_retry_button");
    const clear_next_button = document.getElementById("clear_bottom_div_next_button");

    // const javascript_button = document.getElementById("javascript_button");
    // const next_level_button = document.getElementById("next_level_button");
    // 
    run_button.textContent = Blockly.Msg["EXECUTE_BTN"];
    reset_button.textContent = Blockly.Msg["RESET_BTN"];

    clear_title.textContent = Blockly.Msg["CLEAR_TITLE"];
    clear_retry_button.textContent = Blockly.Msg["CLEAR_RETRY_BTN"];
    clear_next_button.textContent = Blockly.Msg["CLEAR_NEXT_BTN"];
    // next_level_button.textContent = Blockly.Msg["NEXT_LEVEL_BTN_PART1"] + level + Blockly.Msg["NEXT_LEVEL_BTN_PART2"];
    // 

    run_button.style.display = "block";
    reset_button.style.display = "block";

    // javascript_button.textContent = Blockly.Msg["JAVASCRIPT_BTN"];
}

function createLanguageDisplayEvents() {
    // code_info_div.style.display === "none"
    code_info_div.addEventListener("click", function(e) {
        code_info_div.style.display = "none";
    });

    code_info_content.addEventListener("click", function(e) {
        // alert("DDDDD");
        e.stopPropagation();
    });
}

function createHintDisplayEvents() {
    hint_div.addEventListener("click", function(e) {
        hint_div.style.display = "none";
    });

    hint_content.addEventListener("click", function(e) {
        e.stopPropagation();
    });
}

function display_javascript() {
    if (code_info_div.style.display === "none") {
        code_info_div.style.display = "";
        var my_code = Blockly.JavaScript.workspaceToCode(myMainWorkSpace);
        // remove highlight code 
        my_code = my_code.replaceAll(/await highlightBlock(.*);\n/gi, "")
        var clean_code = "";
        var arr = my_code.split("/*_*/");
        for (var i = 0; i < arr.length; i++)
        {
            console.log(arr[i]);
            if (i % 2 == 0) {
                clean_code += arr[i];
            }
        }
        // fix: indentation
        clean_code = clean_code.replaceAll("/*_;_*/", ";");
        // alert(clean_code);
        code_info_content.textContent = clean_code;
    } else {
        code_info_div.style.display = "none";
    }
}


function display_hint(level) {
    if (hint_div.style.display === "none") {
        hint_div.style.display = "";
        hint_content.textContent = hints[level];
    } else {
        hint_div.style.display = "none";
    }
}

function initApi(interpreter, globalObject) {
    // Add an API function for the alert() block.
    var wrapper = function(text) {
        return alert(arguments.length ? text : '');
    };
    interpreter.setProperty(globalObject, 'alert',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for the prompt() block.
    wrapper = function(text) {
        return prompt(text);
    };
    interpreter.setProperty(globalObject, 'prompt',
        interpreter.createNativeFunction(wrapper));

    const wrapperRun = function() {
        return CheckMoving("Run"); 
    };
    interpreter.setProperty(globalObject, 'Run',
        interpreter.createNativeFunction(wrapperRun));

    const wrapperJump = function() {
        return CheckMoving("Jump");
    };
    interpreter.setProperty(globalObject, 'Jump',
        interpreter.createNativeFunction(wrapperJump));

    // const wrapperMove = function() {
    //         return 
    //     };
    // interpreter.setProperty(globalObject, 'CheckMoving',
    //     interpreter.createNativeFunction(wrapperMove));

    const wrapperHighlight = function(id) {
        id = String(id || '');
        return highlightBlock(id);
    };
    interpreter.setProperty(globalObject, 'highlightBlock',
    interpreter.createNativeFunction(wrapperHighlight));

   
}

let highlightPause = false;

function highlightBlock(id) {
    highlightPause = true;
    workspace.highlightBlock(id);
}

var myInterpreter;

function resetStepUi(clearOutput) {
    workspace.highlightBlock(null);
    highlightPause = false;
    myInterpreter = null;
}

function stepCode() {
  if (!myInterpreter) {

    resetStepUi(true);
    const latestCode = Blockly.JavaScript.workspaceToCode(workspace);
    console.log(latestCode)
    myInterpreter = new Interpreter(latestCode, initApi);

    SceneReset();

    setTimeout(function() {
      highlightPause = true;
      stepCode();
    }, 1);
    return;
  }

  highlightPause = false;
  let hasMoreCode;
  do {
    try {
      hasMoreCode = myInterpreter.step();
    } finally {
      if (!hasMoreCode) {
        // Program complete, no more code to execute.
        resetStepUi(false);
        // Cool down, to discourage accidentally restarting the program.
        stepButton.disabled = 'disabled';
        setTimeout(function() {
          stepButton.disabled = '';
        }, 2000);

        myInterpreter = null;
        return;
      }
    }
    // Keep executing until a highlight statement is reached,
    // or the code completes or errors.
  } while (hasMoreCode && !highlightPause);
}

function runCode() {
    if (!myInterpreter) {
  
      resetStepUi(true);
      const latestCode = Blockly.JavaScript.workspaceToCode(workspace);
      console.log(latestCode)
      myInterpreter = new Interpreter(latestCode, initApi);
  
      SceneReset();
  
      setTimeout(function() {
        highlightPause = true;
        runCode();
      }, 1);
      return;
    }
  
    highlightPause = false;
    let hasMore;
    do {
      try {
        hasMore = myInterpreter.run();
      } finally {
        if (!hasMore) {
          // Program complete, no more code to execute.
          resetStepUi(false);
          // Cool down, to discourage accidentally restarting the program.
          run_button.disabled = 'disabled';
          setTimeout(function() {
            run_button.disabled = '';
          }, 2000);
  
          myInterpreter = null;
          return;
        }
      }
      // Keep executing until a highlight statement is reached,
      // or the code completes or errors.
    } while (hasMoreCode && !highlightPause);
  }

async function SceneReset()
{
    iframe_result_code.SceneReset(false);
    await iframe_result_code.sleep(400)
}

var isMoving = true;
async function Run()
{
    isMoving = true;
    console.log("!11111111111111")
    stepButton.disabled = 'disabled';
    await iframe_result_code.Run();
    iframe_result_code.Idle();
    stepButton.disabled = '';
    isMoving = false;
}

async function Jump()
{
    isMoving = true;
    console.log("!222222222222222")
    stepButton.disabled = 'disabled';
    await iframe_result_code.Jump();
    iframe_result_code.Idle();
    stepButton.disabled = '';
    isMoving = false;
}

async function CheckMoving(actionName)
{
    if(actionName == "Run")
        await Run();
    else if(actionName == "Jump")
        await Jump();
}