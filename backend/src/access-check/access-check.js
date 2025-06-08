import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../constants/index.js";
import { UserModel, PostModel } from "../models/index.js";

export const authorization = async (req, res, next) => {
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

export const toUserEdit = async (req, res, next) => {
    const authorizedUserId = req.userId?._id;
    const editableUserSearchByCustomId = await UserModel.findOne({ customId: req.params.userId, }).collation({ locale: "en", strength: 2 });
    const checkAuthorizedUser = await UserModel.findById(authorizedUserId);
    try {
        if (!editableUserSearchByCustomId) {
            return res.status(404).json({ message: "User not found" });
        }
        if ((authorizedUserId !== editableUserSearchByCustomId._id.toString()) && (checkAuthorizedUser.creator === false)) {
            return res.status(403).json({ message: "No access" });
        };
        next();
    } catch (error) {
        res.status(500).send(error);
    }
};

export const toPostEdit = async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.postId);
        const authorizedUserId = req.userId._id;
        const checkAuthorizedUser = await UserModel.findById(authorizedUserId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if ((post.user.toString() !== authorizedUserId) && (checkAuthorizedUser.creator === false)) {
            return res.status(403).json({ message: "No access" });
        }
        next();
    } catch (error) {
        res.status(500).send(error);
    }
};

export const toLikedPostsPage = async (req, res, next) => {
    const userId = await UserModel.findOne({ customId: req.params.userId }).collation({ locale: "en", strength: 2 });
    if (!userId) {
        return res.status(404).json({
            message: "User is not found",
        });
    }
    const authorizedUserId = req.userId._id;
    try {
        if (authorizedUserId !== userId._id.toString()) {
            return res.status(403).json({ message: "No access" });
        };
        next();
    } catch (error) {
        res.status(500).send(error);
    }
};

