import createHttpError from "http-errors";
import jwtUtil from "../utils/jwt.util.js";
import { getUserById } from "../services/user.service.js";
import { config } from "../configs/config.js";
import { USER_STATES } from "../utils/constans/statesuser.util.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw createHttpError(401, "Token is required");

    const [prefix, token] = authorization.split(" ");
    if (prefix !== config.prefixToken)
      throw createHttpError(401, "Invalid token prefix");
    if (!token) throw createHttpError(401, "Token is required");

    const payload =  jwtUtil.verifyToken(token);
    if (!payload) throw createHttpError(401, "Invalid token");

    const user = await getUserById(payload.id);
    if(user.estate === USER_STATES.BLOCKED) throw createHttpError(401, "User is blocked");
    if (!user) throw createHttpError(401, "User not exists");
    if (user.token !== token) throw createHttpError(401, "Invalid token");

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    next(e);
  }
};

export const rolesMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const { _id } = req.user;
      const user = await getUserById(_id);
      if (!user) return next(createHttpError(401, "User not found"));

      if (!requiredRoles.some((role) => user.role.includes(role)))
        return next(
          createHttpError(403, "Accesso denegado por falta de permisos")
        );

      next();
    } catch (error) {
      next(error);
    }
  };
};

