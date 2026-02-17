import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import { getBlogPosts } from '@/content/blog';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternates[loc] = `${base}/${loc}/blog`;
  }
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { languages: alternates },
  };
}

export default async function BlogListPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const posts = getBlogPosts(locale);

  return (
    <main className="mx-auto max-w-[680px] px-[20px] pb-xxl">
      <section className="pt-xxl">
        <h1 className="text-hero font-heading leading-[1.4]">{t('title')}</h1>
        <p className="mt-sm text-body text-text-secondary leading-[1.8]">
          {t('subtitle')}
        </p>
      </section>

      <section className="pt-xl">
        {posts.length === 0 ? (
          <p className="text-body text-text-muted">No posts yet.</p>
        ) : (
          <div className="space-y-md">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-divider pb-md"
              >
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="block group"
                >
                  <h2 className="text-sub font-heading text-text-primary group-hover:text-accent-primary transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="mt-xs text-small text-text-secondary leading-[1.8]">
                    {post.description}
                  </p>
                  <time className="mt-xs block text-small text-text-muted">
                    {post.publishedAt}
                  </time>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
