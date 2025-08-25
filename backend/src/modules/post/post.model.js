import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    imageUrl: String,
    hashtags: {
      type: Array,
      default: [],
    },
    liked: {
      type: Array,
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

PostSchema.index({ createdAt: -1 });

export const PostModel = mongoose.model("Post", PostSchema);
