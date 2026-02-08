import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SAJU_TYPES } from '@/domain/saju/types';

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
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      alternates: languageAlternates(''),
    });
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      alternates: languageAlternates('/blog'),
    });
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
