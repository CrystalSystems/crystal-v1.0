import express from "express";
const router = express.Router();
import {
  upload,
  multerErrorMessages
} from "../utils/index.js";
import {
  handleValidationErrors,
  postCreateValidation
} from "../validations/index.js";
import {
  authorizationСheck,
  checkingAccessToPostEdit,
  checkingAccessToUserEdit
} from "../accessСheck/index.js";
import { PostController } from "../controllers/index.js";
//add post
router.post(
  "/post/add",
  authorizationСheck,
  postCreateValidation,
  handleValidationErrors,
  PostController.addPost,
);
// /add post
//  add a post image
router.post(
  "/post/add/image/:postId",
  authorizationСheck,
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
  "/post/edit/:postId",
  authorizationСheck,
  checkingAccessToPostEdit,
  postCreateValidation,
  handleValidationErrors,
  PostController.editPost
);
// /edit post
// get one post
router.get("/post/get/one/:postId", PostController.getOnePost);
// /get one post
// get one post, from post edit page 
router.get("/post/get/one/from/post/edit/page/:postId",
  authorizationСheck,
  checkingAccessToPostEdit,
  PostController.getOnePostFromPostEditPage);
// /get one post, from post edit page 
//  get all posts by a specific user id
router.get("/posts/get/all/by/:userId",
  PostController.getAllPostsBySpecificUserId);
// /get all posts by a specific user id
//  get posts with a specific hashtag
router.get("/post/get/with/specific/hashtag", PostController.getPostsWithSpecificHashtag);
// /get posts with a specific hashtag
// get all posts
router.get("/post/get/all",
  PostController.getAllPosts);
// /get all posts
// delete post
router.delete("/post/delete/:postId",
  authorizationСheck,
  checkingAccessToPostEdit,
  PostController.deletePost);
// /delete post
// delete all posts of the current user
router.delete("/posts/delete/all/by/:userId",
  authorizationСheck,
  checkingAccessToUserEdit,
  PostController.deleteAllPostsCurrentUser);
// /delete all posts of the current user
// add like
router.patch(
  "/post/add/like/:postId",
  authorizationСheck,
  PostController.addLike
);
// /add like
export const postRoutes = router
