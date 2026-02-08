/**
 * 사주 타입 분류.
 * SajuPillar → 10~15개 SajuType 중 하나. locale 무관, 규칙 기반.
 */

import { SAJU_TYPES, type SajuPillar, type SajuType } from './types';

/**
 * 사주 원국을 하나의 SajuType으로 분류.
 * 오행 분포·일간 강약·십성 등 기반 규칙 확장 예정. 현재는 일간+년지 해시로 안정적 매핑.
 */
export function classifySajuType(pillar: SajuPillar): SajuType {
  const stemIndex = stemToIndex(pillar.dayStem);
  const branchIndex = branchToIndex(pillar.yearBranch);
  const combined = (stemIndex * 12 + branchIndex) % SAJU_TYPES.length;
  return SAJU_TYPES[combined];
}

function stemToIndex(stem: string): number {
  const order = [
    'jia', 'yi', 'bing', 'ding', 'wu', 'ji', 'geng', 'xin', 'ren', 'gui',
  ];
  const i = order.indexOf(stem);
  return i >= 0 ? i : 0;
}

function branchToIndex(branch: string): number {
  const order = [
    'zi', 'chou', 'yin', 'mao', 'chen', 'si', 'wu', 'wei', 'shen', 'you', 'xu', 'hai',
  ];
  const i = order.indexOf(branch);
  return i >= 0 ? i : 0;
}
