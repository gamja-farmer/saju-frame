import type { SajuType } from '@/domain/saju/types';
import { SAJU_TYPES } from '@/domain/saju/types';

/** Step 4: Chart terminology (collapsible) */
export const terminologyTemplates: Record<SajuType, string[]> = Object.fromEntries(
  SAJU_TYPES.map((type) => [type, [] as string[]])
) as Record<SajuType, string[]>;
