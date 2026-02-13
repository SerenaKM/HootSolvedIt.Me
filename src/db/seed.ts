import fs from "node:fs/promises";
import path from "path";
import { db } from "./connection.ts";
import {
  cases,
  suspects,
  crimeScenes,
  clues,
  gameSessions,
  boardTiles,
} from "./schema.ts";

const CASE_PATH = path.join(".", "src/data/case-data.json");
const CRIME_SCENE_PATH = path.join(".", "src/data/crime-scene-data.json");
const SUSPECT_PATH = path.join(".", "src/data/suspect-data.json");
const CLUE_PATH = path.join(".", "src/data/clue-data.json");
const BOARD_TILE_PATH = path.join(".", "src/data/board-tile-data.json");

const seed = async () => {
  console.log("🦉 Starting database seed... 🦉");
  console.log("DB URL:", process.env.DATABASE_URL_DEV);

  try {
    // clear db
    console.log("Clearing existing data...");
    await db.delete(boardTiles);
    await db.delete(clues);
    await db.delete(crimeScenes);
    await db.delete(suspects);
    await db.delete(cases);

    // insert case first to get caseIds
    const case_file = await fs.readFile(CASE_PATH, "utf-8");
    const case_data = JSON.parse(case_file);
    console.log("Inserting case data...");
    const insertedCases = await db.insert(cases).values(case_data).returning();

    // insert crime scenes
    const crime_scene_file = await fs.readFile(CRIME_SCENE_PATH, "utf-8");
    const crime_scene_data = JSON.parse(crime_scene_file);
    const crime_scene_rows = crime_scene_data.map((crime_scene_info) => ({
      ...crime_scene_info,
      caseId: insertedCases[crime_scene_info.caseIndex].id, // use the postgresql generated caseId
    }));
    const insertedCrimeScenes = await db
      .insert(crimeScenes)
      .values(crime_scene_rows)
      .returning();

    // insert suspects
    const suspect_file = await fs.readFile(SUSPECT_PATH, "utf-8");
    const suspect_data = JSON.parse(suspect_file);
    const suspect_rows = suspect_data.map((suspect_info) => ({
      ...suspect_info,
      caseId: insertedCases[suspect_info.caseIndex].id, // use the postgresql generated caseId
    }));
    const insertedSuspects = await db
      .insert(suspects)
      .values(suspect_rows)
      .returning();

    // insert clues
    const clue_file = await fs.readFile(CLUE_PATH, "utf-8");
    const clue_data = JSON.parse(clue_file);
    const clue_rows = clue_data.map((clue_info) => ({
      ...clue_info,
      caseId: insertedCases[clue_info.caseIndex].id, // use the postgresql generated caseId
    }));
    const insertedClues = await db.insert(clues).values(clue_rows).returning();

    // then populate board tile db
    const board_file = await fs.readFile(BOARD_TILE_PATH, "utf-8");
    const board_data = JSON.parse(board_file);
    console.log("Inserting board tile data...");
    const board_rows = board_data.map((tile) => ({
      ...tile,
      caseId: insertedCases[tile.caseIndex].id, // use the postgresql generated caseId
      crimeSceneId:
        tile.crimeSceneIndex != null
          ? insertedCrimeScenes[tile.crimeSceneIndex].id // use the postgresql generated crimeSceneId
          : null,
      suspectId:
        tile.suspectIndex != null
          ? insertedSuspects[tile.suspectIndex].id // use the postgresql generated suspectId
          : null,
      clueId: tile.clueIndex != null ? insertedClues[tile.clueIndex].id : null, // use the postgresql generated clueId
    }));

    await db.insert(boardTiles).values(board_rows).returning();

    console.log("✅ All databases seeded successfully...");
  } catch (e) {
    console.log("❌ Seed failed!");
    console.log(e);
    process.exit(1);
  }
};

// prevent script automatically running when imported into another file, allow programmatic execution from the terminal
if (import.meta.url === new URL(import.meta.resolve("./seed.ts")).href) {
  seed()
    .then(() => process.exit(0))
    .catch((e) => process.exit(1));
}

export default seed;
