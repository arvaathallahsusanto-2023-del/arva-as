import { db } from "./db.js";
import {
  articles,
  categories,
  authors,
  type Article,
  type Category,
  type Author,
  type InsertArticle,
  type ArticleWithRelations,
} from "./schema.js";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  getArticles(categorySlug?: string, limit?: number): Promise<ArticleWithRelations[]>;
  getArticleBySlug(slug: string): Promise<ArticleWithRelations | undefined>;
  getCategories(): Promise<Category[]>;
  // Seed/Admin methods
  createAuthor(author: typeof authors.$inferInsert): Promise<Author>;
  createCategory(category: typeof categories.$inferInsert): Promise<Category>;
  createArticle(article: InsertArticle): Promise<Article>;
  getAuthorByName(name: string): Promise<Author | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getArticleBySlugSimple(slug: string): Promise<Article | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getArticles(categorySlug?: string, limit?: number): Promise<ArticleWithRelations[]> {
    let query = db.query.articles.findMany({
      with: {
        author: true,
        category: true,
      },
      orderBy: desc(articles.publishedAt),
      limit: limit,
      where: categorySlug
        ? (table: any, { exists, select }: { exists: any, select: any }) =>
            exists(
              select()
                .from(categories)
                .where(
                  and(
                    eq(categories.slug, categorySlug),
                    eq(categories.id, table.categoryId)
                  )
                )
            )
        : undefined,
    });
    
    return await query;
  }

  async getArticleBySlug(slug: string): Promise<ArticleWithRelations | undefined> {
    return await db.query.articles.findFirst({
      where: eq(articles.slug, slug),
      with: {
        author: true,
        category: true,
      },
    });
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  // Seed/Admin methods
  async createAuthor(author: typeof authors.$inferInsert): Promise<Author> {
    const [newAuthor] = await db.insert(authors).values(author).returning();
    return newAuthor;
  }

  async createCategory(category: typeof categories.$inferInsert): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const [newArticle] = await db.insert(articles).values(article).returning();
    return newArticle;
  }
  
  async getAuthorByName(name: string): Promise<Author | undefined> {
    return await db.query.authors.findFirst({
      where: eq(authors.name, name),
    });
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return await db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });
  }

  async getArticleBySlugSimple(slug: string): Promise<Article | undefined> {
    return await db.query.articles.findFirst({
        where: eq(articles.slug, slug),
    });
  }
}

export const storage = new DatabaseStorage();
