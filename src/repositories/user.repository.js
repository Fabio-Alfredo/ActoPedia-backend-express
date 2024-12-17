import User from "../models/user.model.js";

export const createUser = async (user, opts) => {
  const newUser = new User(user);
  return await newUser.save(opts);
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const getUserByUsername = async (username) => {
  return await User.findOne({ username });
};

export const getUserByEmailOrUsername = async (identifier) => {
  return await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
};

export const addToken = async (userId, token, opts) => {
  return await User.findByIdAndUpdate(
    { _id: userId },
    { token },
    { new: true, opts }
  );
};

export const getUserById = async (id) => {
  return await User.findById(id);
};
