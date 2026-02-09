/**
 * 블로그 글 메타·본문. 로케일별로 슬러그·제목·본문 보관.
 */

export interface BlogPost {
  slug: string;
  title: string;
  body: string;
}

const ZH_TW_POSTS: BlogPost[] = [
  {
    slug: 'wei-shen-me-ni-zong-shi-jue-ding-de-hen-man',
    title: '為什麼你總是做決定很慢？',
    body: `有時候不是優柔寡斷，而是你的命盤裡，本來就有一種「想看清楚再動」的傾向。

這種傾向不一定不好——它可能讓你少犯衝動的錯，也可能讓你在關係裡比較願意傾聽。但當外界期待你「快、狠、準」時，就容易覺得自己卡卡的。

從命盤的角度看，有些人天生比較容易在「選擇」這件事上花時間：不是笨，而是能量分配的方式不同。如果你常常被說想太多，或許可以試著接納：這就是你運作的方式之一。

想多了解自己的命盤節奏與流向，可以從這裡開始。`,
  },
];

const KO_POSTS: BlogPost[] = [];
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
