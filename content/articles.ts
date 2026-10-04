export type Article = {
  readonly slug: string;
  readonly title: string;
  readonly published: boolean;
};

const PUBLISHED_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const articles: readonly Article[] = [];

export function getPublishedArticles(): readonly Article[] {
  return articles.filter(
    (article) => article.published && PUBLISHED_SLUG.test(article.slug),
  );
}

export function getPublishedArticle(slug: string): Article | undefined {
  return getPublishedArticles().find((article) => article.slug === slug);
}
