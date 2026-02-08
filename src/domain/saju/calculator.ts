/**
 * 사주 원국(四柱) 계산.
 * 생년월일시 → SajuPillar. locale 무관, 순수 계산만 수행.
 * 양력→음력 변환은 lib/calendar에 위임.
 */

import { solarToLunar } from '@/lib/calendar';
import type { BirthInput, EarthlyBranch, HeavenlyStem, SajuPillar } from './types';

/** 천간 인덱스 (0–9). 년간은 (년 + 6) % 10 등 규칙으로 계산 */
const STEMS: HeavenlyStem[] = [
  'gui', 'jia', 'yi', 'bing', 'ding', 'wu', 'ji', 'geng', 'xin', 'ren',
];

const BRANCHES: EarthlyBranch[] = [
  'hai', 'zi', 'chou', 'yin', 'mao', 'chen', 'si', 'wu', 'wei', 'shen', 'you', 'xu',
];

/**
 * 생년월일시로 사주 원국 계산.
 * 시간 미입력 시 시주는 제외 (optional 필드 유지).
 */
export function calculatePillar(input: BirthInput): SajuPillar {
  const lunar = solarToLunar(input.year, input.month, input.day);
  const yearIndex = (lunar.year - 4) % 10;
  const yearBranchIndex = (lunar.year - 4) % 12;
  const yearStem = STEMS[(yearIndex + 10) % 10];
  const yearBranch = BRANCHES[(yearBranchIndex + 12) % 12];

  // 월주: 년간·년지 + 월 (절기 기준 보정 필요 — 현재는 단순화)
  const monthOffset = (lunar.year % 5) * 2 + Math.floor((lunar.month + 1) / 2);
  const monthStem = STEMS[(yearIndex + monthOffset + 2) % 10];
  const monthBranch = BRANCHES[(lunar.month + 1) % 12];

  // 일주: 기준일 누적 또는 테이블 (여기서는 단순 규칙)
  const dayOffset = (lunar.year + Math.floor(lunar.year / 4) + lunar.day) % 60;
  const dayStem = STEMS[dayOffset % 10];
  const dayBranch = BRANCHES[dayOffset % 12];

  const pillar: SajuPillar = {
    yearStem,
    yearBranch,
    monthStem,
    monthBranch,
    dayStem,
    dayBranch,
  };

  if (input.hour !== undefined && input.hour >= 0 && input.hour <= 23) {
    const hourBranchIndex = Math.floor(((input.hour + 1) % 24) / 2) % 12;
    const hourBranch = BRANCHES[hourBranchIndex];
    const dayStemIndex = STEMS.indexOf(dayStem);
    const hourStem = STEMS[(dayStemIndex * 2 + hourBranchIndex) % 10];
    pillar.hourStem = hourStem;
    pillar.hourBranch = hourBranch;
  }

  return pillar;
}
