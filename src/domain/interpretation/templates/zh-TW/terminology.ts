import type { SajuType } from '@/domain/saju/types';
import { SAJU_TYPES } from '@/domain/saju/types';

/** 4단계: 命盤用語 — 五行、十神、簡要關係說明，可摺疊 (K=5) */
const OPTIONS: string[] = [
  '命盤中的五行與十神，是用來描述能量與關係的符號；不必強記，當成輔助理解的框架即可。',
  '五行代表五種能量屬性；十神描述你與外界互動的傾向。簡單了解有助於讀懂解讀。',
  '命盤用語是傳統分類方式；重點是背後的「傾向」與「流動」，而非對錯。',
  '五行、十神等名詞是幫助整理思緒的工具；不必與他人比較，了解自己即可。',
  '這些術語是古人整理經驗的結晶；現代可以當作自我覺察的參考。',
];

export const terminologyTemplates: Record<SajuType, string[]> = Object.fromEntries(
  SAJU_TYPES.map((type) => [type, [...OPTIONS]])
) as Record<SajuType, string[]>;
