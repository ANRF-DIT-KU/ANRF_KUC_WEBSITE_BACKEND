import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { AccountRole } from "../../models/index.js";
import {
  getMeService,
  getProjectAccountsService,
  loginService,
  updateCredentialsService,
} from "./auth.service.js";

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new AppError("Username and password are required.", 400);
  }
  const result = await loginService(username, password);
  res.json(result);
});

export const getMeController = asyncHandler(async (req: Request, res: Response) => {
  const user = await getMeService(req.user!.sub);
  res.json(user);
});

export const getProjectAccountsController = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = String(req.params.projectId);
    if (req.user!.projectId !== projectId) {
      throw new AppError("Forbidden: project mismatch.", 403);
    }
    const accounts = await getProjectAccountsService(projectId);
    res.json(accounts);
  },
);

export const updateCredentialsController = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = String(req.params.projectId);
    const targetRole = String(req.params.role) as AccountRole;

    if (req.user!.projectId !== projectId) {
      throw new AppError("Forbidden: project mismatch.", 403);
    }
    if (targetRole !== "pi" && targetRole !== "member") {
      throw new AppError("Invalid account role.", 400);
    }

    const { currentPassword, newUsername, newPassword } = req.body;
    if (!currentPassword) {
      throw new AppError("Current password is required.", 400);
    }

    const updated = await updateCredentialsService({
      actorId: req.user!.sub,
      actorProjectId: req.user!.projectId,
      actorRole: req.user!.role,
      targetRole,
      currentPassword,
      newUsername,
      newPassword,
    });

    res.json(updated);
  },
);

