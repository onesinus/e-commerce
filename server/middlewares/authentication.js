const jwt       = require('jsonwebtoken');
function authenticated(req, res, next){
    try {
        const token = req.headers.accesstoken;
        const user = jwt.verify(token, process.env.jwt_key);
        req.user = user;
        next();
    } catch (error) {
        next({
            statusCode: 401,
            message: error
        });
    }
}

module.exports = authenticated