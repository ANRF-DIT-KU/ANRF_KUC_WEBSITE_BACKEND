import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import {
  createQueryService,
  deleteQueryService,
  listQueriesForProjectService,
  updateQueryReadService,
} from "./queries.service.js";

export const listQueriesController = asyncHandler(async (req: Request, res: Response) => {
  const queries = await listQueriesForProjectService(req.user!.projectId);
  res.json(queries);
});

export const createQueryController = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, subject, message, projectId } = req.body;
  if (!name || !email || !subject || !message) {
    throw new AppError("Name, email, subject, and message are required.", 400);
  }
  const created = await createQueryService({ name, email, subject, message, projectId });
  res.status(201).json(created);
});

export const updateQueryReadController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { read } = req.body;
    const updated = await updateQueryReadService(id, req.user!.projectId, Boolean(read));
    res.json(updated);
  },
);

export const deleteQueryController = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);
  await deleteQueryService(id, req.user!.projectId);
  res.status(204).send();
});

