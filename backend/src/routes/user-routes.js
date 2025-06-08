import express from "express";
import { userController } from "../controllers/index.js";
import { accessCheck } from "../access-check/index.js";
import { validation } from "../validation/index.js";
import {
  // -- reCAPTCHA v3 
  // reCaptchaV3,
  // -- /reCAPTCHA v3
  multer
} from "../utils/index.js";

const router = express.Router();

// registration
router.post(
  "/registration",
  // -- reCAPTCHA v3
  // reCaptchaV3,
  // -- /reCAPTCHA v3
  validation.registration,
  validation.errors,
  userController.registration
);
// /registration

// log in
router.post(
  "/login",
  validation.logIn,
  validation.errors,
  userController.logIn,
);
// /log in  

// log out
router.post(
  "/logout",
  userController.logOut,
);
// /log out

// authorization
router.get("/authorization",
  accessCheck.authorization,
  userController.authorization);
// /authorization

// get one user, from user edit page 
router.get("/get/one/from/user/edit/page/:userId",
  accessCheck.authorization,
  accessCheck.toUserEdit,
  userController.getOneUserFromUserEditPage);
// /get one user, from user edit page

// get one user
router.get("/get/one/:userId", userController.getOneUser);
// /get one user

//  add a user images
router.post("/add/image/:userId",
  accessCheck.authorization,
  accessCheck.toUserEdit,
  multer.upload.single("image"),
  multer.errors,
  async (req, res) => {
    res.json({
      imageUrl: `/uploads/users/images/${req.file?.filename}`
    });
  });
//  /add a user images

// edit user
router.patch(
  "/edit/:userId",
  accessCheck.authorization,
  accessCheck.toUserEdit,
  userController.editUser
);
// /edit user

// change user password
router.post(
  "/change/password/:userId",
  accessCheck.authorization,
  accessCheck.toUserEdit,
  userController.changeUserPassword
);
// /change user password

// delete user account
router.delete("/delete/account/:userId",
  accessCheck.authorization,
  accessCheck.toUserEdit,
  userController.deleteUserAccount);
// /delete user account

// get all users
router.get("/get/all", userController.getAllUsers);
// /get all users

export const userRoutes = router
