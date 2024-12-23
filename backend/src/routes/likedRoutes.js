import express from "express";
const router = express.Router();
import {
  authorizationСheck,
  checkingAccessToLikedPostsPage
} from "../accessСheck/index.js";
import { PostController } from "../controllers/index.js";
// get liked posts with a specific user
router.get("/liked/posts/get/all/by/:userId",
  authorizationСheck,
  checkingAccessToLikedPostsPage,
  PostController.getLikedPostsWithSpecificUser);
// /get liked posts with a specific user
export const likedRoutes = router