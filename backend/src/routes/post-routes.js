import express from "express";
import { postController } from "../controllers/index.js";
import { accessCheck } from "../access-check/index.js";
import { validation } from "../validation/index.js";
import { multer } from "../utils/index.js";

const router = express.Router();

//add post
router.post(
  "/add",
  accessCheck.authorization,
  validation.postCreate,
  validation.errors,
  postController.addPost,
);
// /add post

//  add a post image
router.post(
  "/add/image/:postId",
  accessCheck.authorization,
  accessCheck.toPostEdit,
  multer.upload.single("image"),
  multer.errors,
  async (req, res) => {
    res.json({
      url: `/uploads/posts/images/${req.file?.filename}`,
      postId: req.params.postId
    });
  });
//  /add a post image

// edit post
router.patch(
  "/edit/:postId",
  accessCheck.authorization,
  accessCheck.toPostEdit,
  validation.postCreate,
  validation.errors,
  postController.editPost
);
// /edit post

// get one post
router.get("/get/one/:postId", postController.getOnePost);
// /get one post

// get one post, from post edit page 
router.get("/get/one/from/post/edit/page/:postId",
  accessCheck.authorization,
  accessCheck.toPostEdit,
  postController.getOnePostFromPostEditPage);
// /get one post, from post edit page 

//  get all posts by a specific user id
router.get("/get/all/by/:userId",
  postController.getAllPostsBySpecificUserId);
// /get all posts by a specific user id

//  get posts with a specific hashtag
router.get("/get/with/specific/hashtag", postController.getPostsWithSpecificHashtag);
// /get posts with a specific hashtag

// get all posts
router.get("/get/all",
  postController.getAllPosts);
// /get all posts

// delete post
router.delete("/delete/:postId",
  accessCheck.authorization,
  accessCheck.toPostEdit,
  postController.deletePost);
// /delete post

// delete all posts of the current user
router.delete("/delete/all/by/:userId",
  accessCheck.authorization,
  accessCheck.toUserEdit,
  postController.deleteAllPostsCurrentUser);
// /delete all posts of the current user

// add like
router.patch(
  "/add/like/:postId",
  accessCheck.authorization,
  postController.addLike
);
// /add like

export const postRoutes = router
