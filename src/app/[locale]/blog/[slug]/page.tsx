import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { routing } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    // No blog posts yet; add slugs when content exists
  }
  return params;
}

type MetaProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    return { title: 'Not Found' };
  }
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternates[loc] = `${base}/${loc}/blog/${slug}`;
  }
  return {
    title: slug,
    alternates: { languages: alternates },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  return (
    <main>
      <h1>{slug}</h1>
      <p>Content not found.</p>
      <Link href={`/${locale}/blog`}>{t('back')}</Link>
    </main>
  );
}
