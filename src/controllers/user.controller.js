import createHttpError from "http-errors";
import * as userService from "../services/user.service.js";
import errorCodes from "../utils/errorCodes.util.js";

export const updateRoleInUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const admin = req.user;
    const { role } = req.body;
    const newUser = await userService.updateRoles(userId, role, admin);
    res.status(201).json({ message: "Role updated successfully" });
  } catch (e) {
    switch (e.code) {
      case errorCodes.USER.NOT_FOUND:
        next(createHttpError(409, e.message));
        break;
      case errorCodes.USER.USER_NOT_EXISTS:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

export const updateStateInUser = async (req, res, next) => {
  try {
    const admin = req.user;
    const userId = req.params.userId;
    const { state } = req.body;
    const newUser = await userService.updateStateUser(userId, state, admin);
    res.status(201).json({ message: "User blocked successfully" });
  } catch (e) {
    switch (e.code) {
      case errorCodes.USER.NOT_FOUND:
        next(createHttpError(409, e.message));
        break;
      case errorCodes.USER.USER_NOT_EXISTS:
        next(createHttpError(500, e.message));
        break;
      case errorCodes.USER.CANT_CHANGE_OWN_STATE:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (e) {
    switch (e.code) {
      case errorCodes.USER.NOT_FOUND:
        next(createHttpError(409, e.message));
        break;
      default:
        next(e);
    }
  }
};
