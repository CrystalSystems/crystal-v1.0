import express from "express";
const router = express.Router();
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
  authorizationСheck,
  checkingAccessToUserEdit
} from "../accessСheck/index.js";
import { UserController } from "../controllers/index.js";
// registration
router.post(
  "/registration",
  // -- reCAPTCHA v3
  // reCaptchaV3,
  // -- /reCAPTCHA v3
  registrationValidation,
  handleValidationErrors,
  UserController.registration
);
// /registration
// log In
router.post(
  "/login",
  logInValidation,
  handleValidationErrors,
  UserController.logIn,
);
// /log In  
// log Out
router.post(
  "/logout",
  UserController.logOut,
);
// /log Out
// authorization
router.get("/authorization",
  authorizationСheck,
  UserController.authorization);
// /authorization
// get one user, from user edit page 
router.get("/user/get/one/from/user/edit/page/:userId",
  authorizationСheck,
  checkingAccessToUserEdit,
  UserController.getOneUserFromUserEditPage);
// /get one user, from user edit page 
// get one user
router.get("/user/get/one/:userId", UserController.getOneUser);
// /get one user
//  add a user images
router.post("/user/add/image/:userId",
  upload.single("image"),
  multerErrorMessages,
  async (req, res) => {
    authorizationСheck,
      checkingAccessToUserEdit
    res.json({
      // imageUrl: `/uploads/users/images/${req.file?.filename}`,
      imageUrl: `/uploads/users/images/${req.file?.filename}`
    });
  });
//  /add a user images
// edit user
router.patch(
  "/user/edit/:userId",
  authorizationСheck,
  checkingAccessToUserEdit,
  UserController.editUser
);
// /edit user
// change user password
router.post(
  "/user/change/password/:userId",
  authorizationСheck,
  checkingAccessToUserEdit,
  UserController.changeUserPassword
);
// /change user password
// delete user account
router.delete("/user/delete/account/:userId",
  authorizationСheck,
  checkingAccessToUserEdit,
  UserController.deleteUserAccount);
// /delete user account
// get all users
router.get("/users/get/all", UserController.getAllUsers);
// /get all users
export const userRoutes = router
