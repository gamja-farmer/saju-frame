import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import { getBlogPosts, getBlogPost } from '@/content/blog';
import { Button } from '@/components/Button';
import { AdBanner } from '@/components/AdBanner';

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
    description: post?.description,
    keywords: post?.keywords,
    alternates: { languages: alternates },
    openGraph: post
      ? {
          title: post.title,
          description: post.description,
          type: 'article',
          publishedTime: post.publishedAt,
        }
      : undefined,
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

  const allPosts = getBlogPosts(locale);
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'SajuFrame' },
  };

  return (
    <main className="mx-auto max-w-[680px] px-[20px] pb-xxl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back link */}
      <nav className="pt-xl">
        <Link
          href={`/${locale}/blog`}
          className="text-small text-accent-primary hover:opacity-70 transition-opacity duration-200"
        >
          ← {t('back')}
        </Link>
      </nav>

      {/* Title + date */}
      <header className="pt-md">
        <h1 className="text-hero font-heading leading-[1.4]">{post.title}</h1>
        <time className="mt-sm block text-small text-text-muted">
          {post.publishedAt}
        </time>
      </header>

      <hr className="my-xl" />

      {/* Body */}
      <article className="text-body text-text-primary leading-[1.8] whitespace-pre-line">
        {post.body}
      </article>

      <hr className="my-xl" />

      {/* CTA Banner */}
      <section className="rounded-card bg-bg-soft px-sm py-md text-center">
        <p className="text-body text-text-secondary">{t('ctaText')}</p>
        <div className="mt-sm flex justify-center">
          <Button href={`/${locale}/input`} variant="primary">
            {tLanding('cta')}
          </Button>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="pt-xl">
          <h3 className="text-sub font-heading">{t('relatedPosts')}</h3>
          <ul className="mt-sm space-y-sm">
            {relatedPosts.map((rp) => (
              <li key={rp.slug}>
                <Link
                  href={`/${locale}/blog/${rp.slug}`}
                  className="text-body text-accent-primary hover:opacity-70 transition-opacity duration-200"
                >
                  {rp.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Ad */}
      <aside className="my-lg">
        <AdBanner />
      </aside>
    </main>
  );
}
