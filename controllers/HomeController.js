const system = require('system-commands');
var block_level = require("../util/block_level");
var tools_studio_manager = require("../util/tools_studio_manager");

const block_list = block_level.block_list;

const home = function(req, res) {
    res.render("blockly_interpreter_test",{});
}

const test = function(req, res) {
    res.render("blockly_test",{});
}


 const coding = function(req, res) {
    const content = {
        "level": 8,
        "max_level": 8,
        "block_list": block_list[8],
    }

    res.render("coding",{"content": content});
 }

 const engine = function(req, res, next)  {
    // const studiomanager_id = "jaehwa"; //FIXME
    // tools_studio_manager.get_3d_model(studiomanager_id, function(is_success, err, _3d_model){
    //     if (is_success) {
    const content = {
        "level": 8,
    }

    res.render("engine",{"content": content});                
    //     } else {
    //         res.redirect('/404');
    //     }
    // });
}
  
 module.exports = {
     home,
     test,
     coding,
     engine,
 }