const express = require("express");

const router = express.Router();

// Import the model (burgers.js) to use its database functions.
const burgers = require("../models/burger.js");

router.get("/", (req,res) => {
    console.log("Router.Get is being called")
    burgers.selectAll((data) =>{
       const hbsobj = {
           burgers: data
       };
       console.log(hbsobj)
       res.render("index", hbsobj) 
    });
});
//need to create router functions

// Export routes for server.js to use.
module.exports = router;