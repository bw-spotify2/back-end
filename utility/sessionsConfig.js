const session = require('express-session');

const sessionConfig = {
    name: 'spotifysession',
    secret: 'for your eyes only',
    cookie: {
        maxAge: 1000 * 60 * 60, // should be set to 1 hour
        secure: false, // need to change to true after development
    },
    httpOnly: true, // no js allowed to read
    resave: false,
    saveUnitialized: false, // legal stuff
};

module.exports = sessionConfig;