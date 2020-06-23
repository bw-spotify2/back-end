const db = require('../db');
const bcrypt = require('bcrypt');

function registerUser(user) {
    return db('users')
        .insert({username: user.username, password: bcrypt.hashSync(user.password, 14)});
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

function getSavedSongsByUser(userid){
    return db('saved_songs').where('user_id', '=', userid);
}

module.exports = {
    registerUser,
    getUsers,
    getSavedSongs,
    getUserByName,
    getSavedSongsByUser
}