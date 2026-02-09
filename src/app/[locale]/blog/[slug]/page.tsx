import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import { getBlogPosts, getBlogPost } from '@/content/blog';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

type MetaProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    return { title: 'Not Found' };
  }
  const post = getBlogPost(locale, slug);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternates[loc] = `${base}/${loc}/blog/${slug}`;
  }
  return {
    title: post?.title ?? slug,
    alternates: { languages: alternates },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const post = getBlogPost(locale, slug);
  if (!post) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const tLanding = await getTranslations('landing');
  return (
    <main>
      <h1>{post.title}</h1>
      <div style={{ whiteSpace: 'pre-line' }}>{post.body}</div>
      <p>
        <Link href={`/${locale}/input`}>{tLanding('cta')}</Link>
      </p>
      <Link href={`/${locale}/blog`}>{t('back')}</Link>
    </main>
  );
}
