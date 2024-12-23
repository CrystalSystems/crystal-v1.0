import UserModel from "../models/User.js";
export default async (req, res, next) => {
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
    res.status(500).json({ message: error.message });
  }
};