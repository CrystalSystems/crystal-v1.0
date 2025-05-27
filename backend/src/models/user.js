import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: ''
    },
    customId: {
      type: String,
      unique: true,
      collation: { locale: "en", strength: 2 }
    },
    aboutMe: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      required: true,
      unique: true,
      collation: { locale: "en", strength: 2 }
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    bannerUrl: String,
    creator: Boolean,
    admin: Boolean,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
