const express = require('express');
const session = require('express-session');
const sessionConfig = require('../utility/sessionsConfig');

const frontEndRouter = require('./FrontEndRouter/frontEndRouter');
const DSRouter = require('./DSRouter/dsRouter');

const server = express();

// middleware
server.use(express.json());
server.use(session(sessionConfig));

// routers
server.use('/api/frontend', frontEndRouter);
server.use('/api/DS', DSRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: "running!"});
});

module.exports = server;