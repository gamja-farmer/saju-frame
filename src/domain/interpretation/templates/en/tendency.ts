import type { SajuType } from '@/domain/saju/types';
import { SAJU_TYPES } from '@/domain/saju/types';

/** Step 2: Tendency frame */
export const tendencyTemplates: Record<SajuType, string[]> = Object.fromEntries(
  SAJU_TYPES.map((type) => [type, [] as string[]])
) as Record<SajuType, string[]>;
