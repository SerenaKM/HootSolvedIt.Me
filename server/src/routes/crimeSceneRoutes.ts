import { Router } from "express";
import { getCrimeScene } from "../controllers/crimeSceneController.ts";

const router = Router();

router.get("/:id", getCrimeScene);

export default router;
