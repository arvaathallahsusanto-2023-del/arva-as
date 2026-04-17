import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// === TABLE DEFINITIONS ===

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., "Moneter & Kekuasaan"
  slug: text("slug").notNull().unique(),
  description: text("description"),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(), // Short description/deck
  content: text("content").notNull(), // Long form content
  coverImageUrl: text("cover_image_url"),
  authorId: integer("author_id").references(() => authors.id),
  categoryId: integer("category_id").references(() => categories.id),
  isFeatured: boolean("is_featured").default(false),
  readTime: integer("read_time"), // in minutes
  publishedAt: timestamp("published_at").defaultNow(),
});

export const posyanduPatients = pgTable("posyandu_patients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nik: text("nik").unique(), // Optional for infants, required for adults
  type: text("type").notNull(), // "BAYI_BALITA", "IBU_HAMIL", "LANSIA"
  dob: timestamp("dob").notNull(),
  gender: text("gender").notNull(), // "L", "P"
  parentName: text("parent_name"), // For infants
  address: text("address"),
  registeredAt: timestamp("registered_at").defaultNow(),
});

export const posyanduRecords = pgTable("posyandu_records", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => posyanduPatients.id),
  checkupDate: timestamp("checkup_date").defaultNow(),
  weight: text("weight"), // stored as text to allow flexible units or notes, or numeric string
  height: text("height"),
  headCircumference: text("head_circumference"), // for infants
  bloodPressure: text("blood_pressure"), // for elderly/pregnant
  notes: text("notes"),
  officerName: text("officer_name"),
});

// === RELATIONS ===

export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(authors, {
    fields: [articles.authorId],
    references: [authors.id],
  }),
  category: one(categories, {
    fields: [articles.categoryId],
    references: [categories.id],
  }),
}));

export const authorsRelations = relations(authors, ({ many }) => ({
  articles: many(articles),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  articles: many(articles),
}));


export const posyanduPatientsRelations = relations(posyanduPatients, ({ many }) => ({
  records: many(posyanduRecords),
}));

export const posyanduRecordsRelations = relations(posyanduRecords, ({ one }) => ({
  patient: one(posyanduPatients, {
    fields: [posyanduRecords.patientId],
    references: [posyanduPatients.id],
  }),
}));

export const insertAuthorSchema = createInsertSchema(authors);
export const insertCategorySchema = createInsertSchema(categories);
export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  publishedAt: true
});

export const insertPosyanduPatientSchema = createInsertSchema(posyanduPatients);
export const insertPosyanduRecordSchema = createInsertSchema(posyanduRecords);

// === EXPLICIT TYPES ===

export type Author = typeof authors.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Article = typeof articles.$inferSelect;

export type InsertArticle = z.infer<typeof insertArticleSchema>;

// Response types with relations
export type ArticleWithRelations = Article & {
  author: Author | null;
  category: Category | null;
};
