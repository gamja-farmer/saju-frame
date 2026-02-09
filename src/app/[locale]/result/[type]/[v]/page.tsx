import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SAJU_TYPES, isSajuType } from '@/domain/saju/types';
import { getVariantContent, VARIANT_COUNT } from '@/domain/interpretation/composer';
import type { Locale } from '@/domain/interpretation/composer';

type Props = { params: Promise<{ locale: string; type: string; v: string }> };

export function generateStaticParams() {
  const params: { locale: string; type: string; v: string }[] = [];
  for (const locale of routing.locales) {
    for (const type of SAJU_TYPES) {
      for (let v = 0; v < VARIANT_COUNT; v++) {
        params.push({ locale, type, v: String(v) });
      }
    }
  }
  return params;
}

type MetaProps = { params: Promise<{ locale: string; type: string; v: string }> };

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const { locale, type, v } = await params;
  if (!hasLocale(routing.locales, locale) || !isSajuType(type) || !isValidV(v)) {
    return { title: 'Not Found' };
  }
  const base = getBaseUrl();
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternates[loc] = `${base}/${loc}/result/${type}/${v}`;
  }
  return {
    title: `命盤解讀：${type}`,
    description: `Chart interpretation for type ${type}, variant ${v}.`,
    alternates: { languages: alternates },
  };
}

function hasLocale(
  locales: readonly string[],
  value: string
): value is (typeof locales)[number] {
  return locales.includes(value);
}

function isValidV(v: string): boolean {
  const n = parseInt(v, 10);
  return Number.isInteger(n) && n >= 0 && n < VARIANT_COUNT;
}

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? '';
}

export default async function ResultVariantPage({ params }: Props) {
  const { locale, type, v } = await params;
  if (!hasLocale(routing.locales, locale) || !isSajuType(type) || !isValidV(v)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('result');
  const variantIndex = parseInt(v, 10);
  const result = getVariantContent(type, variantIndex, locale as Locale);
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
        <details>
          <summary>{t('terminology')}</summary>
          <p>{result.terminology || '—'}</p>
        </details>
      </section>
    </main>
  );
}
