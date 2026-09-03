#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function slugify(title) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // retire les accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Usage: npm run new-post -- "Titre de mon article"');
  process.exit(1);
}

const slug = slugify(title);
if (!slug) {
  console.error("Impossible de générer un slug à partir de ce titre.");
  process.exit(1);
}

const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

if (fs.existsSync(filePath)) {
  console.error(`Un article existe déjà avec ce slug : ${slug}.mdx`);
  process.exit(1);
}

const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${todayISO()}"
description: ""
category: ""
tags: []
draft: true
---

`;

fs.mkdirSync(POSTS_DIR, { recursive: true });
fs.writeFileSync(filePath, frontmatter, "utf8");

console.log(`Article créé : content/posts/${slug}.mdx`);
console.log(`URL une fois publié : /blog/${slug}`);
