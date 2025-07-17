import { PostModel } from "../../../modules/post/index.js";
import { UserModel } from "../../../modules/user/index.js";
import { handleServerError } from "../../../shared/helpers/index.js";

// can update user
export const canUpdateUser = async (req, res, next) => {
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
        handleServerError(res, error, "canUpdateUser middleware");
    }
};
// /can update user

// can update post
export const canUpdatePost = async (req, res, next) => {
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
        handleServerError(res, error, "canUpdatePost middleware");
    }
};
// /can update post

// can view liked posts
export const canViewLikedPosts = async (req, res, next) => {
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
        handleServerError(res, error, "canViewLikedPosts middleware");
    }
};
// /can view liked posts
