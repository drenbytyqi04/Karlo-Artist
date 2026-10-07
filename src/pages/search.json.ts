import type { APIRoute } from 'astro';
import { getProjects, getTexts, getWorks } from '../lib/content';

/** Small search index built at build time and fetched by /search. */
const plain = (md = '') =>
  md
    .replace(/[#>*_`[\]()-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const GET: APIRoute = async () => {
  const [works, projects, texts] = await Promise.all([getWorks(), getProjects(), getTexts()]);

  const index = [
    ...works.map((w) => ({
      type: 'Work',
      title: w.data.title,
      year: w.data.year ?? '',
      url: `/works/${w.id}/`,
      text: plain(
        [w.data.material, w.data.dimensions, ...w.data.images.map((i) => i.caption), w.body].filter(Boolean).join(' '),
      ),
    })),
    ...projects.map((p) => ({
      type: 'Project',
      title: p.data.title,
      year: p.data.meta ?? p.data.year ?? '',
      url: `/projects/${p.id}/`,
      text: plain([p.data.summary, ...p.data.images.map((i) => i.caption), p.body].filter(Boolean).join(' ')),
    })),
    ...texts.map((t) => ({
      type: 'Text',
      title: t.data.title,
      year: `${t.data.author}, ${t.data.year}`,
      url: `/text/${t.id}/`,
      text: plain(t.body),
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
