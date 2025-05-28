import express from "express";
import {
  upload,
  multerErrorMessages
} from "../utils/index.js";
import {
  handleValidationErrors,
  postCreateValidation
} from "../validations/index.js";
import {
  authorizationCheck,
  checkingAccessToPostEdit,
  checkingAccessToUserEdit
} from "../access-check/index.js";
import { postController } from "../controllers/index.js";

const router = express.Router();

//add post
router.post(
  "/add",
  authorizationCheck,
  postCreateValidation,
  handleValidationErrors,
  postController.addPost,
);
// /add post

//  add a post image
router.post(
  "/add/image/:postId",
  authorizationCheck,
  checkingAccessToPostEdit,
  upload.single("image"),
  multerErrorMessages,
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
  authorizationCheck,
  checkingAccessToPostEdit,
  postCreateValidation,
  handleValidationErrors,
  postController.editPost
);
// /edit post

// get one post
router.get("/get/one/:postId", postController.getOnePost);
// /get one post

// get one post, from post edit page 
router.get("/get/one/from/post/edit/page/:postId",
  authorizationCheck,
  checkingAccessToPostEdit,
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
  authorizationCheck,
  checkingAccessToPostEdit,
  postController.deletePost);
// /delete post

// delete all posts of the current user
router.delete("/delete/all/by/:userId",
  authorizationCheck,
  checkingAccessToUserEdit,
  postController.deleteAllPostsCurrentUser);
// /delete all posts of the current user

// add like
router.patch(
  "/add/like/:postId",
  authorizationCheck,
  postController.addLike
);
// /add like

export const postRoutes = router
