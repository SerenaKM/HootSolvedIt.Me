import { Router } from "express";

const router = Router();

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "got a tile!" });
});

export default router;
