/**
 * 오행(五行) 유틸리티.
 * 천간/지지 → 오행 매핑, 한자 변환, 五行 분포 계산.
 * 고정 테이블 기반이므로 복잡한 명리 로직 없음.
 */

import type { EarthlyBranch, FiveElement, HeavenlyStem, SajuPillar } from './types';

/* ── 천간 → 오행 ── */
const STEM_ELEMENT_MAP: Record<HeavenlyStem, FiveElement> = {
  jia: 'wood',
  yi: 'wood',
  bing: 'fire',
  ding: 'fire',
  wu: 'earth',
  ji: 'earth',
  geng: 'metal',
  xin: 'metal',
  ren: 'water',
  gui: 'water',
};

/* ── 지지 → 오행 (본기 기준) ── */
const BRANCH_ELEMENT_MAP: Record<EarthlyBranch, FiveElement> = {
  yin: 'wood',
  mao: 'wood',
  si: 'fire',
  wu: 'fire',
  chen: 'earth',
  xu: 'earth',
  chou: 'earth',
  wei: 'earth',
  shen: 'metal',
  you: 'metal',
  hai: 'water',
  zi: 'water',
};

/* ── 천간 → 한자 ── */
const STEM_CHINESE_MAP: Record<HeavenlyStem, string> = {
  jia: '甲',
  yi: '乙',
  bing: '丙',
  ding: '丁',
  wu: '戊',
  ji: '己',
  geng: '庚',
  xin: '辛',
  ren: '壬',
  gui: '癸',
};

/* ── 오행 → 한자 ── */
const ELEMENT_CHINESE_MAP: Record<FiveElement, string> = {
  wood: '木',
  fire: '火',
  earth: '土',
  metal: '金',
  water: '水',
};

/** 천간 → 오행 */
export function stemToElement(stem: HeavenlyStem): FiveElement {
  return STEM_ELEMENT_MAP[stem];
}

/** 지지 → 오행 (본기 기준) */
export function branchToElement(branch: EarthlyBranch): FiveElement {
  return BRANCH_ELEMENT_MAP[branch];
}

/** 천간 → 한자 (예: 'jia' → '甲') */
export function stemToChinese(stem: HeavenlyStem): string {
  return STEM_CHINESE_MAP[stem];
}

/** 오행 → 한자 (예: 'wood' → '木') */
export function elementToChinese(el: FiveElement): string {
  return ELEMENT_CHINESE_MAP[el];
}

/**
 * 사주 원국에서 五行 분포(%) 계산.
 * 시주가 없으면 6개(년간/년지/월간/월지/일간/일지),
 * 시주가 있으면 8개 요소로 계산.
 * 반환값: 각 오행의 백분율 (합계 100).
 */
export function calculateElementDistribution(
  pillar: SajuPillar
): Record<FiveElement, number> {
  const counts: Record<FiveElement, number> = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };

  // 필수 6개: 년간, 년지, 월간, 월지, 일간, 일지
  counts[stemToElement(pillar.yearStem)]++;
  counts[branchToElement(pillar.yearBranch)]++;
  counts[stemToElement(pillar.monthStem)]++;
  counts[branchToElement(pillar.monthBranch)]++;
  counts[stemToElement(pillar.dayStem)]++;
  counts[branchToElement(pillar.dayBranch)]++;

  // 시주 (선택)
  if (pillar.hourStem) counts[stemToElement(pillar.hourStem)]++;
  if (pillar.hourBranch) counts[branchToElement(pillar.hourBranch)]++;

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const pct: Record<FiveElement, number> = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };

  for (const el of Object.keys(counts) as FiveElement[]) {
    pct[el] = Math.round((counts[el] / total) * 100);
  }

  // 반올림 오차 보정: 합이 100이 되도록 가장 큰 값에서 조정
  const sum = Object.values(pct).reduce((a, b) => a + b, 0);
  if (sum !== 100) {
    const maxEl = (Object.keys(pct) as FiveElement[]).reduce((a, b) =>
      pct[a] >= pct[b] ? a : b
    );
    pct[maxEl] += 100 - sum;
  }

  return pct;
}
