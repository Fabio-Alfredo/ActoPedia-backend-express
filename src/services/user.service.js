import * as userRepository from "../repositories/user.repository.js";
import errorCodes from "../utils/errorCodes.util.js";
import { ServiceError } from "../errors/ServiceError.error.js";
import jwtUtil from "../utils/jwt.util.js";

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

    const token = jwtUtil.generateToken({ id: user._id, role: user.role });
    await userRepository.addToken(user._id, token.token, opts);
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
