import express from "express";
import {test, updateUser, deleteUser, getUser} from "../controllers/user.controller.js";
import {verifyToken} from "../utils/tokenHandler.js";

const router = express.Router();

router.get('/test', test)
router.post('/update', verifyToken, updateUser)
router.delete('/delete', verifyToken, deleteUser)
router.get('/:id', verifyToken, getUser)

export { router as userRouter };