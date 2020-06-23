const jwt = require('jsonwebtoken');

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, process.env.JWT_SECRET || "Testing secrets", options);
}

module.exports = generateToken;