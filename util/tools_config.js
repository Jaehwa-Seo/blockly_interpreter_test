var config_file = "config/config.js"
var config_db_file = "config/config_db.js"

const config = require("../" + config_file);
const config_db = require("../" + config_db_file);

const get_server_port = function() {
    return process.env.PORT || config.port;
}

const get_db_uri = function() {
    return config_db.db_uri;
}

const get_default_3d_model = function() {
    return config.default_3d_model;
}

module.exports = {
    // 
    get_server_port,
    get_db_uri,
    get_default_3d_model,
    // 
}

