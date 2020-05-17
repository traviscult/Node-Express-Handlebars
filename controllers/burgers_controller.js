const express = require("express");

const router = express.Router();

// Import the model (burgers.js) to use its database functions.
const burgers = require("../models/burger.js");

router.get("//", (req, res) => {
    console.log("Router.Get is being called")
    burgers.selectAll((data) => {
        const hbsObj = {
            burgers: data
        };
        console.log(hbsObj)
        res.render("index", hbsObj)
    });
});

router.post("/api/burgers", (req, res) => {
    console.log("router.post is being called")
    burgers.insertOne(req.body.burger_name, (result) => {
        console.log(result)
        res.redirect("/")
    })
})

router.put("/api/burgers/:id", (req, res) => {
    const condition = "id = " + req.params.id;

    burgers.updateOne({
        devoured: req.body.devoured
    }, condition, (result) => {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }

    });
});

// Export routes for server.js to use.
module.exports = router;