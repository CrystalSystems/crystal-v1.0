import express from "express";
const router = express.Router();
import { PostController } from "../controllers/index.js";
// get all hashtags
router.get("/hashtag/get/all",
    PostController.getAllHashtags
);
// /get all hashtags
export const hashtagRoutes = router