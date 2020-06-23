const db = require('../db');
const bcrypt = require('bcrypt');

function registerUser(user) {
    return db('users')
        .insert({username: user.username, password: bcrypt.hashSync(user.password, 14)})
}

function login(user){

}

// this is just a test method to get all of the users in the database
function getUsers(){
    return db('users');
}

function getUserByName(username){
    return db('users').first().where('username', '=', username);
}

function getSavedSongs(){
    return db('saved_songs');
}

module.exports = {
    registerUser,
    login,
    getUsers,
    getSavedSongs,
    getUserByName
}