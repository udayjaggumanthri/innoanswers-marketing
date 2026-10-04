import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StillFrame } from "@/components/still-frame";
import { getPublishedArticle, getPublishedArticles } from "@/content/articles";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticle(slug);
  if (!article) {
    return { title: "Page not found" };
  }
  return { title: article.title, description: article.summary };
}

export default async function BlogArticlePage({
  params,
}: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const article = getPublishedArticle(slug);
  if (!article) {
    notFound();
  }

  return (
    <div data-chamber="blogs">
      <article>
        <h1>{article.title}</h1>
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
      <StillFrame beat="still" shot="held" />
    </div>
  );
}
