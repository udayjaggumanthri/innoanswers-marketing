import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getPublishedArticles } from "@/content/articles";

const pagePaths = [
  "/",
  "/about",
  "/services",
  "/solutions",
  "/blogs",
  "/contact",
  "/legal",
  "/privacy",
] as const;

function originFromRequest(headerList: Headers): string | null {
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  if (!host || !/^[a-zA-Z0-9.-]+(?::\d+)?$/.test(host)) {
    return null;
  }
  const forwardedProto = headerList.get("x-forwarded-proto");
  const proto = forwardedProto === "https" ? "https" : "http";
  return `${proto}://${host}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = originFromRequest(await headers());
  if (!origin) {
    return [];
  }

  const paths = [
    ...pagePaths,
    ...getPublishedArticles().map((article) => `/blogs/${article.slug}`),
  ];

  return paths.map((path) => ({
    url: new URL(path, origin).href,
  }));
}
