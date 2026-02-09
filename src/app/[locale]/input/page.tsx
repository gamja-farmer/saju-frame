import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { InputForm } from './InputForm';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default async function InputPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('input');
  return (
    <main>
      <h1>{t('birthdate')}</h1>
      <p>{t('optional')}</p>
      <InputForm locale={locale} />
    </main>
  );
}
