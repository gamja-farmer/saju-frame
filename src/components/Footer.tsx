import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');

  return (
    <footer className="mt-xxl border-t border-divider">
      <div className="mx-auto max-w-[680px] px-[20px] py-lg flex flex-wrap items-center justify-center gap-x-md gap-y-xs text-small text-text-muted">
        <Link
          href={`/${locale}/blog`}
          className="hover:text-accent-primary transition-colors duration-200"
        >
          {t('blog')}
        </Link>
        <span aria-hidden="true">·</span>
        <Link
          href={`/${locale}/about`}
          className="hover:text-accent-primary transition-colors duration-200"
        >
          {t('about')}
        </Link>
        <span aria-hidden="true">·</span>
        <Link
          href={`/${locale}/privacy`}
          className="hover:text-accent-primary transition-colors duration-200"
        >
          {t('privacy')}
        </Link>
      </div>
    </footer>
  );
}
