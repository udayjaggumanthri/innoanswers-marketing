export type Offering = {
  readonly slug: string;
  readonly title: string;
  readonly published: boolean;
};

export const offerings: readonly Offering[] = [];

export function getPublishedOfferings(): readonly Offering[] {
  return offerings.filter(
    (offering) => offering.published && offering.title.trim().length > 0,
  );
}
