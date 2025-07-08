import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
      collation: { locale: "en", strength: 2 }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      collation: { locale: "en", strength: 2 }
    },
    name: {
      type: String,
      default: ''
    },
    aboutMe: {
      type: String,
      default: ''
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    bannerUrl: String,
    creator: Boolean,
  },
  {
    timestamps: true,
  },
);

UserSchema.index({ createdAt: -1 });

export const UserModel = mongoose.model("User", UserSchema);
 