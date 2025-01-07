import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { nanoid } from 'nanoid';
import UserModel from "../models/User.js";
// Registration
export const registration = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const email = await UserModel.findOne({ email: req.body.email }).collation({ locale: "en", strength: 2 });
    const сustomId = req.body.customId;
    const CheckCustomId = await UserModel.findOne({ customId: req.body.customId }).collation({ locale: "en", strength: 2 });
    if (CheckCustomId) {
      return res.status(404).send({ error: 'This Id already exists' });
    }
    if (email) {
      return res.status(404).send({ error: 'This email already exists' });
    }
    // Сreator's email
    const creatorEmail = process.env.CREATOR_EMAIL;
    // /Сreator's email
    const doc = new UserModel({
      email: req.body.email,
      name: req.body.name,
      customId: сustomId ? сustomId : nanoid(),
      creator: (req.body.email === creatorEmail) && true,
      passwordHash: hash,
    });
    const user = await doc.save();
    // JWT secret key
    const JWTSecretKey = process.env.JWT_SECRET_KEY;
    // /JWT secret key
    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWTSecretKey
    );
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600 * 1000 * 24 * 365 * 10 }).json({
      _id: user._id,
      name: user.name,
      customId: user.customId,
      aboutMe: user.aboutMe,
      creator: user.creator
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to register",
    });
  }
};
// /Registration  
// log In
export const logIn = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }, { email: 0 }).collation({ locale: "en", strength: 2 });
    if (!user) {
      return res.status(404).send({ error: 'invalid username or password' });
    }
    const password = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!password) {
      return res.status(404).send({ error: 'invalid username or password' });
    }
    // JWT secret key
    const JWTSecretKey = process.env.JWT_SECRET_KEY;
    // /JWT secret key
    const token = jwt.sign(
      {
        _id: user._id
      },
      JWTSecretKey
    );
    const { passwordHash, aboutMe, email, ...userData } = user._doc;
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600 * 1000 * 24 * 365 * 10 }).json({
      ...userData
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// /log In
// log Out
export const logOut = async (req, res) => {
  try {
    res.cookie('token', null)
    res.status(200).json({
      message: "log out OK",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// log Out
// authorization
export const Authorization = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId._id);
    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }
    const { passwordHash, email, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "No access",
    });
  }
};
// /authorization
// edit user
export const editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const customId = req.body.customId ? req.body.customId : 'empty';
    const validation = /^[a-zA-Z0-9-_]{1,35}$/;
    const validationCustomId = validation.test(customId);
    const user = await UserModel.findOne({ customId: userId });
    const searchIdenticalUserCustomId = await UserModel.findOne({ customId: customId, }).collation({ locale: "en", strength: 2 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if ((userId.toUpperCase() === customId.toUpperCase()) ?
      !searchIdenticalUserCustomId : searchIdenticalUserCustomId) {
      return res.status(403).json({ message: "This Id already exists" });
    }
    if (!validationCustomId) {
      return res.status(403).json({ message: "Minimum length of id is 1 character, maximum 35, Latin letters, numbers, underscores and dashes are allowed" });
    }
    UserModel.findOneAndUpdate(
      {
        customId: userId,
      },
      {
        $set: req.body,
      },
      {
        returnDocument: 'after',
      },
    ).select(["name", '_id', 'customId', 'creator', "avatarUrl", "createdAt", "updatedAt"]).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        })
      }
      res.json(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// /edit user
// change user password 
export const changeUserPassword = async (req, res) => {
  try {
    const oldPassword = await req.body.oldPassword;
    const newPassword = await req.body.newPassword;
    const newPasswordValidationRule = /^[a-zA-Z\d!@#$%^&*[\]{}()?"\\/,><':;|_~`=+-]{8,35}$/;
    const validationNewPassword = newPasswordValidationRule.test(newPassword);
    if (!validationNewPassword) {
      return res.status(403).json({ message: "The minimum password length is 8 characters, the maximum is 30, Latin letters, numbers and special characters are allowed." });
    }
    const userId = await req.params.userId;
    const user = await UserModel.findOne({ customId: userId });
    const bcryptSalt = await bcrypt.genSalt(10);
    const bcryptHash = await bcrypt.hash(newPassword, bcryptSalt);
    const checkOldPassword = await bcrypt.compare(
      oldPassword,
      user.passwordHash
    );
    if (!checkOldPassword) {
      return res.status(401).send({ message: 'Old password is incorrect' });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    UserModel.findOneAndUpdate(
      {
        customId: userId,
      },
      {
        passwordHash: bcryptHash
      }
    ).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        })
      }
      return res.status(200).json({ message: "Password successfully changed" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// /change user password
// delete user account
export const deleteUserAccount = (req, res) => {
  try {
    const userId = req.params.userId;
    UserModel.findOneAndDelete(
      {
        customId: userId,
      },
    ).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        })
      }
      res.status(200).json('User deleted');
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// /delete user account
//Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, "-email -passwordHash");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get users",
    });
  }
};
// Get one user
export const getOneUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findOne({ customId: userId, }, '-email -passwordHash').collation({ locale: "en", strength: 2 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// /Get one user
// Get one user, from user edit page
export const getOneUserFromUserEditPage = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findOne({ customId: userId, }, '-email -passwordHash').collation({ locale: "en", strength: 2 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// /Get one user, from user edit page