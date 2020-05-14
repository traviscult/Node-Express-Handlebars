const express = require("express");

const router = express.Router();

// Import the model (burgers.js) to use its database functions.
const burgers = require("../models/burger.js");


//need to create router functions

// Export routes for server.js to use.
module.exports = router;