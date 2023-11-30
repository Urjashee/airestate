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
export const updateProperty = async (req, res, next) => {
    const listing = await Property.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only update your own listings!'));
    }

    try {
        const updatedListing = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};
export const getPropertyById = async (req, res, next) => {
    try {
        const listing = await Property.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};
export const getProperties = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;

        if(offer === undefined || offer === 'false')
            offer = { $in: [false, true]} //search inside a db both true and false id offer is not selected

        let furnished = req.query.furnished;

        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;

        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;

        if (type === undefined || type === 'all') {
            type = { $in: ['homestay', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const listings = await Property.find({
            name: { $regex: searchTerm, $options: 'i' }, //i don't care about lower or upper case
            offer,
            furnished,
            parking,
            type,
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(listings);

    } catch (error) {
        next(error);
    }
};