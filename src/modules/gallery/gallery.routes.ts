import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { uploadMiddleware } from "../../middlewares/upload.middleware.js";
import {
  deleteGalleryController,
  listGalleryController,
  updateGalleryCaptionController,
  uploadGalleryController,
} from "./gallery.controller.js";

export const galleryRouter = Router();

galleryRouter.get("/", listGalleryController);
galleryRouter.post(
  "/",
  authenticate,
  uploadMiddleware.array("files", 20),
  uploadGalleryController,
);
galleryRouter.patch("/:id", authenticate, updateGalleryCaptionController);
galleryRouter.delete("/:id", authenticate, deleteGalleryController);

