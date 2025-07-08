import express from "express";
import * as controller from "./like.controller.js";
import { auth } from "../auth/index.js";
import { canViewLikedPosts } from "../../shared/middlewares/access/index.js";
const router = express.Router();

// get user liked posts
router.get("/:userId",
  auth,
  canViewLikedPosts,
  controller.getUserLikedPosts);

export default router;