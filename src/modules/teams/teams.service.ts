import { ProjectTeam, ProjectTeamAttributes } from "../../models/index.js";
import { AppError } from "../../utils/AppError.js";

export async function listTeamsService() {
  return ProjectTeam.findAll({
    order: [
      ["displayOrder", "ASC"],
      ["createdAt", "ASC"],
    ],
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

  if (typeof payload.displayOrder === "number") {
    team.displayOrder = payload.displayOrder;
  }
  team.projectTitle = payload.projectTitle.trim();
  team.pi = {
    name: payload.pi.name.trim(),
    role: payload.pi.role.trim(),
    affiliation: payload.pi.affiliation.trim(),
  };
  team.uohPis = (payload.uohPis || [])
    .map((p) => ({
      name: p.name.trim(),
      role: p.role?.trim() || "Project Investigator",
      affiliation: p.affiliation?.trim() || "University of Hyderabad (Hub)",
    }))
    .filter((p) => p.name);
  team.coInvestigators = (payload.coInvestigators || [])
    .map((c) => ({
      name: c.name.trim(),
      ...(c.institution === "UoH" ? { institution: "UoH" as const } : {}),
    }))
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

