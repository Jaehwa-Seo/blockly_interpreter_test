require('dotenv').config();

module.exports = {
    //--------------
    db_uri: "mongodb+srv://codingfamily_process_manager:" + process.env.DB_PASSWORD + "@cluster0.9ayfy.mongodb.net/codingfamily_process?retryWrites=true&w=majority",
    // db_uri: "mongodb+srv://codingfamily_automation_manager:" + process.env.DB_PASSWORD + "@cluster0.9ayfy.mongodb.net/codingfamily_automation?retryWrites=true&w=majority",
    //--------------
    // 
}