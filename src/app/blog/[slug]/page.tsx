import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CompileMDX } from "@/lib/mdx";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await CompileMDX(post.content);

  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      <header>
        <div className="flex items-center gap-3 text-sm text-black/50 dark:text-white/50">
          <time dateTime={post.meta.date}>{post.meta.date}</time>
          <span aria-hidden>·</span>
          <span>{post.meta.category}</span>
          <span aria-hidden>·</span>
          <span>{post.meta.readingTime}</span>
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {post.meta.title}
        </h1>
        {post.meta.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs text-black/60 dark:bg-white/10 dark:text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        {content}
      </div>
    </article>
  );
}
