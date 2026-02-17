/**
 * 해석 문장 조합기.
 * SajuType + pillar + locale → 3단계 오버뷰 + 4영역 해석.
 * + FullInterpretationResult: Layer 1(요약) + Layer 2(분석단계) + Layer 3(구조화 해석).
 */

import type { FiveElement, SajuPillar, SajuType } from '@/domain/saju/types';
import {
  stemToChinese,
  stemToElement,
  elementToChinese,
  calculateElementDistribution,
} from '@/domain/saju/elements';
import type { AreaTemplateSet } from './templates/areas/types';
import type { StructuredAreaTemplate } from './templates/zh-TW/areas/structured/types';
import type { AnalysisStep } from './analysisSteps';
import { getAnalysisSteps } from './analysisSteps';
import { getTypeMetadata } from './typeMetadata';
import { getDisclaimer } from './glossary';

/* ── 기존 locale별 템플릿 import ── */
import { impressionTemplates as zhImpression } from './templates/zh-TW/impression';
import { tendencyTemplates as zhTendency } from './templates/zh-TW/tendency';
import { flowTemplates as zhFlow } from './templates/zh-TW/flow';
import { wealthTemplates as zhWealth } from './templates/zh-TW/areas/wealth';
import { loveTemplates as zhLove } from './templates/zh-TW/areas/love';
import { careerTemplates as zhCareer } from './templates/zh-TW/areas/career';
import { healthTemplates as zhHealth } from './templates/zh-TW/areas/health';
import { impressionTemplates as koImpression } from './templates/ko/impression';
import { tendencyTemplates as koTendency } from './templates/ko/tendency';
import { flowTemplates as koFlow } from './templates/ko/flow';
import { wealthTemplates as koWealth } from './templates/ko/areas/wealth';
import { loveTemplates as koLove } from './templates/ko/areas/love';
import { careerTemplates as koCareer } from './templates/ko/areas/career';
import { healthTemplates as koHealth } from './templates/ko/areas/health';
import { impressionTemplates as enImpression } from './templates/en/impression';
import { tendencyTemplates as enTendency } from './templates/en/tendency';
import { flowTemplates as enFlow } from './templates/en/flow';
import { wealthTemplates as enWealth } from './templates/en/areas/wealth';
import { loveTemplates as enLove } from './templates/en/areas/love';
import { careerTemplates as enCareer } from './templates/en/areas/career';
import { healthTemplates as enHealth } from './templates/en/areas/health';

/* ── 구조화 템플릿 import ── */
import { structuredWealthTemplates as zhStructWealth } from './templates/zh-TW/areas/structured/wealth';
import { structuredLoveTemplates as zhStructLove } from './templates/zh-TW/areas/structured/love';
import { structuredCareerTemplates as zhStructCareer } from './templates/zh-TW/areas/structured/career';
import { structuredHealthTemplates as zhStructHealth } from './templates/zh-TW/areas/structured/health';
import { structuredWealthTemplates as koStructWealth } from './templates/ko/areas/structured/wealth';
import { structuredLoveTemplates as koStructLove } from './templates/ko/areas/structured/love';
import { structuredCareerTemplates as koStructCareer } from './templates/ko/areas/structured/career';
import { structuredHealthTemplates as koStructHealth } from './templates/ko/areas/structured/health';

export type Locale = 'zh-TW' | 'ko' | 'en';

/** 영역 키 */
export type AreaKey = 'wealth' | 'love' | 'career' | 'health';

export const AREA_KEYS: readonly AreaKey[] = ['wealth', 'love', 'career', 'health'] as const;

export function isAreaKey(value: string): value is AreaKey {
  return (AREA_KEYS as readonly string[]).includes(value);
}

/** 영역별 보조 슬롯 */
export interface AuxiliarySlots {
  situationEmphasis: string;
  misunderstandingBuffer: string;
  timeContext: string;
}

/** 각 영역 해석 결과 */
export interface AreaInterpretation {
  main: string;
  summary: string;
  auxiliaries: AuxiliarySlots;
}

/** 해석 결과 전체 구조 */
export interface InterpretationResult {
  impression: string;
  tendency: string;
  flow: string;
  areas: Record<AreaKey, AreaInterpretation>;
}

interface TemplateBundle {
  impression: Record<SajuType, string[]>;
  tendency: Record<SajuType, string[]>;
  flow: Record<SajuType, string[]>;
  areas: {
    wealth: Record<SajuType, AreaTemplateSet>;
    love: Record<SajuType, AreaTemplateSet>;
    career: Record<SajuType, AreaTemplateSet>;
    health: Record<SajuType, AreaTemplateSet>;
  };
}

function getTemplates(locale: Locale): TemplateBundle {
  switch (locale) {
    case 'zh-TW':
      return {
        impression: zhImpression, tendency: zhTendency, flow: zhFlow,
        areas: { wealth: zhWealth, love: zhLove, career: zhCareer, health: zhHealth },
      };
    case 'ko':
      return {
        impression: koImpression, tendency: koTendency, flow: koFlow,
        areas: { wealth: koWealth, love: koLove, career: koCareer, health: koHealth },
      };
    case 'en':
      return {
        impression: enImpression, tendency: enTendency, flow: enFlow,
        areas: { wealth: enWealth, love: enLove, career: enCareer, health: enHealth },
      };
  }
}

function pickSafe(arr: string[], index: number): string {
  if (!arr || arr.length === 0) return '';
  return arr[Math.abs(index) % arr.length];
}

function buildArea(set: AreaTemplateSet | undefined, v: number, offset: number): AreaInterpretation {
  if (!set) {
    return { main: '', summary: '', auxiliaries: { situationEmphasis: '', misunderstandingBuffer: '', timeContext: '' } };
  }
  return {
    main: pickSafe(set.main, v + offset),
    summary: pickSafe(set.summary, v + offset),
    auxiliaries: {
      situationEmphasis: pickSafe(set.aux.situationEmphasis, v + offset + 1),
      misunderstandingBuffer: pickSafe(set.aux.misunderstandingBuffer, v + offset + 2),
      timeContext: pickSafe(set.aux.timeContext, v + offset + 3),
    },
  };
}

/** 타입당 변형 개수 (PROJECT_SPEC 11절) */
export const VARIANT_COUNT = 5;

/** pillar 기반 단순 시드 (결과 다양성용). 입력→결과 redirect 시 variantIndex 계산에 사용. */
export function seedFromPillar(pillar: SajuPillar): number {
  const s = pillar.dayStem.length + pillar.yearBranch.length + pillar.monthStem.length;
  return Math.abs(s);
}

/**
 * (type, variantIndex) + locale로 해석 세트 반환.
 * 3단계 오버뷰 + 4개 영역.
 */
export function getVariantContent(
  type: SajuType,
  variantIndex: number,
  locale: Locale
): InterpretationResult {
  const { impression, tendency, flow, areas } = getTemplates(locale);
  const v = Math.max(0, variantIndex);
  const imp = impression[type] ?? [];
  const tend = tendency[type] ?? [];
  const fl = flow[type] ?? [];
  return {
    impression: pickSafe(imp, v),
    tendency: pickSafe(tend, v + 1),
    flow: pickSafe(fl, v + 2),
    areas: {
      wealth: buildArea(areas.wealth[type], v, 0),
      love: buildArea(areas.love[type], v, 3),
      career: buildArea(areas.career[type], v, 6),
      health: buildArea(areas.health[type], v, 9),
    },
  };
}

/**
 * 타입·기둥·locale에 따라 해석 문장을 조합.
 * 결과 다양성은 문장 조합으로 확보 (SPEC 6절).
 */
export function composeInterpretation(
  type: SajuType,
  pillar: SajuPillar,
  locale: Locale
): InterpretationResult {
  const seed = seedFromPillar(pillar);
  return getVariantContent(type, seed % VARIANT_COUNT, locale);
}

/* =====================================================
 * Layer 1~3 + 신뢰도 장치를 포함하는 확장 결과 구조
 * ===================================================== */

/** Layer 1: 핵심 요약 블록 */
export interface SummaryBlock {
  dayMaster: { value: string; element: string; desc: string };
  elementDistribution: Record<FiveElement, number>;
  bodyStrength: { value: string; desc: string };
  favorableGod: { value: string; desc: string };
  typeCode: string;
  typeLabel: string;
}

/** 전체 확장 해석 결과 */
export interface FullInterpretationResult {
  /** Layer 1: 핵심 요약 블록 */
  summary: SummaryBlock;
  /** Layer 2: 분석 단계 (4단계) */
  analysisSteps: AnalysisStep[];
  /** 기존 3단계 오버뷰 (Step 본문용) */
  impression: string;
  tendency: string;
  flow: string;
  /** 기존 4영역 해석 (카드 요약용) */
  areas: Record<AreaKey, AreaInterpretation>;
  /** Layer 3: 구조화 영역 해석 (상세 페이지용) */
  structuredAreas: Record<AreaKey, StructuredAreaTemplate | null>;
  /** 면책 성명 */
  disclaimer: string;
}

/** 구조화 템플릿 번들 (현재 zh-TW만) */
interface StructuredBundle {
  wealth: Record<SajuType, StructuredAreaTemplate[]>;
  love: Record<SajuType, StructuredAreaTemplate[]>;
  career: Record<SajuType, StructuredAreaTemplate[]>;
  health: Record<SajuType, StructuredAreaTemplate[]>;
}

function getStructuredTemplates(locale: Locale): StructuredBundle | null {
  if (locale === 'zh-TW') {
    return {
      wealth: zhStructWealth,
      love: zhStructLove,
      career: zhStructCareer,
      health: zhStructHealth,
    };
  }
  if (locale === 'ko') {
    return {
      wealth: koStructWealth,
      love: koStructLove,
      career: koStructCareer,
      health: koStructHealth,
    };
  }
  // en은 아직 구조화 템플릿 없음
  return null;
}

function pickStructured(
  arr: StructuredAreaTemplate[] | undefined,
  v: number
): StructuredAreaTemplate | null {
  if (!arr || arr.length === 0) return null;
  return arr[Math.abs(v) % arr.length];
}

/**
 * (type, variantIndex) + locale + pillar → 확장 해석 결과.
 * pillar가 있으면 개인별 五行 분포 계산, 없으면 타입 기반 기본값.
 */
export function getFullVariantContent(
  type: SajuType,
  variantIndex: number,
  locale: Locale,
  pillar?: SajuPillar
): FullInterpretationResult {
  // 기존 해석 결과
  const base = getVariantContent(type, variantIndex, locale);
  const v = Math.max(0, variantIndex);

  // Layer 1: 요약 블록
  const meta = getTypeMetadata(locale)[type];
  const dayStemChinese = pillar ? stemToChinese(pillar.dayStem) : '';
  const dayElement = pillar ? stemToElement(pillar.dayStem) : meta.dominantElement;
  const dayElementChinese = elementToChinese(dayElement);
  const elementDist = pillar
    ? calculateElementDistribution(pillar)
    : getDefaultDistribution(meta.dominantElement, meta.subElement);

  const summary: SummaryBlock = {
    dayMaster: {
      value: dayStemChinese ? `${dayStemChinese}${dayElementChinese}` : `${dayElementChinese}`,
      element: dayElementChinese,
      desc: meta.coreTraitSummary,
    },
    elementDistribution: elementDist,
    bodyStrength: { value: meta.bodyStrength, desc: meta.bodyStrengthDesc },
    favorableGod: { value: meta.favorableGod, desc: meta.favorableGodDesc },
    typeCode: meta.code,
    typeLabel: meta.label,
  };

  // Layer 2: 분석 단계
  const steps = getAnalysisSteps(type, locale);

  // Layer 3: 구조화 영역 해석
  const structBundle = getStructuredTemplates(locale);
  const structuredAreas: Record<AreaKey, StructuredAreaTemplate | null> = {
    wealth: structBundle ? pickStructured(structBundle.wealth[type], v) : null,
    love: structBundle ? pickStructured(structBundle.love[type], v) : null,
    career: structBundle ? pickStructured(structBundle.career[type], v) : null,
    health: structBundle ? pickStructured(structBundle.health[type], v) : null,
  };

  return {
    summary,
    analysisSteps: steps,
    impression: base.impression,
    tendency: base.tendency,
    flow: base.flow,
    areas: base.areas,
    structuredAreas,
    disclaimer: getDisclaimer(locale),
  };
}

/**
 * 타입 기반 기본 五行 분포 (pillar가 없을 때 사용).
 * dominant 35%, sub 25%, 나머지 균등 분배.
 */
function getDefaultDistribution(
  dominant: FiveElement,
  sub: FiveElement
): Record<FiveElement, number> {
  const elements: FiveElement[] = ['wood', 'fire', 'earth', 'metal', 'water'];
  const others = elements.filter((e) => e !== dominant && e !== sub);
  const remaining = 40; // 100 - 35 - 25
  const each = Math.floor(remaining / others.length);
  const dist: Record<FiveElement, number> = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  dist[dominant] = 35;
  dist[sub] = 25;
  for (const o of others) dist[o] = each;
  // 반올림 보정
  const sum = Object.values(dist).reduce((a, b) => a + b, 0);
  if (sum !== 100) dist[others[0]] += 100 - sum;
  return dist;
}

/**
 * 전체 확장 해석 조합 (pillar 포함).
 */
export function composeFullResult(
  type: SajuType,
  pillar: SajuPillar,
  locale: Locale
): FullInterpretationResult {
  const seed = seedFromPillar(pillar);
  return getFullVariantContent(type, seed % VARIANT_COUNT, locale, pillar);
}
