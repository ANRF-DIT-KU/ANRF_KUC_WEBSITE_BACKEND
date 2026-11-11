import { Bulletin } from "../../models/index.js";
import { AppError } from "../../utils/AppError.js";

export async function listBulletinsService(projectId?: string) {
  const where = projectId ? { projectId } : undefined;
  return Bulletin.findAll({
    where,
    order: [["createdAt", "DESC"]],
  });
}

export interface UpsertBulletinInput {
  projectId: string;
  volume: string;
  issue: string;
  title: string;
  summary: string;
  publishDate?: string;
  themeColor?: "teal" | "navy";
  downloadUrl?: string;
  fileName?: string;
}

export async function createBulletinService(input: UpsertBulletinInput) {
  return Bulletin.create({
    projectId: input.projectId,
    volume: input.volume.trim(),
    issue: input.issue.trim(),
    title: input.title.trim(),
    summary: input.summary.trim(),
    publishDate: input.publishDate?.trim() || null,
    themeColor: input.themeColor === "navy" ? "navy" : "teal",
    downloadUrl: input.downloadUrl || "#",
    fileName: input.fileName || null,
  });
}

export async function updateBulletinService(
  id: string,
  actorProjectId: string,
  input: UpsertBulletinInput,
) {
  const bulletin = await Bulletin.findByPk(id);
  if (!bulletin) throw new AppError("Bulletin not found.", 404);
  if (bulletin.projectId !== actorProjectId) {
    throw new AppError("Forbidden: cannot modify another project's bulletin.", 403);
  }

  bulletin.volume = input.volume.trim();
  bulletin.issue = input.issue.trim();
  bulletin.title = input.title.trim();
  bulletin.summary = input.summary.trim();
  bulletin.publishDate = input.publishDate?.trim() || null;
  bulletin.themeColor = input.themeColor === "navy" ? "navy" : "teal";

  if (input.downloadUrl) {
    bulletin.downloadUrl = input.downloadUrl;
    bulletin.fileName = input.fileName || null;
  }

  await bulletin.save();
  return bulletin;
}

export async function deleteBulletinService(id: string, actorProjectId: string) {
  const bulletin = await Bulletin.findByPk(id);
  if (!bulletin) throw new AppError("Bulletin not found.", 404);
  if (bulletin.projectId !== actorProjectId) {
    throw new AppError("Forbidden: cannot delete another project's bulletin.", 403);
  }
  await bulletin.destroy();
}

