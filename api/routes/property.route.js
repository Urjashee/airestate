import express from "express";
import {verifyToken} from "../utils/tokenHandler.js";
import {createProperty} from "../controllers/property.controller.js";

const router = express.Router();

router.post('/create', verifyToken, createProperty)

export { router as estateRouter };