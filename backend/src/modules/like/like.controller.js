import { UserModel } from "../user/index.js";
import { PostModel } from "../post/index.js";
import {
    handleServerError
} from "../../shared/helpers/index.js";

export const getUserLikedPosts = async (req, res) => {
    const userId = await UserModel.findOne({ customId: req.params.userId }).collation({ locale: "en", strength: 2 });
    if (!userId) {
        return res.status(404).json({
            message: "User is not found",
        });
    }
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const offset = (page - 1) * limit;
        const result = await PostModel.find({ "liked": userId._id.toString() }).sort({ createdAt: -1 }).populate({ path: "user", select: ["name", "customId", 'aboutMe', "creator", "avatarUrl", "createdAt", "updatedAt"] }).skip(offset).limit(limit).exec();
        return res.json(result);
    } catch (error) {
        handleServerError(res, error);
    }
}