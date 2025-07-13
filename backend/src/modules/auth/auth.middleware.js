import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../../shared/constants/index.js";

export const auth = async (req, res, next) => {
    const token = (req.cookies?.token)?.replace(/Bearer\s?/, '');
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.userId = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            message: "No access"
        });
    }
};
