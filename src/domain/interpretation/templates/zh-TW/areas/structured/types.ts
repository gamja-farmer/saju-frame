/**
 * 구조화 영역 해석 템플릿 타입 정의 (Layer 3).
 * 각 영역 해석을 5개 논리 섹션으로 분할.
 */

import type { SajuType } from '@/domain/saju/types';

/** 구조화 영역 해석 — 5섹션 */
export interface StructuredAreaTemplate {
  /** 근거 라벨 — "判斷依據：五行財星配置" */
  basisLabel: string;
  /** [구조 근거] — "由於…" 패턴 */
  structureBasis: string;
  /** [성향 설명] — "因此…" 패턴 */
  tendencyDesc: string;
  /** [강점 해석] — "這讓你在…" 패턴 */
  strengthInterp: string;
  /** [리스크 해석] — "當…時，容易…" 패턴 */
  riskInterp: string;
  /** [현실 적용 조언] — "建議你…" 패턴 */
  practicalAdvice: string;
}

/** 타입별 구조화 영역 템플릿 (variant 당 1세트, K=5) */
export type StructuredAreaTemplates = Record<SajuType, StructuredAreaTemplate[]>;
