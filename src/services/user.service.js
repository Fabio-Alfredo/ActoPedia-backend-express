import * as userRepository from "../repositories/user.repository.js";
import errorCodes from "../utils/errorCodes.util.js";
import { ServiceError } from "../errors/ServiceError.error.js";

export const createUser = async (user) => {
  try {
    const existingUser = await userRepository.getUserByEmail(user.email);
    if(existingUser) throw new ServiceError( 'User already exists', errorCodes.USER.ALREADY_EXISTS);

    const newUser = await userRepository.createUser(user);
    return newUser;
  } catch (e) {
    throw new ServiceError('Internal server error while creating user', errorCodes.USER.NOT_FOUND);
  }
};
