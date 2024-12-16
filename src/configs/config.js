import "dotenv/config.js";
const {
  PORT,
  MONGODB_URI,
  ROLE_ONE,
  ROLE_TWO,
  ROLE_THREE,
  ROLES,
  DEFAULT_ROLE,
  SALT_ROUNDS,
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  PREFIX_TOKEN
} = process.env;

const validatorEnv = (env, name) => {
  if (!env) {
    throw new Error(`${name} is required`);
  }
  return env;
};

export const config = {
  port: validatorEnv(PORT, "PORT"),
  mongo: validatorEnv(MONGODB_URI, "MONGODB_URI"),
  role_one: validatorEnv(ROLE_ONE, "ROLE_ONE"),
  role_two: validatorEnv(ROLE_TWO, "ROLE_TWO"),
  role_three: validatorEnv(ROLE_THREE, "ROLE_THREE"),
  roles: validatorEnv(ROLES, "ROLES")
    .split(",")
    .map((role) => role.trim()),
  defaultRole: validatorEnv(DEFAULT_ROLE, "DEFAULT_ROLE").trim(),
  salt: validatorEnv(SALT_ROUNDS, "SALT_ROUNDS"),
  jwtSecret: validatorEnv(JWT_SECRET, "JWT_SECRET"),
  cloudinaryName: validatorEnv(CLOUDINARY_CLOUD_NAME, "CLOUDINARY_NAME"),
  cloudinaryApiKey: validatorEnv(CLOUDINARY_API_KEY, "CLOUDINARY_API_KEY"),
  cloudinaryApiSecret: validatorEnv(
    CLOUDINARY_API_SECRET,
    "CLOUDINARY_API_SECRET"
  ),
  prefixToken: validatorEnv(PREFIX_TOKEN, "PREFIX_TOKEN"),
};
