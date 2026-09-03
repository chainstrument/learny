import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Articles</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        Notes et retours d&apos;expérience sur le développement web fullstack.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-black/50 dark:text-white/50">
          Aucun article pour le moment.
        </p>
      ) : (
        <ul className="mt-10 flex flex-col gap-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex items-center gap-3 text-sm text-black/50 dark:text-white/50">
                  <time dateTime={post.date}>{post.date}</time>
                  <span aria-hidden>·</span>
                  <span>{post.category}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-1 text-lg font-medium group-hover:underline">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="mt-1 text-black/70 dark:text-white/70">
                    {post.description}
                  </p>
                )}
                {post.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs text-black/60 dark:bg-white/10 dark:text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
