import type { SajuType } from '@/domain/saju/types';
import { SAJU_TYPES } from '@/domain/saju/types';

/** 1단계: 整體印象 — 你的命盤給人的第一個感覺是… (K=5, 每類型 5 選項) */
const OPTIONS: string[] = [
  '你的命盤給人的第一個感覺是比較內斂、有餘韻的類型。',
  '你的命盤給人的第一個感覺是能量外放、容易讓人留下印象的類型。',
  '你的命盤給人的第一個感覺是穩重、步調不疾不徐的類型。',
  '你的命盤給人的第一個感覺是靈動、對變化適應力強的類型。',
  '你的命盤給人的第一個感覺是溫和而堅定、有自己節奏的類型。',
];

export const impressionTemplates: Record<SajuType, string[]> = Object.fromEntries(
  SAJU_TYPES.map((type) => [type, [...OPTIONS]])
) as Record<SajuType, string[]>;
