import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import {
  createGalleryItemsService,
  deleteGalleryItemService,
  listGalleryService,
  updateGalleryCaptionService,
} from "./gallery.service.js";

export const listGalleryController = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.query.projectId ? String(req.query.projectId) : undefined;
  const items = await listGalleryService(projectId);
  res.json(items);
});

export const uploadGalleryController = asyncHandler(async (req: Request, res: Response) => {
  const files = (req.files as Express.Multer.File[]) || [];
  if (files.length === 0) {
    throw new AppError("At least one image file is required.", 400);
  }

  const srcs = files.map((f) => `/uploads/${f.filename}`);
  const created = await createGalleryItemsService({
    projectId: req.user!.projectId,
    uploadedBy: req.user!.role,
    srcs,
    caption: req.body.caption,
  });

  res.status(201).json(created);
});

export const updateGalleryCaptionController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const caption = String(req.body.caption ?? "");
    const updated = await updateGalleryCaptionService(id, req.user!.projectId, caption);
    res.json(updated);
  },
);

export const deleteGalleryController = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);
  await deleteGalleryItemService(id, req.user!.projectId);
  res.status(204).send();
});

