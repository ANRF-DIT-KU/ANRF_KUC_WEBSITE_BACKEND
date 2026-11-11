import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import {
  getProjectTeamService,
  listTeamsService,
  updateProjectTeamService,
} from "./teams.service.js";

export const listTeamsController = asyncHandler(async (_req: Request, res: Response) => {
  const teams = await listTeamsService();
  res.json(teams);
});

export const getProjectTeamController = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = String(req.params.projectId);
    const team = await getProjectTeamService(projectId);
    res.json(team);
  },
);

export const updateProjectTeamController = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = String(req.params.projectId);
    if (req.user!.projectId !== projectId) {
      throw new AppError("Forbidden: cannot modify another project's team.", 403);
    }

    const updated = await updateProjectTeamService(projectId, req.body);
    res.json(updated);
  },
);

