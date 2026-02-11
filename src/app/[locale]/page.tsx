import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/Button';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('landing');
  return (
    <main className="mx-auto max-w-[680px] px-[20px] pb-xxl">
      {/* Hero */}
      <section className="pt-xxl">
        <h1 className="text-hero font-heading leading-[1.4]">
          {t('headline')}
        </h1>
      </section>

      {/* 공감 문단 */}
      <section className="pt-xl">
        <p className="text-body text-text-secondary leading-[1.8]">
          {t('empathy1')}
        </p>
        <p className="mt-sm text-body text-text-secondary leading-[1.8]">
          {t('empathy2')}
        </p>
      </section>

      {/* 서비스 소개 */}
      <section className="pt-xl">
        <p className="text-body text-text-primary leading-[1.8]">
          {t('serviceIntro')}
        </p>
      </section>

      {/* CTA */}
      <section className="pt-xl flex justify-center">
        <Button href={`/${locale}/input`}>{t('cta')}</Button>
      </section>
    </main>
  );
}
