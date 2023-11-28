import {verifyToken, userData} from "../utils/tokenHandler.js";
import Property from "../models/property.model.js";
export const createProperty = async (req, res, next) => {
  try {
      const estate = await Property.create(req.body);
      return res.status(201).json(estate);
  } catch (e) {
      next(e)
  }
}