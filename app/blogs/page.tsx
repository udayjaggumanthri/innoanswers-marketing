import type { Metadata } from "next";
import { getPublishedArticles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Blogs",
};

export default function BlogsPage() {
  const articles = getPublishedArticles();

  return (
    <>
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
    </>
  );
}
