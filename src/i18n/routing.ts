import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh-TW', 'ko', 'en'],
  defaultLocale: 'zh-TW',
});
