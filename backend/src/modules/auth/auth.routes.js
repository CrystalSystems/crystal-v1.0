import express from "express";
import { auth } from "./auth.middleware.js";
import * as controller from './auth.controller.js';
import { validation } from "../../shared/validation/index.js";
import {
    // -- reCAPTCHA v3 
    // reCaptchaV3,
    // -- /reCAPTCHA v3
} from "../../shared/utils/index.js";

const router = express.Router();

router.post(
    "/register",
    // -- reCAPTCHA v3
    // reCaptchaV3,
    // -- /reCAPTCHA v3
    validation.register,
    validation.errors,
    controller.register
);

router.post(
    "/login",
    validation.logIn,
    validation.errors,
    controller.logIn
);

router.get("/me",
    auth,
    controller.getMe
);

router.post(
    "/logout",
    controller.logOut
);

export default router;
