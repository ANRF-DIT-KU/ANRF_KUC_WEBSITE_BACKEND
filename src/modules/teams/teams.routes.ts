import { Router } from "express";
import { authenticate, requirePI } from "../../middlewares/auth.middleware.js";
import {
  getProjectTeamController,
  listTeamsController,
  updateProjectTeamController,
} from "./teams.controller.js";

export const teamsRouter = Router();

teamsRouter.get("/", listTeamsController);
teamsRouter.get("/:projectId", getProjectTeamController);
teamsRouter.put("/:projectId", authenticate, requirePI, updateProjectTeamController);

