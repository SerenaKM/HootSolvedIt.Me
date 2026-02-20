// app definition
import express from "express";
import caseRoutes from "./routes/caseRoutes.ts";
import crimeSceneRoutes from "./routes/crimeSceneRoutes.ts";
import suspectRoutes from "./routes/suspectsRoutes.ts";
import cluesRoutes from "./routes/cluesRoutes.ts";
import gameSessionRoutes from "./routes/gameSessionRoutes.ts";
import boardTileRoutes from "./routes/boardTileRoutes.ts";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { isTest } from "../../env.ts";
import { errorHandler } from "./middleware/errorHandler.ts";

const app = express();

// global middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://hootsolvedit.me",
      "https://owlwoofy.hootsolvedit.me",
    ],
  }),
);
app.use(express.json()); // ensure request payloads can be accessed as ovjects
app.use(express.urlencoded({ extended: true })); // help handle URL-encoded query strings in HTTP requests
app.use(
  morgan("dev", {
    skip: () => isTest(),
  }),
);

// check server is still running
app.get("/health", (req, res) => {
  res.status(200).json({ message: "hello" });
});

// routes
app.use("/api/cases", caseRoutes);
app.use("/api/case", caseRoutes);
app.use("/api/crimescene", crimeSceneRoutes);
app.use("/api/suspects", suspectRoutes);
app.use("/api/clues", cluesRoutes);
app.use("/api/gamesessions", gameSessionRoutes);
app.use("/api/boardtile", boardTileRoutes);

app.use(errorHandler);

// available to import as a named import
export { app };
// available as a default import
export default app;
