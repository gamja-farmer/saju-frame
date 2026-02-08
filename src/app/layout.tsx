import { headers } from 'next/headers';
import { routing } from '@/i18n/routing';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale =
    headersList.get('x-next-intl-locale') ?? routing.defaultLocale;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
