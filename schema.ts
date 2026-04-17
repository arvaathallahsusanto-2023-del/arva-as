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

// === ECOSYSTEM TABLES ===

export const ecoStakeholders = pgTable("eco_stakeholders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  cluster: text("cluster").notNull(), // "Akademisi", "Industri & Bisnis", "Regulator", etc.
  institution: text("institution").notNull(),
  role: text("role").notNull(), // "Dosen", "CEO", "Peneliti", etc.
  contactEmail: text("contact_email"),
  bio: text("bio"),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const ecoResearchWorks = pgTable("eco_research_works", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  abstract: text("abstract"),
  authorId: integer("author_id").references(() => ecoStakeholders.id),
  researchArea: text("research_area").notNull(), // "Perbankan", "Zakat & Wakaf", dll
  publishedYear: integer("published_year"),
  paperUrl: text("paper_url"),
  addedAt: timestamp("added_at").defaultNow(),
});

// A simple many-to-many junction to show which stakeholders are collaborating or connected
export const ecoConnections = pgTable("eco_connections", {
  id: serial("id").primaryKey(),
  sourceId: integer("source_id").references(() => ecoStakeholders.id).notNull(),
  targetId: integer("target_id").references(() => ecoStakeholders.id).notNull(),
  connectionType: text("connection_type").default("Kolaborator"),
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

export const ecoStakeholdersRelations = relations(ecoStakeholders, ({ many }) => ({
  researchWorks: many(ecoResearchWorks),
  connectionsInitiated: many(ecoConnections, { relationName: "sourceConnection" }),
  connectionsReceived: many(ecoConnections, { relationName: "targetConnection" })
}));

export const ecoResearchWorksRelations = relations(ecoResearchWorks, ({ one }) => ({
  author: one(ecoStakeholders, {
    fields: [ecoResearchWorks.authorId],
    references: [ecoStakeholders.id],
  }),
}));

export const ecoConnectionsRelations = relations(ecoConnections, ({ one }) => ({
  source: one(ecoStakeholders, {
    fields: [ecoConnections.sourceId],
    references: [ecoStakeholders.id],
    relationName: "sourceConnection"
  }),
  target: one(ecoStakeholders, {
    fields: [ecoConnections.targetId],
    references: [ecoStakeholders.id],
    relationName: "targetConnection"
  }),
}));

export const insertPosyanduPatientSchema = createInsertSchema(posyanduPatients);
export const insertPosyanduRecordSchema = createInsertSchema(posyanduRecords);

export const insertEcoStakeholderSchema = createInsertSchema(ecoStakeholders);
export const insertEcoResearchWorkSchema = createInsertSchema(ecoResearchWorks);
export const insertEcoConnectionSchema = createInsertSchema(ecoConnections);

// === EXPLICIT TYPES ===

export type Author = typeof authors.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Article = typeof articles.$inferSelect;

export type InsertArticle = z.infer<typeof insertArticleSchema>;

export type EcoStakeholder = typeof ecoStakeholders.$inferSelect;
export type EcoResearchWork = typeof ecoResearchWorks.$inferSelect;
export type EcoConnection = typeof ecoConnections.$inferSelect;

// Response types with relations
export type ArticleWithRelations = Article & {
  author: Author | null;
  category: Category | null;
};
