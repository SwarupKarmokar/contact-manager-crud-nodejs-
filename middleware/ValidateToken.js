const asyncHandler = require('express-async-handler');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User not authorized");
            }
            // console.log(decoded);
            req.user = decoded.user;
            next();
        });

        if (!token) {
            res.status(401);
            throw new Error("token missing || enter token with header")
        }
    }
})

module.exports = validateToken;