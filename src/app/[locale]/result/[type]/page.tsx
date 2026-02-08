import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SAJU_TYPES, isSajuType } from '@/domain/saju/types';
import { composeInterpretation } from '@/domain/interpretation/composer';
import type { Locale } from '@/domain/interpretation/composer';

type Props = { params: Promise<{ locale: string; type: string }> };

export function generateStaticParams() {
  const params: { locale: string; type: string }[] = [];
  for (const locale of routing.locales) {
    for (const type of SAJU_TYPES) {
      params.push({ locale, type });
    }
  }
  return params;
}

type MetaProps = { params: Promise<{ locale: string; type: string }> };

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const { locale, type } = await params;
  if (!hasLocale(routing.locales, locale) || !isSajuType(type)) {
    return { title: 'Not Found' };
  }
  const base = getBaseUrl();
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternates[loc] = `${base}/${loc}/result/${type}`;
  }
  return {
    title: `Result: ${type}`,
    description: `Chart interpretation for type ${type}.`,
    alternates: { languages: alternates },
  };
}

function hasLocale(
  locales: readonly string[],
  value: string
): value is (typeof locales)[number] {
  return locales.includes(value);
}

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? '';
}

export default async function ResultPage({ params }: Props) {
  const { locale, type } = await params;
  if (!hasLocale(routing.locales, locale) || !isSajuType(type)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('result');
  const dummyPillar = {
    yearStem: 'jia' as const,
    yearBranch: 'zi' as const,
    monthStem: 'yi' as const,
    monthBranch: 'chou' as const,
    dayStem: 'bing' as const,
    dayBranch: 'yin' as const,
  };
  const result = composeInterpretation(
    type,
    dummyPillar,
    locale as Locale
  );
  return (
    <main>
      <section>
        <h2>{t('impression')}</h2>
        <p>{result.impression || '—'}</p>
      </section>
      <section>
        <h2>{t('tendency')}</h2>
        <p>{result.tendency || '—'}</p>
      </section>
      <section>
        <h2>{t('flow')}</h2>
        <p>{result.flow || '—'}</p>
      </section>
      <section>
        <h2>{t('terminology')}</h2>
        <p>{result.terminology || '—'}</p>
      </section>
    </main>
  );
}
