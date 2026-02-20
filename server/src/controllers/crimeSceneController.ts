import type { Request, Response } from "express";
import { db } from "../db/connection.ts";
import { crimeScenes } from "../db/schema.ts";
import { eq } from "drizzle-orm";

export const getCrimeScene = async (req: Request, res: Response) => {
  try {
    const crimeScene = await db.query.crimeScenes.findFirst({
      where: eq(crimeScenes.caseId, req.params.id),
    });

    res.json({
      crimeScene,
    });
  } catch (e) {
    console.error("Get crime scene error", e);
    res.status(500).json({ message: "Failed to get crime scene" });
  }
};
