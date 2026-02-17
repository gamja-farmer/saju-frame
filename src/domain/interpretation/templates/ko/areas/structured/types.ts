/**
 * 구조화 영역 해석 템플릿 타입 정의 (Layer 3).
 * 각 영역 해석을 5개 논리 섹션으로 분할.
 */

import type { SajuType } from '@/domain/saju/types';

/** 구조화 영역 해석 — 5섹션 */
export interface StructuredAreaTemplate {
  /** 근거 라벨 — "판단 근거: 오행 재물 기운" */
  basisLabel: string;
  /** [구조 근거] */
  structureBasis: string;
  /** [성향 설명] */
  tendencyDesc: string;
  /** [강점 해석] */
  strengthInterp: string;
  /** [리스크 해석] */
  riskInterp: string;
  /** [현실 적용 조언] */
  practicalAdvice: string;
}

/** 타입별 구조화 영역 템플릿 (variant 당 1세트, K=5) */
export type StructuredAreaTemplates = Record<SajuType, StructuredAreaTemplate[]>;
