import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { NextFunction } from "express";
const checkAuht = async (req: any, res: any, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      req.user = await User.findById(decoded.id).select(
        "-password -confirmated -token -createdAt -updatedAt -__v "
      );

      return next();
    } catch (error) {
      return res.status(404).json({ msg: "There was an error" });
    }
  }
  if (!token) {
    const error = new Error("Invalid Token");
    return res.status(401).json({ msg: error.message });
  }
  next();
};

export default checkAuht;
