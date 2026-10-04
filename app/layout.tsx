import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "%s",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="mx-auto w-full max-w-3xl flex-1 px-5 py-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
