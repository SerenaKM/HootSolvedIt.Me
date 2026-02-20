import type { Request, Response } from "express";
import { db } from "../db/connection.ts";
import { cases } from "../db/schema.ts";

export const getCases = async (req: Request, res: Response) => {
  try {
    const mysteryCases = await db.select().from(cases);
    res.json(mysteryCases);
  } catch (e) {
    console.error("Get cases error", e);
    res.status(500).json({ message: "Failed to fetch cases" });
  }
};
