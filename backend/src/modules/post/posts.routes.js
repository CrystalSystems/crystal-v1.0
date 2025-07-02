import express from "express";
import * as controller from "./post.controller.js";
import { auth } from "../auth/index.js";
import {
  canUpdatePost,
  canUpdateUser
} from "../../shared/middlewares/access/index.js";
import { validation } from "../../shared/validation/index.js";
import { multer } from "../../shared/utils/index.js";

const router = express.Router();

//create post
router.post(
  "/",
  auth,
  validation.createPost,
  validation.errors,
  controller.createPost,
);
// /create post

//  add a post image
router.post(
  "/:postId/image",
  auth,
  canUpdatePost,
  multer.upload.single("image"),
  multer.errors,
  async (req, res) => {
    res.json({
      url: `/uploads/posts/images/${req.file?.filename}`,
      postId: req.params.postId
    });
  });
//  /add a post image

// update post
router.patch(
  "/:postId",
  auth,
  canUpdatePost,
  validation.createPost,
  validation.errors,
  controller.updatePost
);
// /update post

//  get posts by hashtag
// ⚠️ IMPORTANT:
// This route must be declared **before** any dynamic routes like `/:postId`, otherwise, Express will mistakenly treat "/hashtag" as a `:postId` value.
router.get("/hashtags",
  controller.getPostsByHashtag
);
// /get posts by hashtag

// get post
// ⚠️ IMPORTANT:
// Similar routes - "/hashtags" should be before "/: postid."
router.get("/:postId",
  controller.getPost
);
// /get post

// get post, for post edit page 
router.get("/:postId/edit",
  auth,
  canUpdatePost,
  controller.getPostForPostEditPage
);
// /get post, for post edit page 

//  get posts by user
router.get("/user/:userId",
  controller.getPostsByUser
);
// /get posts by user

// get posts
router.get("/",
  controller.getPosts);

// delete post
router.delete("/:postId",
  auth,
  canUpdatePost,
  controller.deletePost);
// /delete post

// delete all posts by user
router.delete("/user/:userId",
  auth,
  canUpdateUser,
  controller.deleteAllPostsByUser);
// /delete all posts by user

// add like
router.patch(
  "/:postId/like",
  auth,
  controller.addLike
);
// /add like

export default router;
