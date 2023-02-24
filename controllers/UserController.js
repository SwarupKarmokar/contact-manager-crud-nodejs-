const asyncHandler = require('express-async-handler');
const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// @desc: Register a user
// @route: POST /api/user/register
// @access: public

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password, confirmPassword} = req.body;

    if (!username || !email || !password || !confirmPassword) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already available");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const confirmHashPassword = await bcrypt.hash(confirmPassword, 10);

    const user = await User.create({
        username, email, password: hashPassword, confirmPassword: confirmHashPassword 
    })


    res.status(200).json({
        message: "Successfully Registered",
        data: {_id: user.id, email: user.email}
    });
})


// @desc: User Login
// @route: POST /api/user/login
// @access: public

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({email});

    // COMPARE PASSWORD WITH HASH PASSWORD 
    if (user && bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            }, process.env.SECRET_KEY, {expiresIn: '10m'}
        )
        res.status(200).json({
            accessToken
        })
    }
    else {
        res.status(401);
        throw new Error("Email || Password not valid");
    }
})


// @desc: Current user
// @route: GET /api/user/current
// @access: private

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        user: req.user
    })
})

module.exports = { registerUser, loginUser, currentUser }