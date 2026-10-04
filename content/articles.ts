/**
 * REPLACEABLE STAND-IN.
 * Swap a post without changing page code.
 * published is the switch: false omits that post, its plane, and its beat.
 * No real person, client, or verified result belongs here.
 */
export type Article = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly paragraphs: readonly string[];
  readonly published: boolean;
  readonly replaceable: true;
};

const PUBLISHED_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const blogsStandIn = {
  replaceable: true,
  intro: "Notes on how the work starts and how it stays small.",
  description: "Sample notes from the practice.",
} as const;

export const articles: readonly Article[] = [
  {
    slug: "starting-from-the-work",
    title: "Starting from the work",
    summary: "Name the problem before choosing a tool.",
    paragraphs: [
      "A useful start is a plain description of the work, written so someone new can follow it.",
      "The tool comes after that description, not before it.",
    ],
    published: true,
    replaceable: true,
  },
  {
    slug: "keeping-the-scope-small",
    title: "Keeping the scope small",
    summary: "Stop at a decision the organization can explain.",
    paragraphs: [
      "A small scope is one that names what will change and what will be left alone.",
      "The note ends when that line is clear. It does not report a measured result.",
    ],
    published: true,
    replaceable: true,
  },
];

export function getPublishedArticles(): readonly Article[] {
  return articles.filter(
    (article) => article.published && PUBLISHED_SLUG.test(article.slug),
  );
}

export function getPublishedArticle(slug: string): Article | undefined {
  return getPublishedArticles().find((article) => article.slug === slug);
}
