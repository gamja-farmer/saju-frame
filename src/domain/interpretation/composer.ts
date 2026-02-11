/**
 * 해석 문장 조합기.
 * SajuType + pillar + locale → 3단계 오버뷰 + 4영역 해석.
 */

import type { SajuPillar, SajuType } from '@/domain/saju/types';
import type { AreaTemplateSet } from './templates/areas/types';
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
