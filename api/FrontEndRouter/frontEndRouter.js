const express = require('express');

const frontEndRouter = express.Router();

const dbHelpers = require('../../DB/DBhelpers');

frontEndRouter.post('/register', (req, res) => {
    const credentials = req.body;

    if (credentials.username && credentials.password){
        dbHelpers.registerUser({username: credentials.username, password: credentials.password})
            .then(response => {
                res.status(201).json({success: `The user was successfully added! ${response}`})
            })
            .catch(err => {
                res.status(500).json({errorMessage: `There was an error with saving that user to the database: ${err}`});
            })
    } else {
        res.status(400).json({invalidCredentials: "Please provide a username and password for the new user"});
    }
});

frontEndRouter.post('/login', (req, res) => {

});

frontEndRouter.get('/savedsongs/:username', (req, res) => {

});

frontEndRouter.post('/similarsongs', (req, res) => {
    
});

// This is just a test method to check the users table, need to get rid of this after the site is live
frontEndRouter.get('/users', (req, res) => {
    dbHelpers.getUsers()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({errorMessage: `There was an error with retrieving the users from the database ${err}`});
        });
});

// This is just a test method to get all of the saved songs in the database, need to get rid of this after the site is live
frontEndRouter.get('/savedsongs', (req, res) => {
    dbHelpers.getSavedSongs()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({errorMessage: "There was an error with retriving that information from the database"});
        })
});

module.exports = frontEndRouter;