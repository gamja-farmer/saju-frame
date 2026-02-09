import type { SajuType } from '@/domain/saju/types';
import { SAJU_TYPES } from '@/domain/saju/types';

/** 2단계: 性向框架 — 能量使用方式、關係中的模式 (K=5) */
const OPTIONS: string[] = [
  '在能量使用上，你傾向於先觀察再行動；關係裡容易扮演傾聽的角色。',
  '在能量使用上，你傾向於有目標地投入；關係裡較為主動、願意承擔。',
  '在能量使用上，你傾向於穩扎穩打；做決定時可能會多花一點時間衡量。',
  '在能量使用上，你傾向於彈性應變；選擇時往往能較快取捨。',
  '在能量使用上，你傾向於在熟悉與新鮮之間取得平衡；關係中較為隨和。',
];

export const tendencyTemplates: Record<SajuType, string[]> = Object.fromEntries(
  SAJU_TYPES.map((type) => [type, [...OPTIONS]])
) as Record<SajuType, string[]>;
