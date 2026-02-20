import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.status(200).json({ message: "created a new session!" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "got a session!" });
});

router.patch("/:id", (req, res) => {
  res.status(200).json({ message: "updated a session!" });
});

export default router;
