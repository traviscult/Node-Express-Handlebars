const express = require("express");

const router = express.Router();

// Import the model (burgers.js) to use its database functions.
const burgers = require("../models/burger.js");

router.get("/", (req,res) => {
    console.log("Router.Get is being called")
    burgers.selectAll((data) =>{
    //    const hbsobj = {
    //        burgers: data
    //    };
    //    console.log(hbsobj.burgers)
       res.render("index", {burger_data: data}) 
    });
});

router.post("/api/burgers", (req,res) => {
    console.log("router.post is being called")
    burgers.insertOne(req.body.burger_name, (result) => {
        console.log(result)
        res.redirect("/")
    })   
})

// Export routes for server.js to use.
module.exports = router;