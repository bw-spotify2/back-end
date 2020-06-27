const session = require('express-session');

const sessionConfig = {
    name: 'spotifysession',
    secret: 'for your eyes only',
    cookie: {
        maxAge: (1 * 60 * 60 * 1000),
        secure: false, // need to change to true after development
        sameSite: "lax",
    },
    httpOnly: true, // no js allowed to read
    resave: false,
    saveUnitialized: false, // legal stuff
};

module.exports = sessionConfig;