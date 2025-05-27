import { UserModel } from "../models/index.js";
export async function checkingAccessToUserEdit(req, res, next) {
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