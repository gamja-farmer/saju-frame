import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SAJU_TYPES } from '@/domain/saju/types';
import { getBlogPosts } from '@/content/blog';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

function languageAlternates(path: string): MetadataRoute.Sitemap[0]['alternates'] {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${baseUrl}/${locale}${path}`;
  }
  languages['x-default'] = `${baseUrl}/zh-TW${path}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    // Landing
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      alternates: languageAlternates(''),
    });

    // Blog list
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      alternates: languageAlternates('/blog'),
    });

    // Individual blog posts
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        alternates: languageAlternates(`/blog/${post.slug}`),
      });
    }

    // About
    entries.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      alternates: languageAlternates('/about'),
    });

    // Privacy
    entries.push({
      url: `${baseUrl}/${locale}/privacy`,
      lastModified: new Date(),
      alternates: languageAlternates('/privacy'),
    });

    // Result pages
    for (const type of SAJU_TYPES) {
      entries.push({
        url: `${baseUrl}/${locale}/result/${type}`,
        lastModified: new Date(),
        alternates: languageAlternates(`/result/${type}`),
      });
    }
  }

  return entries;
}
