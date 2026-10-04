import type { Metadata } from "next";
import { HallLoader } from "@/components/hall-loader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "%s",
  },
  description: "The opening stays still until you scroll.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <SkipLink />
        <HallLoader />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-5 pt-4 pb-8 sm:pt-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
