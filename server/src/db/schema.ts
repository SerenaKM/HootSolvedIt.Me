import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const tileTypeEnum = pgEnum("tile_type", [
  "clue",
  "suspect",
  "crime_scene",
  "accusation",
]);

// db for game sessions
export const gameSessions = pgTable("game_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"), // nullable for now as building for a guest-only gameplay
  caseId: uuid("case_id")
    .references(() => cases.id, { onDelete: "cascade" })
    .notNull(),
  currentTile: integer("current_tile").notNull().default(1),
  // determine the start and end tiles that have increased difficulty
  difficultyModifiers: jsonb("difficulty_modifiers")
    .notNull()
    .default(JSON.stringify([])),
  // for an array of discovered clues
  discoveredClues: jsonb("discovered_clues")
    .notNull()
    .default(JSON.stringify([])),
  // for an array of revealed suspects
  revealedSuspects: jsonb("revealed_suspects")
    .notNull()
    .default(JSON.stringify([])),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
});

// db for cases
export const cases = pgTable("cases", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("case_name", { length: 100 }).notNull(),
  background: text("background"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// db for crime scenes
export const crimeScenes = pgTable("crime_scenes", {
  id: uuid("id").primaryKey().defaultRandom(),
  caseId: uuid("case_id")
    .references(() => cases.id, { onDelete: "cascade" })
    .notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  description: text("description").notNull(),
  difficulty: integer("difficulty").notNull(),
  insight: varchar("insight", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// db for suspects
export const suspects = pgTable("suspects", {
  id: uuid("id").primaryKey().defaultRandom(),
  caseId: uuid("case_id")
    .references(() => cases.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  occupation: varchar("occupation", { length: 100 }).notNull(),
  relationshipToVictim: varchar("relationship_to_victiom", {
    length: 100,
  }).notNull(),
  possibleMotive: varchar("possible_motive", { length: 255 }).notNull(),
  claimedAlibi: varchar("claimed_alibi", { length: 255 }).notNull(),
  difficulty: integer("difficulty").notNull(),
  trueAlibi: varchar("true_alibi", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// db for clues
export const clues = pgTable("clues", {
  id: uuid("id").primaryKey().defaultRandom(),
  caseId: uuid("case_id")
    .references(() => cases.id, { onDelete: "cascade" })
    .notNull(),
  difficulty: integer("difficulty").notNull(),
  clueInfo: text("clue_info").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// db for board tiles
export const boardTiles = pgTable("board_tiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  caseId: uuid("case_id")
    .references(() => cases.id, { onDelete: "cascade" })
    .notNull(),
  tileIndex: integer("tile_index").notNull(),
  type: tileTypeEnum("tile_type").notNull(),
  crimeSceneId: uuid("crime_scene_id").references(() => crimeScenes.id, {
    onDelete: "cascade",
  }),
  suspectId: uuid("suspect_id").references(() => suspects.id, {
    onDelete: "cascade",
  }),
  clueId: uuid("clue_id").references(() => clues.id, { onDelete: "cascade" }),
  snakeTo: integer("snake_to_tile_index").notNull(),
  ladderTo: integer("ladder_to_tile_index").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// relationships between tables
export const caseRelations = relations(cases, ({ many }) => ({
  suspects: many(suspects),
  crimeScenes: many(crimeScenes),
  clues: many(clues),
  boardTiles: many(boardTiles),
}));

export const crimeScenesRelations = relations(crimeScenes, ({ one }) => ({
  case: one(cases, {
    fields: [crimeScenes.caseId],
    references: [cases.id],
  }),
}));

export const suspectRelations = relations(suspects, ({ one }) => ({
  case: one(cases, {
    fields: [suspects.caseId],
    references: [cases.id],
  }),
}));

export const clueRelations = relations(clues, ({ one }) => ({
  case: one(cases, {
    fields: [clues.caseId],
    references: [cases.id],
  }),
}));

export const boardTileRelations = relations(boardTiles, ({ one }) => ({
  case: one(cases, {
    fields: [boardTiles.caseId],
    references: [cases.id],
  }),
}));

// create a TypeScript type with the same fields as a database table
export type Case = typeof cases.$inferSelect;
export type NewCase = typeof cases.$inferInsert;
export type CrimeScene = typeof crimeScenes.$inferSelect;
export type NewCrimeScene = typeof crimeScenes.$inferInsert;
export type Suspect = typeof suspects.$inferSelect;
export type NewSuspect = typeof suspects.$inferInsert;
export type Clue = typeof clues.$inferSelect;
export type NewClue = typeof clues.$inferInsert;
export type BoardTile = typeof boardTiles.$inferSelect;
export type NewBoardTile = typeof boardTiles.$inferInsert;

// define required fields for creating new
export const insertCaseSchema = createInsertSchema(cases);
export const insertCrimeSceneSchema = createInsertSchema(crimeScenes);
export const insertSuspectSchema = createInsertSchema(suspects);
export const insertClueSchema = createInsertSchema(clues);
export const insertBoardTileSchema = createInsertSchema(boardTiles);

// fields returned when querying
export const selectCaseSchema = createSelectSchema(cases);
export const selectCrimeSceneSchema = createSelectSchema(crimeScenes);
export const selectSuspectSchema = createSelectSchema(suspects);
export const selectClueSchema = createSelectSchema(clues);
export const selectBoardTilesSchema = createSelectSchema(boardTiles);
