import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    hashtags: {
      type: Array,
      default: [],
    },
    liked: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  },
);
export default mongoose.model('Post', PostSchema);
