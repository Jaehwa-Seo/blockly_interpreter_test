const { app } = require("./app");

var http = require('http').Server(app);

const port = 5678;

function start_server() {    
    // [INFO] Start server
    http.listen(port, function() {
        console.log('listening on *:' + port);
    });
}

start_server();

module.exports = {
    http,
}