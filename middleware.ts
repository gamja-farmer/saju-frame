import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './src/i18n/routing';

// 국가 코드(ISO 3166-1 alpha-2) → locale 매핑
const countryToLocale: Record<string, string> = {
  TW: 'zh-TW',
  HK: 'zh-TW',
  CN: 'zh-TW',
  MO: 'zh-TW',
  KR: 'ko',
  KP: 'ko',
};

const validLocales = new Set(routing.locales);
const defaultLocale = routing.defaultLocale;
type Locale = (typeof routing.locales)[number];

/** Accept-Language 헤더에서 지원 locale 추론 (우선순위: ko → zh → en) */
function localeFromAcceptLanguage(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;
  const lower = acceptLanguage.toLowerCase();
  if (lower.includes('ko')) return 'ko';
  if (lower.includes('zh')) return 'zh-TW';
  if (lower.includes('en')) return 'en';
  return null;
}

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // 루트 경로("/") 접속 시: 국가/언어 우선, 쿠키는 보조
  if (request.nextUrl.pathname === '/') {
    // 1. Vercel IP 기반 국가 코드 (한국→ko, 대만/중국→zh-TW 등)
    const country = request.headers.get('x-vercel-ip-country') || '';
    let locale: string | undefined = countryToLocale[country];

    // 2. 국가 없으면 Accept-Language로 추론
    if (!locale) {
      const fromLang = localeFromAcceptLanguage(request.headers.get('accept-language'));
      locale = fromLang ?? undefined;
    }

    // 3. 그래도 없으면 NEXT_LOCALE 쿠키 → 마지막으로 defaultLocale
    if (!locale) {
      const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
      locale = cookieLocale && validLocales.has(cookieLocale as Locale) ? cookieLocale : defaultLocale;
    }

    return NextResponse.redirect(new URL(`/${locale}?from=mw`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // Root "/" must be listed explicitly; the regex alone often does not match it in Next.js
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
