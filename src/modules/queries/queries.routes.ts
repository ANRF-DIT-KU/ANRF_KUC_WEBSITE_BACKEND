import { Router } from "express";
import { authenticate, requirePI } from "../../middlewares/auth.middleware.js";
import {
  createQueryController,
  deleteQueryController,
  listQueriesController,
  updateQueryReadController,
} from "./queries.controller.js";

export const queriesRouter = Router();

// Public contact form submission
queriesRouter.post("/", createQueryController);

// PI-protected query management
queriesRouter.get("/", authenticate, requirePI, listQueriesController);
queriesRouter.patch("/:id", authenticate, requirePI, updateQueryReadController);
queriesRouter.delete("/:id", authenticate, requirePI, deleteQueryController);

