import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternates[loc] = `${base}/${loc}/about`;
  }
  return {
    title: t('title'),
    alternates: { languages: alternates },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <main className="mx-auto max-w-[680px] px-[20px] pb-xxl">
      <section className="pt-xxl">
        <h1 className="text-hero font-heading leading-[1.4]">{t('title')}</h1>
      </section>

      <article className="pt-xl text-body text-text-primary leading-[1.8] space-y-md">
        <section>
          <h2 className="text-section font-heading leading-[1.4]">{t('purposeTitle')}</h2>
          <p className="mt-sm text-text-secondary">{t('purposeBody')}</p>
        </section>

        <section>
          <h2 className="text-section font-heading leading-[1.4]">{t('approachTitle')}</h2>
          <p className="mt-sm text-text-secondary">{t('approachBody')}</p>
        </section>

        <section>
          <h2 className="text-section font-heading leading-[1.4]">{t('disclaimerTitle')}</h2>
          <p className="mt-sm text-text-secondary">{t('disclaimerBody')}</p>
        </section>
      </article>
    </main>
  );
}
