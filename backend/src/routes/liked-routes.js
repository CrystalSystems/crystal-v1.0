import express from "express";
import { postController } from "../controllers/index.js";
import { accessCheck } from "../access-check/index.js";
 
const router = express.Router();

// get liked posts with a specific user
router.get("/post/get/all/by/:userId",
  accessCheck.authorization,
  accessCheck.toLikedPostsPage,
  postController.getLikedPostsWithSpecificUser);
// /get liked posts with a specific user

export const likedRoutes = router