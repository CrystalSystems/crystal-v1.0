import express from "express";
import {
  // -- reCAPTCHA v3 
  // reCaptchaV3,
  // -- /reCAPTCHA v3
  upload,
  multerErrorMessages
} from "../utils/index.js";
import {
  handleValidationErrors,
  registrationValidation,
  logInValidation,
} from "../validations/index.js";
import {
  authorizationCheck,
  checkingAccessToUserEdit
} from "../access-check/index.js";
import { userController } from "../controllers/index.js";

const router = express.Router();

// registration
router.post(
  "/registration",
  // -- reCAPTCHA v3
  // reCaptchaV3,
  // -- /reCAPTCHA v3
  registrationValidation,
  handleValidationErrors,
  userController.registration
);
// /registration

// log In
router.post(
  "/login",
  logInValidation,
  handleValidationErrors,
  userController.logIn,
);
// /log In  

// log Out
router.post(
  "/logout",
  userController.logOut,
);
// /log Out

// authorization
router.get("/authorization",
  authorizationCheck,
  userController.authorization);
// /authorization

// get one user, from user edit page 
router.get("/get/one/from/user/edit/page/:userId",
  authorizationCheck,
  checkingAccessToUserEdit,
  userController.getOneUserFromUserEditPage);
// /get one user, from user edit page

// get one user
router.get("/get/one/:userId", userController.getOneUser);
// /get one user

//  add a user images
router.post("/add/image/:userId",
  authorizationCheck,
  checkingAccessToUserEdit,
  upload.single("image"),
  multerErrorMessages,
  async (req, res) => {
    res.json({
      imageUrl: `/uploads/users/images/${req.file?.filename}`
    });
  });
//  /add a user images

// edit user
router.patch(
  "/edit/:userId",
  authorizationCheck,
  checkingAccessToUserEdit,
  userController.editUser
);
// /edit user

// change user password
router.post(
  "/change/password/:userId",
  authorizationCheck,
  checkingAccessToUserEdit,
  userController.changeUserPassword
);
// /change user password

// delete user account
router.delete("/delete/account/:userId",
  authorizationCheck,
  checkingAccessToUserEdit,
  userController.deleteUserAccount);
// /delete user account

// get all users
router.get("/get/all", userController.getAllUsers);
// /get all users

export const userRoutes = router
