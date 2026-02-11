import type { SajuType } from '@/domain/saju/types';

/** 하나의 영역(재물/연애/직장/건강)에 대한 템플릿 세트 */
export interface AreaTemplateSet {
  /** 메인 해석 문단 5개 (각 5-6문장) */
  main: string[];
  /** 오버뷰 카드용 요약 문장 5개 (각 1-2문장) */
  summary: string[];
  /** 보조 슬롯 */
  aux: {
    /** 상황 강조 문장 (3-5개) */
    situationEmphasis: string[];
    /** 오해 완충 문장 (3-5개) */
    misunderstandingBuffer: string[];
    /** 시간성 보조 문장 (3-5개) */
    timeContext: string[];
  };
}

/** 10개 SajuType 각각에 대한 영역 템플릿 맵 */
export type AreaTemplates = Record<SajuType, AreaTemplateSet>;
