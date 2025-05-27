import { UserModel, PostModel } from "../models/index.js";

export async function checkingAccessToPostEdit(req, res, next) {
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
