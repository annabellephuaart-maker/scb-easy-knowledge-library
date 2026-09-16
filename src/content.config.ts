import { defineCollection, z } from 'astro:content';
import { provenanceMarkdown } from './loaders/provenance-markdown';

/**
 * Content is READ from the sibling product-context repo at build time.
 * It is never copied into this repo. See ADR-1.
 *
 * Frontmatter across research artefacts is deliberately varied — a study
 * objective and a document input carry different fields — so the schema is
 * permissive. The markdown is the source of truth; the site must not impose
 * a shape on it.
 */
const research = defineCollection({
  loader: provenanceMarkdown({ base: '../product-context/research' }),
  schema: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
      title: z.string().optional(),
      status: z.string().optional(),
      study: z.string().optional(),
      input_type: z.string().optional(),
      source_mode: z.string().optional(),
      evidence_quality: z.string().optional(),
      confidence: z.string().optional(),
      ssot: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
      /** Lifted from the artefact's provenance HTML comment by the loader. */
      provenance: z
        .object({
          artifact: z.string().optional(),
          mode: z.string().optional(),
          updated: z.string().optional(),
          evidence: z.string().optional(),
        })
        .optional(),
    })
    .passthrough(),
});

export const collections = { research };
