import {verifyToken, userData} from "../utils/tokenHandler.js";
import Property from "../models/property.model.js";
import {errorHandler} from "../utils/error.js";
export const createProperty = async (req, res, next) => {
    try {
        const estate = await Property.create(req.body);
        return res.status(201).json(estate);
    } catch (e) {
        next(e)
    }
}

export const getUserListing = async (req, res, next) => {
    try {
        const listings = await Property.find({ userRef: userData.id})
        res.status(200).json(listings)
    } catch (error) {
        next(error)
    }
}
export const deleteProperty = async (req, res, next) => {
    const listing = await Property.findById(req.params.id)
    if (!listing) {
        return next(errorHandler(404, 'Property not found'))
    }
    if (userData.id !== listing.userRef) {
        return next(errorHandler(404, 'You can delete only your own property'))
    }
    try {
        await Property.findByIdAndDelete(req.params.id)
        res.status(200).json("Property deleted")
    } catch (error) {
        next(error)
    }
}