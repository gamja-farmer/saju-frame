import type { SajuType } from '@/domain/saju/types';
import { SAJU_TYPES } from '@/domain/saju/types';
import type { AreaTemplates } from '../../areas/types';

const EMPTY_SET = { main: [], summary: [], aux: { situationEmphasis: [], misunderstandingBuffer: [], timeContext: [] } };

/** 건강 영역 (ko) */
export const healthTemplates: AreaTemplates = Object.fromEntries(
  SAJU_TYPES.map((type) => [type, { ...EMPTY_SET, aux: { ...EMPTY_SET.aux } }])
) as unknown as AreaTemplates;
