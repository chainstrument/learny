import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Learny",
    template: "%s · Learny",
  },
  description:
    "Notes et retours d'expérience sur le développement web fullstack.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-semibold">
              Learny
            </Link>
            <nav className="text-sm text-black/60 dark:text-white/60">
              <Link href="/" className="hover:text-foreground">
                Articles
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-2xl px-6 py-6 text-sm text-black/50 dark:text-white/50">
            © {new Date().getFullYear()} Learny
          </div>
        </footer>
      </body>
    </html>
  );
}
