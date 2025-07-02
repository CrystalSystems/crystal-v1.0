import express from "express";
import { auth } from "../auth/index.js";
import * as controller from "./user.controller.js";
import { canUpdateUser } from "../../shared/middlewares/access/index.js";
import { multer } from "../../shared/utils/index.js";

const router = express.Router();

// get users
router.get("/",
  controller.getUsers
);

// get user
router.get("/:userId",
  controller.getUser
);

// get user, for user edit page
router.get("/:userId/edit",
  auth,
  canUpdateUser,
  controller.getUserForUserEditPage);

// upload user avatar or image
router.post("/:userId/image",
  auth,
  canUpdateUser,
  multer.upload.single("image"),
  multer.errors,
  async (req, res) => {
    res.json({
      imageUrl: `/uploads/users/images/${req.file?.filename}`
    });
  });

// update user profile
router.patch(
  "/:userId",
  auth,
  canUpdateUser,
  controller.updateUser
);

// change user password
router.post(
  "/:userId/password",
  auth,
  canUpdateUser,
  controller.changePassword
);

// delete user account
router.delete("/:userId",
  auth,
  canUpdateUser,
  controller.deleteAccount);

export default router;
