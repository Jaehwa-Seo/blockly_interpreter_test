// const StudioManager = require("../models/studio_manager");
const DemoAvatar = require("../models/DemoAvatar");

const ToolsConfig = require("../util/tools_config");

const get_3d_model = function(studiomanager_id, callback) {
    // StudioManager.findOne({ 'id' :  studiomanager_id }, function(err, studio_manager) {
    //     if (err) {
    //         callback(false, err, undefined);
    //     } else {
    //         if (!studio_manager || !studio_manager._3d_model) {
    //             callback(false, "No StudioManager found.", undefined);
    //         } else {
    //             callback(true, undefined, studio_manager._3d_model);
    //         }
    //     }
    // });
    DemoAvatar.findOne({}, { '_3d_model': 1 }, function(err, doc) {
        if (doc && doc._3d_model) {
            callback(true, undefined, doc._3d_model);
        } else {
            callback(true, undefined, ToolsConfig.get_default_3d_model());
        }
    });
    // callback(true, undefined, ToolsConfig.get_default_3d_model());
}

module.exports = {    
    get_3d_model,
}
