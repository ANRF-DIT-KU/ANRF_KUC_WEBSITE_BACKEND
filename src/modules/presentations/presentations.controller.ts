import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import {
  createPresentationService,
  deletePresentationService,
  listPresentationsService,
} from "./presentations.service.js";

export const listPresentationsController = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = req.query.projectId ? String(req.query.projectId) : undefined;
    const items = await listPresentationsService(projectId);
    res.json(items);
  },
);

export const createPresentationController = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, date, venue, speaker, department } = req.body;
    if (!title || !date || !venue) {
      throw new AppError("Title, date, and venue are required.", 400);
    }

    const file = req.file;
    const slidesUrl = file ? `/uploads/${file.filename}` : undefined;
    const fileName = file ? file.originalname : undefined;

    const projectId =
      req.user!.role === "admin" && req.body.projectId
        ? String(req.body.projectId)
        : req.user!.projectId;

    const created = await createPresentationService({
      projectId,
      title,
      date,
      venue,
      speaker,
      department,
      slidesUrl,
      fileName,
    });

    res.status(201).json(created);
  },
);

export const deletePresentationController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await deletePresentationService(id, req.user!.projectId, req.user!.role);
    res.status(204).send();
  },
);

