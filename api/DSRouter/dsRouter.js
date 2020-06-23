const express = require('express');

const dsRouter = express.Router();

// This is where DS will send the json array of 5 spotify song ids
dsRouter.post('/similarsongs', (req, res) => {

});

module.exports = dsRouter;