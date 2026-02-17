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

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // 루트 경로("/") 접속 시: 국가 기반 locale 리다이렉트
  if (request.nextUrl.pathname === '/') {
    // 1. 기존에 선택한 locale이 있으면 우선 적용 (NEXT_LOCALE 쿠키)
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && validLocales.has(cookieLocale)) {
      return NextResponse.redirect(new URL(`/${cookieLocale}`, request.url));
    }

    // 2. Vercel IP 기반 국가 코드로 locale 결정 (로컬 개발 시에는 null)
    const country = request.headers.get('x-vercel-ip-country') || '';
    const locale =
      countryToLocale[country] ?? defaultLocale;

    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // Root "/" must be listed explicitly; the regex alone often does not match it in Next.js
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
