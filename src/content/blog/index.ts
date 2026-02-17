/**
 * Blog content index — re-exports post data per locale and provides lookup helpers.
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  body: string;
}

/* ── zh-TW ── */
import { posts as zhTW_1 } from './zh-TW/ba-zi-kan-xing-ge-ri-zhu';
import { posts as zhTW_2 } from './zh-TW/wu-xing-que-shen-me-ping-heng';
import { posts as zhTW_3 } from './zh-TW/wei-shen-me-zong-shi-xiang-tai-duo';
import { posts as zhTW_4 } from './zh-TW/2026-she-nian-ba-zi-liu-nian';
import { posts as zhTW_5 } from './zh-TW/ba-zi-ming-pan-ru-men';

/* ── ko ── */
import { posts as ko_1 } from './ko/ba-zi-kan-xing-ge-ri-zhu';
import { posts as ko_2 } from './ko/wu-xing-que-shen-me-ping-heng';
import { posts as ko_3 } from './ko/wei-shen-me-zong-shi-xiang-tai-duo';
import { posts as ko_4 } from './ko/2026-she-nian-ba-zi-liu-nian';
import { posts as ko_5 } from './ko/ba-zi-ming-pan-ru-men';

const ZH_TW_POSTS: BlogPost[] = [zhTW_1, zhTW_2, zhTW_3, zhTW_4, zhTW_5];
const KO_POSTS: BlogPost[] = [ko_1, ko_2, ko_3, ko_4, ko_5];
const EN_POSTS: BlogPost[] = [];

type Locale = 'zh-TW' | 'ko' | 'en';

const BY_LOCALE: Record<Locale, BlogPost[]> = {
  'zh-TW': ZH_TW_POSTS,
  ko: KO_POSTS,
  en: EN_POSTS,
};

export function getBlogPosts(locale: string): BlogPost[] {
  return BY_LOCALE[locale as Locale] ?? [];
}

export function getBlogPost(locale: string, slug: string): BlogPost | null {
  const posts = getBlogPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}
