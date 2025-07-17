import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { randomBytes } from "node:crypto";
import { UserModel } from "../user/index.js";
import {
  handleServerError
} from "../../shared/helpers/index.js";
import {
  JWT_SECRET_KEY,
  COOKIE_SECURE_STATUS,
  CREATOR_EMAIL
} from "../../shared/constants/index.js";

// register
export const register = async (req, res) => {
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
    handleServerError(res, error);
  }
};
// /register  

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
    handleServerError(res, error);
  }
};
// /log in

// get me
export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId._id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const { passwordHash, email, ...userData } = user._doc;
    res.status(200).json(userData);
  } catch (error) {
    handleServerError(res, error);
  }
};
// /get me

// log out
export const logOut = async (_, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: COOKIE_SECURE_STATUS });
    res.status(200).send('log out OK');
  } catch (error) {
    handleServerError(res, error);
  }
};
// log out


