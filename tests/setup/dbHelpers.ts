import { db } from "../../src/db/connection.ts";
import {
  cases,
  crimeScenes,
  suspects,
  clues,
  boardTiles,
  NewCase,
} from "../../src/db/schema.ts";

export const createTestCase = async (caseData: Partial<NewCase> = {}) => {
  const defaultData = {
    background: "It was a cold and rainy night",
  };

  const [testCase] = await db
    .insert(cases)
    .values({ ...defaultData })
    .returning();

  return testCase;
};

export const cleanupDatabase = async () => {
  await db.delete(cases);
  await db.delete(crimeScenes);
  await db.delete(suspects);
  await db.delete(clues);
  await db.delete(boardTiles);
};
