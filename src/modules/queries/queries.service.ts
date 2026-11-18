import { Op } from "sequelize";
import { ContactQuery } from "../../models/index.js";
import { AppError } from "../../utils/AppError.js";

export async function listQueriesForProjectService(
  projectId: string,
  actorRole: string,
  filterProjectId?: string,
) {
  if (actorRole === "admin") {
    const where =
      filterProjectId && filterProjectId !== "all"
        ? { projectId: filterProjectId }
        : undefined;
    return ContactQuery.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });
  }

  return ContactQuery.findAll({
    where: {
      projectId: {
        [Op.in]: [projectId, "general"],
      },
    },
    order: [["createdAt", "DESC"]],
  });
}

export interface CreateQueryInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectId?: string;
}

export async function createQueryService(input: CreateQueryInput) {
  return ContactQuery.create({
    name: input.name.trim(),
    email: input.email.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
    projectId: input.projectId?.trim() || "general",
    read: false,
  });
}

export async function updateQueryReadService(
  id: string,
  actorProjectId: string,
  actorRole: string,
  read: boolean,
) {
  const query = await ContactQuery.findByPk(id);
  if (!query) throw new AppError("Query not found.", 404);
  if (
    actorRole !== "admin" &&
    query.projectId !== actorProjectId &&
    query.projectId !== "general"
  ) {
    throw new AppError("Forbidden.", 403);
  }
  query.read = Boolean(read);
  await query.save();
  return query;
}

export async function deleteQueryService(
  id: string,
  actorProjectId: string,
  actorRole: string,
) {
  const query = await ContactQuery.findByPk(id);
  if (!query) throw new AppError("Query not found.", 404);
  if (actorRole !== "admin" && query.projectId !== actorProjectId) {
    throw new AppError("Only queries addressed to your project can be deleted.", 403);
  }
  await query.destroy();
}

