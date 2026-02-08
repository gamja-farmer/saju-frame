import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/zh-TW/input', '/ko/input', '/en/input'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
