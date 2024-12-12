import * as userRepository from "../repositories/user.repository.js";
import errorCodes from "../utils/errorCodes.util.js";
import { ServiceError } from "../errors/ServiceError.error.js";

export const createUser = async (user) => {
  try {
    const existingUser = await userRepository.getUserByEmail(user.email);
    if (existingUser)
      throw new ServiceError(
        "Email already in use",
        errorCodes.USER.ALREADY_EXISTS
      );
    const existingUsername = await userRepository.getUserByUsername(user.username);
    if (existingUsername)
      throw new ServiceError(
        "Username already in use",
        errorCodes.USER.ALREADY_EXISTS
      );

    const newUser = await userRepository.createUser(user);
    return newUser;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while creating user",
      e.code || errorCodes.USER.NOT_FOUND
    );
  }
};
