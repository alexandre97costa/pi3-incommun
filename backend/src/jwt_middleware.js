const jwt = require('jsonwebtoken');
const config = require('./config.js');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
    
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length); //remove a palavra 'Bearer '
        }
        if (token) {
            jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'O token não é válido.'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.json({
                success: false,
                message: 'Token indisponível.'
            });
        }
    }
}

