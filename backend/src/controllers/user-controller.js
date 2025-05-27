import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { randomBytes } from "node:crypto";
import { UserModel } from "../models/index.js";
import {
  JWT_SECRET_KEY,
  COOKIE_SECURE_STATUS,
  CREATOR_EMAIL
} from "../constants/index.js";
// Registration
export const registration = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const email = await UserModel.findOne({ email: req.body.email }).collation({ locale: "en", strength: 2 });
    const customId = req.body.customId;
    const CheckCustomId = await UserModel.findOne({ customId: req.body.customId }).collation({ locale: "en", strength: 2 });
    if (CheckCustomId) {
      return res.status(409).send({ error: 'This Id already exists' });
    }
    if (email) {
      return res.status(409).send({ error: 'This email already exists' });
    }
    const doc = new UserModel({
      email: req.body.email,
      name: req.body.name,
      customId: customId ? customId : randomBytes(16).toString("hex"),
      creator: (req.body.email === CREATOR_EMAIL) && true,
      passwordHash: hash,
    });
    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_SECRET_KEY
    );
    res.cookie('token', token, { httpOnly: true, secure: COOKIE_SECURE_STATUS, sameSite: 'strict', maxAge: 3600 * 1000 * 24 * 365 * 10 });
    res.status(200).send('Registration OK');
  } catch (error) {
    res.status(500).send(error);
  }
};
// /Registration  
// log in
export const logIn = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }, { email: 0 }).collation({ locale: "en", strength: 2 });
    if (!user) {
      return res.status(401).send({ error: 'invalid username or password' });
    }
    const password = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!password) {
      return res.status(401).send({ error: 'invalid username or password' });
    }
    const token = jwt.sign(
      {
        _id: user._id
      },
      JWT_SECRET_KEY
    );
    res.cookie('token', token, { httpOnly: true, secure: COOKIE_SECURE_STATUS, sameSite: 'strict', maxAge: 3600 * 1000 * 24 * 365 * 10 });
    res.status(200).send('log in OK');
  } catch (error) {
    res.status(500).send(error);
  }
};
// /log in
// log out
export const logOut = async (_, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: COOKIE_SECURE_STATUS });
    res.status(200).send('log out OK');
  } catch (error) {
    res.status(500).send(error);
  }
};
// log out
// authorization
export const authorization = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId._id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const { passwordHash, email, ...userData } = user._doc;
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).send(error);
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
      return res.status(409).json({ message: "This Id already exists" });
    }
    if (!validationCustomId) {
      return res.status(401).json({ message: "Minimum length of id is 1 character, maximum 35, Latin letters, numbers, underscores and dashes are allowed" });
    }
    UserModel.findOneAndUpdate(
      {
        customId: userId,
      },
      {
        $set: req.body,
      }
    ).then(() => {
      res.status(200).send('User changed');
    }).catch(() => {
      return res.status(500).send('Error changing user');
    });
  } catch (error) {
    res.status(500).send(error);
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
      return res.status(401).json({ message: "The minimum password length is 8 characters, the maximum is 30, Latin letters, numbers and special characters are allowed." });
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
    ).then(() => {
      res.status(200).json({ message: "Password successfully changed" });
    }).catch(() => {
      return res.status(500).send('Error changing password');
    });
  } catch (error) {
    res.status(500).send(error);
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
      res.status(200).send('User deleted');
    }).catch(() => {
      return res.status(500).send('Error deleting user');
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
// /delete user account
//Get all users
export const getAllUsers = async (_, res) => {
  try {
    const users = await UserModel.find({}, "-email -passwordHash");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
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
    res.status(500).send(error);
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
    res.status(500).send(error);
  }
};
// /Get one user, from user edit page