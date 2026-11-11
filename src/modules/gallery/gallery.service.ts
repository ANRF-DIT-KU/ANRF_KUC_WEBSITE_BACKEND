import { AccountRole, GalleryItem } from "../../models/index.js";
import { AppError } from "../../utils/AppError.js";

export async function listGalleryService(projectId?: string) {
  const where = projectId ? { projectId } : undefined;
  return GalleryItem.findAll({
    where,
    order: [["createdAt", "DESC"]],
  });
}

export interface CreateGalleryItemsInput {
  projectId: string;
  uploadedBy: AccountRole;
  srcs: string[];
  caption?: string;
}

export async function createGalleryItemsService(input: CreateGalleryItemsInput) {
  const records = input.srcs.map((src) => ({
    projectId: input.projectId,
    uploadedBy: input.uploadedBy,
    src,
    caption: input.caption?.trim() || null,
  }));

  return GalleryItem.bulkCreate(records);
}

export async function updateGalleryCaptionService(
  id: string,
  actorProjectId: string,
  caption: string,
) {
  const item = await GalleryItem.findByPk(id);
  if (!item) throw new AppError("Gallery photo not found.", 404);
  if (item.projectId !== actorProjectId) {
    throw new AppError("Forbidden: cannot modify another project's photo.", 403);
  }

  item.caption = caption.trim() || null;
  await item.save();
  return item;
}

export async function deleteGalleryItemService(id: string, actorProjectId: string) {
  const item = await GalleryItem.findByPk(id);
  if (!item) throw new AppError("Gallery photo not found.", 404);
  if (item.projectId !== actorProjectId) {
    throw new AppError("Forbidden: cannot delete another project's photo.", 403);
  }
  await item.destroy();
}

