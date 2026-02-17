import { headers } from 'next/headers';
import Script from 'next/script';
import { Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google';
import { routing } from '@/i18n/routing';
import './globals.css';

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

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
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
        {children}
      </body>
    </html>
  );
}
