import express from "express";
import {verifyToken} from "../utils/tokenHandler.js";
import {createProperty, getUserListing, deleteProperty, updateProperty, getPropertyById} from "../controllers/property.controller.js";

const router = express.Router();

router.post('/create', verifyToken, createProperty)
router.get('/getByUser', verifyToken, getUserListing)
router.delete('/delete/:id', verifyToken, deleteProperty)
router.post('/update/:id', verifyToken, updateProperty)
router.get('/get/:id', getPropertyById)

export { router as estateRouter };