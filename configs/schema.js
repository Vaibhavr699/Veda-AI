import { boolean } from "drizzle-orm/gel-core";
import { pgTable, text, varchar, serial, json } from "drizzle-orm/pg-core";


export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isMember:boolean().default(false)
});

export const STUDY_MATERIAL_TABLE = pgTable("study_material", {
  id: serial().primaryKey(),
  courseID: varchar({ length: 255 }).notNull(),
  courseType: varchar({ length: 255 }).notNull(),
  topic: varchar({ length: 255 }).notNull(),
  difficulty: varchar({ length: 255 }).default("easy"),
  courseLayout: json().notNull(),
  createdBy: varchar().notNull(),
  status: varchar().default('Generating...')
});

export const CHAPTER_NOTES_TABLE = pgTable("chapters_notes", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: serial().notNull(),
  notes: text().notNull()
});

