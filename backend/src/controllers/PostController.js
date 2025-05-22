import PostModel from '../models/Post.js';
import UserModel from "../models/User.js";
//add post
export const addPost = async (req, res) => {
  try {
    const combiningTitleAndText = (req.body?.title + ' ' + req.body.text).split(/[\s\n\r]/gmi).filter(v => v.startsWith('#'));
    const getHashtags = combiningTitleAndText.filter((item, index) => combiningTitleAndText.indexOf(item) === index);
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
    res.status(500).send(error);
  }
};
//add post
// edit post
export const editPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await PostModel.findById(postId);
    const postImage = req.body.imageUrl;
    const postText = req.body.text;
    const combiningTitleAndText = (req.body?.title + ' ' + req.body.text).split(/[\s\n\r]/gmi).filter(v => v.startsWith('#'));
    const getHashtags = combiningTitleAndText.filter((item, index) => combiningTitleAndText.indexOf(item) === index);
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
    res.status(500).send(error);
  }
};
// /edit post
// get one post
export const getOnePost = (req, res) => {
  try {
    const postId = req.params.postId;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
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
    res.status(500).send(error);
  }
}
// /get one post 
// get one post, from post edit page 
export const getOnePostFromPostEditPage = async (req, res) => {
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
    res.status(500).send(error);
  }
};
// /get one post, from post edit page 
// get all posts
export const getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const offset = (page - 1) * limit;
  const result = await PostModel.find().sort({ createdAt: -1 }).populate({ path: "user", select: ["name", "customId", 'aboutMe', "creator", "avatarUrl", "createdAt", "updatedAt"] }).skip(offset).limit(limit).exec();
  try {
    const totalCount = await PostModel.estimatedDocumentCount();
    res.set('X-Total-Count', totalCount);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
// /get all posts
//  get all posts by a specific user id
export const getAllPostsBySpecificUserId = async (req, res) => {
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
    res.status(500).send(error);
  }
};
//  /get all posts by a specific user id
// get all hashtags
export const getAllHashtags = async (_, res) => {
  const page = 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  let result = await PostModel.aggregate([
    {
      $unwind: "$hashtags"
    },
    {
      $group: {
        _id: "$hashtags",
        "hashtagName": {
          $first: "$hashtags"
        },
        "numberPosts": {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        "numberPosts": -1,
        "hashtagName": 1
      }
    },
    {
      $project: {
        "_id": false
      }
    }
  ]).collation({ locale: 'en', strength: 2 }).skip(offset).limit(limit).exec();
  try {
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
// /get all hashtags
//  get posts with a specific hashtag
export const getPostsWithSpecificHashtag = async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const hashtagName = `#` + req.query.hashtagName;
  const offset = (page - 1) * limit;
  let result = await PostModel.find({ "hashtags": hashtagName }).sort({ createdAt: -1 }).populate({ path: "user", select: ["name", "customId", 'aboutMe', "creator", "avatarUrl", "createdAt", "updatedAt"] }).collation({ locale: 'en', strength: 2 }).skip(offset).limit(limit).exec();
  try {
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
// /get posts with a specific hashtag
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
    res.status(500).send(error);
  }
};
// /delete post
// delete all posts of the current user
export const deleteAllPostsCurrentUser = async (req, res) => {
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
    res.status(500).send(error);
  }
};
// /delete all posts of the current user
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
    );
    res.status(200).json({
      postId: req.params.postId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
// /add like
// get liked posts with a specific user
export const getLikedPostsWithSpecificUser = async (req, res) => {
  const userId = await UserModel.findOne({ customId: req.params.userId }).collation({ locale: "en", strength: 2 });
  if (!userId) {
    return res.status(404).json({
      message: "User is not found",
    });
  }
  try {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const offset = (page - 1) * limit;
    const result = await PostModel.find({ "liked": userId._id.toString() }).sort({ createdAt: -1 }).populate({ path: "user", select: ["name", "customId", 'aboutMe', "creator", "avatarUrl", "createdAt", "updatedAt"] }).skip(offset).limit(limit).exec();
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
}
// /get liked posts with a specific user
