import bcrypt from "bcrypt";
import { UserModel } from "./user.model.js";
import {
  handleServerError
} from '../../shared/helpers/index.js';

// get user
export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findOne({ customId: userId, }, '-email -passwordHash').collation({ locale: "en", strength: 2 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    handleServerError(res, error);
  }
};
// /get user

// get users
export const getUsers = async (req, res) => {
  try {
    const { exclude, limit } = req.query;
    const query = exclude ? { customId: { $ne: exclude } } : {};
    const max = parseInt(limit) || 4;

    const users = await UserModel
      .find(query, "-email -passwordHash")
      .limit(max)
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    handleServerError(res, error);
  }
};
// /get users

// get user, for user edit page
export const getUserForUserEditPage = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findOne({ customId: userId, }, '-email -passwordHash').collation({ locale: "en", strength: 2 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    handleServerError(res, error);
  }
};

// update user
export const updateUser = async (req, res) => {
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
    handleServerError(res, error);
  }
};
// /update user

// change user password 
export const changePassword = async (req, res) => {
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
    handleServerError(res, error);
  }
};
// /change user password

// delete user account
export const deleteAccount = (req, res) => {
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
    handleServerError(res, error);
  }
};
// /delete user account