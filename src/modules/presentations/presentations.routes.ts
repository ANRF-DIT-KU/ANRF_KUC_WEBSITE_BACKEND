import { Router } from "express";
import { authenticate, requirePI } from "../../middlewares/auth.middleware.js";
import { uploadMiddleware } from "../../middlewares/upload.middleware.js";
import {
  createPresentationController,
  deletePresentationController,
  listPresentationsController,
} from "./presentations.controller.js";

export const presentationsRouter = Router();

presentationsRouter.get("/", listPresentationsController);
presentationsRouter.post(
  "/",
  authenticate,
  requirePI,
  uploadMiddleware.single("file"),
  createPresentationController,
);
presentationsRouter.delete("/:id", authenticate, requirePI, deletePresentationController);

