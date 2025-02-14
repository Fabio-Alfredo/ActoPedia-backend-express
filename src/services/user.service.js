import mongoose from "mongoose";
import * as userRepository from "../repositories/user.repository.js";
import errorCodes from "../utils/errorCodes.util.js";
import { ServiceError } from "../errors/ServiceError.error.js";
import jwtUtil from "../utils/jwt.util.js";
import { USER_STATES } from "../utils/constans/statesuser.util.js";
import { sendEmail } from "../utils/sedEmails.util.js";

export const createUser = async (user) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const existingUser = await userRepository.getUserByEmail(user.email);
    if (existingUser)
      throw new ServiceError(
        "Email already in use",
        errorCodes.USER.ALREADY_EXISTS
      );
    const existingUsername = await userRepository.getUserByUsername(
      user.username
    );
    if (existingUsername)
      throw new ServiceError(
        "Username already in use",
        errorCodes.USER.ALREADY_EXISTS
      );

    const newUser = await userRepository.createUser(user, opts);
    await session.commitTransaction();
    return newUser;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while creating user",
      e.code || errorCodes.USER.NOT_FOUND
    );
  } finally {
    await session.endSession();
  }
};

export const authenticateUser = async (identifier, password) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const user = await userRepository.getUserByEmailOrUsername(identifier);

    if (!user || !(await user.comparePassword(password)))
      throw new ServiceError("Invalid credentials", errorCodes.USER.NOT_FOUND);

    if (user.state === USER_STATES.BLOCKED)
      throw new ServiceError("User is blocked", errorCodes.USER.USER_BLOCKED);

    const token = jwtUtil.generateToken({ id: user._id, role: user.role });
    await userRepository.addToken(user._id, token.token, opts);

    await session.commitTransaction();
    return token;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while authenticating user",
      e.code || errorCodes.USER.ERROR_LOGIN
    );
  } finally {
    await session.endSession();
  }
};

export const getUserById = async (id) => {
  try {
    const user = await userRepository.getUserById(id);
    if (!user)
      throw new ServiceError(
        "User not exists",
        errorCodes.USER.USER_NOT_EXISTS
      );
    return user;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while fetching user",
      e.code || errorCodes.USER.NOT_FOUND
    );
  }
};

export const updateRoles = async (userId, role, admin) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let user;
    const opts = { session };
    const existingUser = await userRepository.getUserById(userId);
    if (!existingUser)
      throw new ServiceError(
        "User not exists",
        errorCodes.USER.USER_NOT_EXISTS
      );
    if (admin.email === existingUser.email)
      throw new ServiceError(
        "You can't change your own role",
        errorCodes.USER.CANT_CHANGE_OWN_ROLE
      );

    if (existingUser.role.includes(role))
      user = await userRepository.removeRole(userId, role, admin, opts);
    else user = await userRepository.addRole(userId, role, admin, opts);

    await session.commitTransaction();
    return user;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while updating user roles",
      e.code || errorCodes.USER.NOT_FOUND
    );
  } finally {
    await session.endSession();
  }
};

export const updateStateUser = async (userId, state, admin) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const user = await userRepository.getUserById(userId);
    if (!user)
      throw new ServiceError(
        "User not exists",
        errorCodes.USER.USER_NOT_EXISTS
      );
    if (user.email === admin.email)
      throw new ServiceError(
        "You can't change your own state",
        errorCodes.USER.CANT_CHANGE_OWN_STATE
      );

    const updatedUser = await userRepository.updateState(
      userId,
      state,
      admin,
      opts
    );
    await session.commitTransaction();
    return updatedUser;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while updating user state",
      e.code || errorCodes.USER.NOT_FOUND
    );
  } finally {
    session.endSession();
  }
};

export const updatePassword = async (userId, password, newPassword) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const user = await userRepository.getUserById(userId);
    if (!user || !(await user.comparePassword(password)))
      throw new ServiceError(
        "Invalid credential user",
        errorCodes.USER.INVALID_CREDENTIALS
      );

    const updateUser = await userRepository.updatePassword(
      user,
      newPassword,
      opts
    );
    await session.commitTransaction();
    return updateUser;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while updating user password",
      e.code || errorCodes.USER.NOT_FOUND
    );
  } finally {
    await session.endSession();
  }
};

export const generateEmail = async (email) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const user = await userRepository.getUserByEmail(email);
    if (!user)
      throw new ServiceError(
        "The email address is not registered",
        errorCodes.USER.USER_NOT_EXISTS
      );
    const passwordTemp = Math.random().toString(36).slice(-8);
    await userRepository.updatePassword(user, passwordTemp, opts);

    await sendEmail(email, user.username, passwordTemp);

    await session.commitTransaction();
    return user._id;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while generating password temp",
      e.code || errorCodes.USER.NOT_FOUND
    );
  } finally {
    await session.endSession();
  }
};

export const getUsers = async () => {
  try {
    const users = await userRepository.getUsers();
    return users;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while fetching users",
      e.code || errorCodes.USER.NOT_FOUND
    );
  }
};
