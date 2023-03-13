const home = function(req, res) {
    res.json({"message": "Welcome to our Node tutorial"});
 }
  
 module.exports = {
     home,
 }