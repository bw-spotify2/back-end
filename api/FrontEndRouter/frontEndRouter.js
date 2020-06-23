const express = require('express');

const bcrypt = require('bcrypt');

const frontEndRouter = express.Router();

const dbHelpers = require('../../DB/DBhelpers');

const generateToken = require('../../utility/generateJWT');

frontEndRouter.post('/register', (req, res) => {
    const credentials = req.body;
    if (credentials.username && credentials.password){
        dbHelpers.getUserByName(credentials.username)
        .then(response => {
            if (response){
                res.status(400).json({invalidCredentials: "That username is already taken, please provide a unique username."});
            } else {
                if (credentials.username && credentials.password){
                    dbHelpers.registerUser(credentials)
                        .then(response => {
                            res.status(201).json({success: `The user was successfully added! ${response}`})
                        })
                        .catch(err => {
                            res.status(500).json({errorMessage: `There was an error with saving that user to the database: ${err}`});
                        })
                } else {
                    res.status(400).json({invalidCredentials: "Please provide a username and password for the new user"});
                }
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: `There was an error trying to verify that a unique username was provided: ${error}`});
        });
    } else {
        res.status(400).json({errorMessage: "Please provide both a username and password for the new user you are trying to regiseter."});
    }
});

frontEndRouter.post('/login', (req, res) => {
    const credentials = req.body;

    if (credentials.username && credentials.password){
        // attempt login
        dbHelpers.getUserByName(credentials.username)
            .then(user => {
                if (!user || !bcrypt.compareSync(credentials.password, user.password)){
                    return res.status(401).json({errorMessage: ""})
                } else {
                    const token = generateToken(user);
                    req.session.user = user.username;
                    res.status(200).json({message: "You have successfully logged in, please see your token here", token: token});
                }
            })
            .catch(err => {
                res.status(500).json({errorMessage: `There was an error with trying to pull up that user from the database: ${err}`});
            });
    } else {
        res.status(400).json({invalidCredentials: "Please provide both a username and a password to login"})
    }
});

// get all saved songs for a user
frontEndRouter.get('/savedsongs/:username', (req, res) => {

});

// add a saved song to the user's list
frontEndRouter.post('/savedsongs/:username', (req, res) => {

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