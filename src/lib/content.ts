import { getCollection, type CollectionEntry } from 'astro:content';

export const ARTIST = 'Fatmir Mustafa Karllo';

/** Numeric value used to sort by year; undated entries sort last. */
function yearValue(year: number | string | undefined): number {
  if (year === undefined) return -Infinity;
  const match = String(year).match(/\d{4}/g);
  return match ? Math.max(...match.map(Number)) : -Infinity;
}

export async function getWorks() {
  const works = await getCollection('works', ({ data }) => !data.draft);
  return works.sort(
    (a, b) =>
      yearValue(b.data.year) - yearValue(a.data.year) ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title),
  );
}

export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function getTexts() {
  const texts = await getCollection('texts', ({ data }) => !data.draft);
  return texts.sort((a, b) => yearValue(b.data.year) - yearValue(a.data.year));
}

export type Entry = CollectionEntry<'works'> | CollectionEntry<'projects'>;
