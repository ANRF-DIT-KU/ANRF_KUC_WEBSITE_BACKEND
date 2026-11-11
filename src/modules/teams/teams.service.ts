import { ProjectTeam, ProjectTeamAttributes } from "../../models/index.js";
import { AppError } from "../../utils/AppError.js";

export async function listTeamsService() {
  return ProjectTeam.findAll({
    order: [["createdAt", "ASC"]],
  });
}

export async function getProjectTeamService(projectId: string) {
  const team = await ProjectTeam.findByPk(projectId);
  if (!team) throw new AppError("Project team not found.", 404);
  return team;
}

export async function updateProjectTeamService(
  projectId: string,
  payload: ProjectTeamAttributes,
) {
  const team = await ProjectTeam.findByPk(projectId);
  if (!team) throw new AppError("Project team not found.", 404);

  team.projectTitle = payload.projectTitle.trim();
  team.pi = {
    name: payload.pi.name.trim(),
    role: payload.pi.role.trim(),
    affiliation: payload.pi.affiliation.trim(),
  };
  team.coInvestigators = (payload.coInvestigators || [])
    .map((c) => ({ name: c.name.trim() }))
    .filter((c) => c.name);
  team.members = (payload.members || [])
    .map((m) => ({
      name: m.name.trim(),
      role: m.role.trim(),
      email: m.email.trim(),
    }))
    .filter((m) => m.name);

  await team.save();
  return team;
}

