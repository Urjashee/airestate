import express from "express";
import {signin, signup, google, signOut} from "../controllers/auth.controller.js";
import {verifyToken} from "../utils/tokenHandler.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', google);
router.get('/signout', verifyToken, signOut);

export { router as authRouter };