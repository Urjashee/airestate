import fs from "fs";
import jwt from 'jsonwebtoken'

export const generateToken = (validUser) => {
    const privateKEY = fs.readFileSync('./private.key', 'utf8');
    const token = jwt.sign({
        id: validUser._id,
        email: validUser.email,
        username: validUser.username,
    }, privateKEY, {algorithm: 'RS256', allowInsecureKeySizes: true})
    return token;
}