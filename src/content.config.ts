import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/*
 * Works and projects share the same shape: a title, a year, optional
 * material/dimensions, and a list of photos with a per-photo caption.
 * The Markdown body is the description.
 */
const imageList = (image: () => any) =>
  z
    .array(
      z.object({
        src: image(),
        caption: z.string().optional(),
        alt: z.string().optional(),
      }),
    )
    .default([]);

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.union([z.number(), z.string()]).optional(),
      material: z.string().optional(),
      dimensions: z.string().optional(),
      images: imageList(image),
      // Position among works of the same year (lower comes first)
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.union([z.number(), z.string()]).optional(),
      // Grey line on the projects index, e.g. "Since 2022 · Butoc, Pristina"
      meta: z.string().optional(),
      // Short text on the projects index
      summary: z.string().optional(),
      material: z.string().optional(),
      dimensions: z.string().optional(),
      images: imageList(image),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

const texts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/texts' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    year: z.union([z.number(), z.string()]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works, projects, texts };
