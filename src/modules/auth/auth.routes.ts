import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  getMeController,
  getProjectAccountsController,
  loginController,
  updateCredentialsController,
} from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/auth/login", loginController);
authRouter.get("/auth/me", authenticate, getMeController);
authRouter.get("/projects/:projectId/accounts", authenticate, getProjectAccountsController);
authRouter.put(
  "/projects/:projectId/accounts/:role",
  authenticate,
  updateCredentialsController,
);

