import { Presentation } from "../../models/index.js";
import { AppError } from "../../utils/AppError.js";

export async function listPresentationsService(projectId?: string) {
  const where = projectId ? { projectId } : undefined;
  return Presentation.findAll({
    where,
    order: [["createdAt", "DESC"]],
  });
}

export interface CreatePresentationInput {
  projectId: string;
  title: string;
  date: string;
  venue: string;
  speaker?: string;
  department?: string;
  slidesUrl?: string;
  fileName?: string;
}

export async function createPresentationService(input: CreatePresentationInput) {
  return Presentation.create({
    projectId: input.projectId,
    title: input.title.trim(),
    date: input.date.trim(),
    venue: input.venue.trim().toUpperCase(),
    speaker: input.speaker?.trim() || null,
    department: input.department?.trim() || null,
    slidesUrl: input.slidesUrl || null,
    fileName: input.fileName || null,
  });
}

export async function deletePresentationService(id: string, actorProjectId: string) {
  const item = await Presentation.findByPk(id);
  if (!item) throw new AppError("Presentation not found.", 404);
  if (item.projectId !== actorProjectId) {
    throw new AppError("Forbidden: cannot delete another project's presentation.", 403);
  }
  await item.destroy();
}

