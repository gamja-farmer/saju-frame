import { headers } from 'next/headers';
import { Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google';
import { routing } from '@/i18n/routing';
import './globals.css';

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif-tc',
  display: 'swap',
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-noto-sans-tc',
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale =
    headersList.get('x-next-intl-locale') ?? routing.defaultLocale;
  return (
    <html
      lang={locale}
      className={`${notoSerifTC.variable} ${notoSansTC.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
