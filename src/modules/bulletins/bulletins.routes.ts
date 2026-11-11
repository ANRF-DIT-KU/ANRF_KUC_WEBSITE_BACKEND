import { Router } from "express";
import { authenticate, requirePI } from "../../middlewares/auth.middleware.js";
import { uploadMiddleware } from "../../middlewares/upload.middleware.js";
import {
  createBulletinController,
  deleteBulletinController,
  listBulletinsController,
  updateBulletinController,
} from "./bulletins.controller.js";

export const bulletinsRouter = Router();

bulletinsRouter.get("/", listBulletinsController);
bulletinsRouter.post(
  "/",
  authenticate,
  requirePI,
  uploadMiddleware.single("file"),
  createBulletinController,
);
bulletinsRouter.put(
  "/:id",
  authenticate,
  requirePI,
  uploadMiddleware.single("file"),
  updateBulletinController,
);
bulletinsRouter.delete("/:id", authenticate, requirePI, deleteBulletinController);

