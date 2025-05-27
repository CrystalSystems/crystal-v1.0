import express from "express";
import { postController } from "../controllers/index.js";

const router = express.Router();

// get all hashtags
router.get("/get/all",
    postController.getAllHashtags
);
// /get all hashtags

export const hashtagRoutes = router