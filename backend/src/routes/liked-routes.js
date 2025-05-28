import express from "express";
import {
  authorizationCheck,
  checkingAccessToLikedPostsPage
} from "../access-check/index.js";
import { postController } from "../controllers/index.js";

const router = express.Router();

// get liked posts with a specific user
router.get("/post/get/all/by/:userId",
  authorizationCheck,
  checkingAccessToLikedPostsPage,
  postController.getLikedPostsWithSpecificUser);
// /get liked posts with a specific user

export const likedRoutes = router