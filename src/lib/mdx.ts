import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";

export function CompileMDX(source: string) {
  return compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeKatex,
          [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
        ],
      },
    },
  });
}
