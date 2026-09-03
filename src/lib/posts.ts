import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  draft: boolean;
  readingTime: string;
};

export type Post = {
  meta: PostMeta;
  content: string;
};

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "");
  const fullPath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const meta: PostMeta = {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    category: data.category ?? "Non classé",
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: Boolean(data.draft),
    readingTime: readingTime(content).text,
  };

  return { meta, content };
}

function isPublished(meta: PostMeta): boolean {
  // Les brouillons restent visibles en dev, masqués en production.
  return !meta.draft || process.env.NODE_ENV !== "production";
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const filenames = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  return filenames
    .map((filename) => readPostFile(filename).meta)
    .filter(isPublished)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  return readPostFile(`${slug}.mdx`);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  return Array.from(new Set(posts.map((p) => p.category))).sort();
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  return Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
}
