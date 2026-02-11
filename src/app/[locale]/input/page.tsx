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
    <main className="mx-auto max-w-[680px] px-[20px] pb-xxl">
      <section className="pt-xxl">
        <h1 className="text-section font-heading leading-[1.4]">
          {t('birthdate')}
        </h1>
        <p className="mt-md text-small text-text-muted leading-[1.8]">
          {t('optional')}
        </p>
      </section>

      <section className="pt-xl">
        <InputForm locale={locale} />
      </section>
    </main>
  );
}
