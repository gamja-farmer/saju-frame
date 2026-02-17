import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

const countryToLocale: Record<string, string> = {
  TW: 'zh-TW',
  HK: 'zh-TW',
  CN: 'zh-TW',
  MO: 'zh-TW',
  KR: 'ko',
  KP: 'ko',
};

type Locale = (typeof routing.locales)[number];
const validLocales = new Set<string>(routing.locales);

function localeFromAcceptLanguage(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;
  const lower = acceptLanguage.toLowerCase();
  if (lower.includes('ko')) return 'ko';
  if (lower.includes('zh')) return 'zh-TW';
  if (lower.includes('en')) return 'en';
  return null;
}

/**
 * Root path fallback: detect locale from headers when middleware doesn't run.
 */
export default async function RootPage() {
  const headersList = await headers();
  const cookieStore = await cookies();

  // 1. NEXT_LOCALE 쿠키 (사용자의 이전 선택)
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  if (cookieLocale && validLocales.has(cookieLocale)) {
    redirect(`/${cookieLocale}?from=page-cookie`);
  }

  // 2. Vercel IP 기반 국가 코드
  const country = headersList.get('x-vercel-ip-country') || '';
  const ipLocale = countryToLocale[country];
  if (ipLocale) {
    redirect(`/${ipLocale}?from=page-ip`);
  }

  // 3. Accept-Language 헤더
  const langLocale = localeFromAcceptLanguage(headersList.get('accept-language'));
  if (langLocale) {
    redirect(`/${langLocale}?from=page-lang`);
  }

  // 4. 기본 로케일
  redirect(`/${routing.defaultLocale}?from=page-default`);
}
