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
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternates[loc] = `${base}/${loc}/privacy`;
  }
  return {
    title: t('title'),
    alternates: { languages: alternates },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacy');

  return (
    <main className="mx-auto max-w-[680px] px-[20px] pb-xxl">
      <section className="pt-xxl">
        <h1 className="text-hero font-heading leading-[1.4]">{t('title')}</h1>
      </section>

      <article className="pt-xl text-body text-text-primary leading-[1.8] space-y-md">
        <section>
          <h2 className="text-section font-heading leading-[1.4]">{t('collectTitle')}</h2>
          <p className="mt-sm text-text-secondary">{t('collectBody')}</p>
        </section>

        <section>
          <h2 className="text-section font-heading leading-[1.4]">{t('cookieTitle')}</h2>
          <p className="mt-sm text-text-secondary">{t('cookieBody')}</p>
        </section>

        <section>
          <h2 className="text-section font-heading leading-[1.4]">{t('thirdPartyTitle')}</h2>
          <p className="mt-sm text-text-secondary">{t('thirdPartyBody')}</p>
        </section>

        <section>
          <h2 className="text-section font-heading leading-[1.4]">{t('changesTitle')}</h2>
          <p className="mt-sm text-text-secondary">{t('changesBody')}</p>
        </section>
      </article>

      <p className="mt-xl text-small text-text-muted">{t('lastUpdated')}</p>
    </main>
  );
}
