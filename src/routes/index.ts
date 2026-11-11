import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";
import { teamsRouter } from "../modules/teams/teams.routes.js";
import { galleryRouter } from "../modules/gallery/gallery.routes.js";
import { queriesRouter } from "../modules/queries/queries.routes.js";
import { bulletinsRouter } from "../modules/bulletins/bulletins.routes.js";
import { presentationsRouter } from "../modules/presentations/presentations.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

apiRouter.use(authRouter);
apiRouter.use("/bulletins", bulletinsRouter);
apiRouter.use("/gallery", galleryRouter);
apiRouter.use("/presentations", presentationsRouter);
apiRouter.use("/teams", teamsRouter);
apiRouter.use("/queries", queriesRouter);
