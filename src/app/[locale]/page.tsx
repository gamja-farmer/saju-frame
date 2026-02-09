import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('landing');
  return (
    <main>
      <h1>{t('headline')}</h1>
      <p>{t('empathy1')}</p>
      <p>{t('empathy2')}</p>
      <p>{t('serviceIntro')}</p>
      <Link href={`/${locale}/input`}>{t('cta')}</Link>
    </main>
  );
}
