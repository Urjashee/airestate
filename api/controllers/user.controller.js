import {verifyToken, userData} from "../utils/tokenHandler.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Property from "../models/property.model.js";
import {errorHandler} from "../utils/error.js";

export const test = (req, res) => {
    res.json({
        "message": "API test route"
    })
}

export const updateUser = async (req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(
            userData.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                }
            }, {new: true}
        );
        const{ password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(userData.id)
        res.clearCookie('access_token')
        res.status(200).json('User has been deleted')
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) return next(errorHandler(404, 'User not found!'));

        const { password: pass, ...rest } = user._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};