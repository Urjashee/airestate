import express from "express";
import {test, updateUser, deleteUser} from "../controllers/user.controller.js";
import {verifyToken} from "../utils/tokenHandler.js";

const router = express.Router();

router.get('/test', test)
router.post('/update', verifyToken, updateUser)
router.delete('/delete', verifyToken, deleteUser)

export { router as userRouter };