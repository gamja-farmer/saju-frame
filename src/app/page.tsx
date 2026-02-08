import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

/**
 * Root path: redirect to default locale so middleware is not required for / to work.
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
