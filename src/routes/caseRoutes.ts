import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "all cases!" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "got a case!" });
});

export default router;
