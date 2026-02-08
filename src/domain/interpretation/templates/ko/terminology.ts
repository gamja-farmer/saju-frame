import type { SajuType } from '@/domain/saju/types';
import { SAJU_TYPES } from '@/domain/saju/types';

/** 4단계: 사주 용어 보조 */
export const terminologyTemplates: Record<SajuType, string[]> = Object.fromEntries(
  SAJU_TYPES.map((type) => [type, [] as string[]])
) as Record<SajuType, string[]>;
