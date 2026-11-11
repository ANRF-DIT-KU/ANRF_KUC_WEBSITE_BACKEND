import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AccountRole } from "../models/index.js";
import { AppError } from "../utils/AppError.js";

export interface JwtPayload {
  sub: string;
  projectId: string;
  role: AccountRole;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return next(new AppError("Authentication token required.", 401));
  }

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, env.jwt.secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    next(new AppError("Invalid or expired authentication token.", 401));
  }
};

export const requirePI = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "pi") {
    return next(new AppError("Only Project Investigators can perform this action.", 403));
  }
  next();
};

