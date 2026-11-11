import { Op } from "sequelize";
import { ContactQuery } from "../../models/index.js";
import { AppError } from "../../utils/AppError.js";

export async function listQueriesForProjectService(projectId: string) {
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
  read: boolean,
) {
  const query = await ContactQuery.findByPk(id);
  if (!query) throw new AppError("Query not found.", 404);
  if (query.projectId !== actorProjectId && query.projectId !== "general") {
    throw new AppError("Forbidden.", 403);
  }
  query.read = Boolean(read);
  await query.save();
  return query;
}

export async function deleteQueryService(id: string, actorProjectId: string) {
  const query = await ContactQuery.findByPk(id);
  if (!query) throw new AppError("Query not found.", 404);
  if (query.projectId !== actorProjectId) {
    throw new AppError("Only queries addressed to your project can be deleted.", 403);
  }
  await query.destroy();
}

