import "dotenv/config.js";

const validatorEnv = (env, name) => {
  if (!env) {
    throw new Error(`${name} is required`);
  }
  return env;
};

export const config = {
  port: validatorEnv(process.env.PORT, "PORT"),
  mongo: validatorEnv(process.env.MONGODB_URI, "MONGODB_URI"),
  roles: validatorEnv(process.env.ROLES, "ROLES")
    .split(",")
    .map((role) => role.trim()),
  defaultRole: validatorEnv(process.env.DEFAULT_ROLE, "DEFAULT_ROLE").trim(),
  salt: validatorEnv(process.env.SALT_ROUNDS, "SALT_ROUNDS"),
  jwtSecret: validatorEnv(process.env.JWT_SECRET, "JWT_SECRET"),
  cloudinaryName: validatorEnv(
    process.env.CLOUDINARY_CLOUD_NAME,
    "CLOUDINARY_NAME"
  ),
  cloudinaryApiKey: validatorEnv(
    process.env.CLOUDINARY_API_KEY,
    "CLOUDINARY_API_KEY"
  ),
  cloudinaryApiSecret: validatorEnv(
    process.env.CLOUDINARY_API_SECRET,
    "CLOUDINARY_API_SECRET"
  ),
};
