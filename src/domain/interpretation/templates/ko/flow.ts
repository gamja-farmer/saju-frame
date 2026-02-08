import type { SajuType } from '@/domain/saju/types';
import { SAJU_TYPES } from '@/domain/saju/types';

/** 3단계: 삶의 흐름 */
export const flowTemplates: Record<SajuType, string[]> = Object.fromEntries(
  SAJU_TYPES.map((type) => [type, [] as string[]])
) as Record<SajuType, string[]>;
