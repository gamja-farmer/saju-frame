import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Root "/" must be listed explicitly; the regex alone often does not match it in Next.js
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
