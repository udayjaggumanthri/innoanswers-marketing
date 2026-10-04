import type { Metadata } from "next";
import { StillFrame } from "@/components/still-frame";
import { getPublishedArticles } from "@/content/articles";

export function generateMetadata(): Metadata {
  const articles = getPublishedArticles();
  return {
    title: "Blogs",
    description:
      articles.length === 0 ? "No articles have been published yet." : "Published articles.",
  };
}

export default function BlogsPage() {
  const articles = getPublishedArticles();

  return (
    <div data-chamber="blogs">
      <h1>Blogs</h1>
      {articles.length === 0 ? (
        <p>No articles have been published yet.</p>
      ) : (
        <ul className="article-list">
          {articles.map((article) => (
            <li key={article.slug}>
              <a href={`/blogs/${article.slug}`}>{article.title}</a>
            </li>
          ))}
        </ul>
      )}
      {articles.length === 0 ? (
        <StillFrame beat="still" short />
      ) : (
        articles.map((article) => <StillFrame key={article.slug} beat="reveal" />)
      )}
    </div>
  );
}
