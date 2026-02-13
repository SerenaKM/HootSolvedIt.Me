import { db } from "../../src/db/connection.ts";
import {
  cases,
  suspects,
  crimeScenes,
  clues,
  gameSessions,
  boardTiles,
} from "../../src/db/schema.ts";
import { sql } from "drizzle-orm";
import { execSync } from "child_process";

export default async function setup() {
  console.log("Setting up test database");

  try {
    // exec method to take raw SQL and use template-tagged SQL objects that can substitute tables and infer SQL names
    await db.execute(sql`DROP TABLE IF EXISTS ${cases} CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS ${suspects} CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS ${crimeScenes} CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS ${clues} CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS ${gameSessions} CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS ${boardTiles} CASCADE`);

    console.log("Pushing schema using drizzle-kit");
    execSync(
      // run Bash commands
      // push latest database schema - avoid loading unnecessary environment variables
      `npx drizzle-kit push --url="${process.env.DATABASE_URL}" --schema="./src/db/schema.ts" --dialect="postgresql"`,
      {
        stdio: "inherit",
        cwd: process.cwd(),
      },
    );

    console.log("Test database created");
  } catch (e) {
    console.error("Failed to setup test database", e);
    throw e;
  }

  return async () => {
    try {
      await db.execute(sql`DROP TABLE IF EXISTS ${cases} CASCADE`);
      await db.execute(sql`DROP TABLE IF EXISTS ${suspects} CASCADE`);
      await db.execute(sql`DROP TABLE IF EXISTS ${crimeScenes} CASCADE`);
      await db.execute(sql`DROP TABLE IF EXISTS ${clues} CASCADE`);
      await db.execute(sql`DROP TABLE IF EXISTS ${gameSessions} CASCADE`);
      await db.execute(sql`DROP TABLE IF EXISTS ${boardTiles} CASCADE`);
      process.exit(0);
    } catch (e) {
      console.error("Failed to setup test database", e);
      throw e;
    }
  };
}
