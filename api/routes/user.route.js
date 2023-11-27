import express from "express";
import {test, updateUser} from "../controllers/user.controller.js";
import {verifyToken} from "../utils/tokenHandler.js";

const router = express.Router();

router.get('/test', test)
router.post('/update', verifyToken, updateUser)

export { router as userRouter };