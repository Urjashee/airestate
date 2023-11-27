import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import {generateToken} from "../utils/tokenHandler.js";


export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    try {
        await newUser.save();
        res.status(201).json('User created successfully!')

    } catch (err) {
        next(err);
    }
}
export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email})
        if (!validUser)
            return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword)
            return next(errorHandler(401, 'Wrong credentials!'));
        const token = generateToken(validUser)
        const { password: pass, ...userInfo } = validUser._doc;
        // console.log("Token - " + token)
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(userInfo);
    } catch (e) {
        next(e);
    }
}