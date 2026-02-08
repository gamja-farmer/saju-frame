/**
 * 해석 문장 조합기.
 * SajuType + pillar + locale → 4단계 해석. 여기서만 locale 사용.
 */

import type { SajuPillar, SajuType } from '@/domain/saju/types';
import { impressionTemplates as zhImpression } from './templates/zh-TW/impression';
import { tendencyTemplates as zhTendency } from './templates/zh-TW/tendency';
import { flowTemplates as zhFlow } from './templates/zh-TW/flow';
import { terminologyTemplates as zhTerminology } from './templates/zh-TW/terminology';
import { impressionTemplates as koImpression } from './templates/ko/impression';
import { tendencyTemplates as koTendency } from './templates/ko/tendency';
import { flowTemplates as koFlow } from './templates/ko/flow';
import { terminologyTemplates as koTerminology } from './templates/ko/terminology';
import { impressionTemplates as enImpression } from './templates/en/impression';
import { tendencyTemplates as enTendency } from './templates/en/tendency';
import { flowTemplates as enFlow } from './templates/en/flow';
import { terminologyTemplates as enTerminology } from './templates/en/terminology';

export type Locale = 'zh-TW' | 'ko' | 'en';

export interface InterpretationResult {
  impression: string;
  tendency: string;
  flow: string;
  terminology: string;
}

function getTemplates(locale: Locale) {
  switch (locale) {
    case 'zh-TW':
      return { impression: zhImpression, tendency: zhTendency, flow: zhFlow, terminology: zhTerminology };
    case 'ko':
      return { impression: koImpression, tendency: koTendency, flow: koFlow, terminology: koTerminology };
    case 'en':
      return { impression: enImpression, tendency: enTendency, flow: enFlow, terminology: enTerminology };
  }
}

function pickOne(options: string[], seed: number): string {
  if (options.length === 0) return '';
  return options[seed % options.length];
}

/** pillar 기반 단순 시드 (결과 다양성용) */
function seedFromPillar(pillar: SajuPillar): number {
  const s = pillar.dayStem.length + pillar.yearBranch.length + pillar.monthStem.length;
  return Math.abs(s);
}

/**
 * 타입·기둥·locale에 따라 4단계 해석 문장을 조합.
 * 결과 다양성은 문장 조합으로 확보 (SPEC 6절).
 */
export function composeInterpretation(
  type: SajuType,
  pillar: SajuPillar,
  locale: Locale
): InterpretationResult {
  const { impression, tendency, flow, terminology } = getTemplates(locale);
  const seed = seedFromPillar(pillar);
  return {
    impression: pickOne(impression[type] ?? [], seed),
    tendency: pickOne(tendency[type] ?? [], seed + 1),
    flow: pickOne(flow[type] ?? [], seed + 2),
    terminology: pickOne(terminology[type] ?? [], seed + 3),
  };
}
