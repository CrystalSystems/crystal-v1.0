import { PostModel } from "./post.model.js";
import { UserModel } from "../user/index.js";
import {
  handleServerError,
  takeHashtags
} from '../../shared/helpers/index.js';

// create post
export const createPost = async (req, res) => {
  try {
    const combiningTitleAndText = (req.body?.title + ' ' + req.body.text).split(/[\s\n\r]/gmi).filter(v => v.startsWith('#'));
    const getHashtags = takeHashtags(combiningTitleAndText);
    const doc = new PostModel({
      title: req.body?.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId._id,
      hashtags: getHashtags
    });
    const imageUrl = req.body.imageUrl;
    const text = req.body.text;
    if (!(imageUrl || (text.length >= 1))) {
      return res.status(400).json({ message: "Post should not be empty" });
    }
    const post = await doc.save();
    res.status(200).json(post);
  } catch (error) {
    handleServerError(res, error);
  }
};
// create post

// update post
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await PostModel.findById(postId);
    const postImage = req.body.imageUrl;
    const postText = req.body.text;
    const combiningTitleAndText = (req.body?.title + ' ' + req.body.text).split(/[\s\n\r]/gmi).filter(v => v.startsWith('#'));
    const getHashtags = takeHashtags(combiningTitleAndText);
    if (!(postImage || (postText.length >= 1))) {
      return res.status(400).json({ message: "Post should not be empty" });
    }
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        hashtags: getHashtags
      },
    );
    res.status(200).json({
      postId: req.params.postId,
    });
  } catch (error) {
    handleServerError(res, error);
  }
};
// /update post

// get post
export const getPost = (req, res) => {
  try {
    const postId = req.params.postId;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { views: 1 },
      },
      {
        returnDocument: 'after',
        timestamps: false
      },
    ).populate({ path: "user", select: ["name", '_id', 'customId', 'creator', "avatarUrl", "createdAt", "updatedAt"] }).then((post) => {
      if (!post) {
        return res.status(404).json({
          message: 'Post not found',
        })
      }
      res.status(200).json(post)
    }).catch(() => {
      return res.status(500).json({
        message: 'Error receiving post',
      });
    });
  } catch (error) {
    handleServerError(res, error);
  }
}
// /get post 

// get post, for post edit page 
export const getPostForPostEditPage = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await PostModel.findOne(
      {
        _id: postId,
      }).populate({ path: "user", select: ["name", '_id', 'customId', 'creator', "avatarUrl", "createdAt", "updatedAt"] });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    handleServerError(res, error);
  }
};
// /get post, for post edit page 

// get posts
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if (!page || !limit || page < 1 || limit < 1) {
      return res.status(400).json({ message: "Invalid pagination parameters" });
    }

    const offset = (page - 1) * limit;
    const result = await PostModel
      .find()
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: ["name", "customId", "aboutMe", "creator", "avatarUrl", "createdAt", "updatedAt"] })
      .skip(offset)
      .limit(limit)
      .exec();

    const totalCount = await PostModel.estimatedDocumentCount();
    res.set('X-Total-Count', totalCount);
    return res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};

// /get posts

//  get posts by user
export const getPostsByUser = async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const userId = await UserModel.findOne({ customId: req.params.userId }).collation({ locale: "en", strength: 2 });
  if (!userId) {
    return res.status(404).json({
      message: "User is not found",
    });
  }
  const offset = (page - 1) * limit;
  const result = await PostModel.find({ "user": userId._id.toString() }).sort({ createdAt: -1 }).populate({ path: "user", select: ["name", "customId", 'aboutMe', "creator", "avatarUrl", "createdAt", "updatedAt"] }).skip(offset).limit(limit).exec();
  try {
    return res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};
//  /get posts by user

// get posts by hashtag
export const getPostsByHashtag = async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const hashtag = `#` + req.query.tag;
  const offset = (page - 1) * limit;
  let result = await PostModel.find({ "hashtags": hashtag }).sort({ createdAt: -1 }).populate({ path: "user", select: ["name", "customId", 'aboutMe', "creator", "avatarUrl", "createdAt", "updatedAt"] }).collation({ locale: 'en', strength: 2 }).skip(offset).limit(limit).exec();
  try {
    return res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};
// /get posts by hashtag

// delete post
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
    ).then((post) => {
      if (!post) {
        return res.status(404).json({
          message: 'Post not found',
        })
      }
      res.status(200).json('Post deleted');
    }).catch(() => {
      return res.status(500).json({
        message: 'Error deleting post',
      });
    });
  } catch (error) {
    handleServerError(res, error);
  }
};
// /delete post

// delete all posts by user
export const deleteAllPostsByUser = async (req, res) => {
  try {
    const editableUserSearchByCustomId = await UserModel.findOne({ customId: req.params.userId, }).collation({ locale: "en", strength: 2 });
    PostModel.deleteMany(
      {
        user: editableUserSearchByCustomId._id,
      },
    ).then((post) => {
      if (!post) {
        return res.status(404).json({
          message: 'Posts not found',
        })
      }
      res.status(200).json(
        { message: 'All posts deleted' }
      );
    }).catch(() => {
      return res.status(500).json({
        message: 'Failed to delete all posts',
      });
    });
  } catch (error) {
    handleServerError(res, error);
  }
};
// /delete all posts by user

// add like
export const addLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const likeUserId = req.body.userId;
    const post = await PostModel.findById(postId);
    const checkLikeThisUserInPost = await PostModel.exists({ _id: postId, liked: likeUserId });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await PostModel.updateOne(
      {
        _id: postId,
      },
      checkLikeThisUserInPost ?
        { $pull: { liked: likeUserId } } :
        { $addToSet: { liked: likeUserId } },
      { timestamps: false }
    );
    res.status(200).json({
      postId: req.params.postId,
    });
  } catch (error) {
    handleServerError(res, error);
  }
};
// /add like
