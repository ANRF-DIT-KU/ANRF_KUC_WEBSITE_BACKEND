import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import {
  createBulletinService,
  deleteBulletinService,
  listBulletinsService,
  updateBulletinService,
} from "./bulletins.service.js";

export const listBulletinsController = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.query.projectId ? String(req.query.projectId) : undefined;
  const bulletins = await listBulletinsService(projectId);
  res.json(bulletins);
});

export const createBulletinController = asyncHandler(async (req: Request, res: Response) => {
  const { volume, issue, title, summary, publishDate, themeColor } = req.body;
  if (!volume || !issue || !title || !summary) {
    throw new AppError("Volume, issue, title, and summary are required.", 400);
  }

  const file = req.file;
  const downloadUrl = file ? `/uploads/${file.filename}` : undefined;
  const fileName = file ? file.originalname : undefined;

  const created = await createBulletinService({
    projectId: req.user!.projectId,
    volume,
    issue,
    title,
    summary,
    publishDate,
    themeColor,
    downloadUrl,
    fileName,
  });

  res.status(201).json(created);
});

export const updateBulletinController = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { volume, issue, title, summary, publishDate, themeColor } = req.body;
  if (!volume || !issue || !title || !summary) {
    throw new AppError("Volume, issue, title, and summary are required.", 400);
  }

  const file = req.file;
  const downloadUrl = file ? `/uploads/${file.filename}` : undefined;
  const fileName = file ? file.originalname : undefined;

  const updated = await updateBulletinService(id, req.user!.projectId, {
    projectId: req.user!.projectId,
    volume,
    issue,
    title,
    summary,
    publishDate,
    themeColor,
    downloadUrl,
    fileName,
  });

  res.json(updated);
});

export const deleteBulletinController = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);
  await deleteBulletinService(id, req.user!.projectId);
  res.status(204).send();
});

