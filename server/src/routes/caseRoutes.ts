import { Router } from "express";
import { getCases } from "../controllers/caseController.ts";

const router = Router();

router.get("/", getCases);

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "got a case!" });
});

export default router;
