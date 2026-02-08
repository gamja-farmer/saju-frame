/**
 * 사주 도메인 타입 정의.
 * 계산·분류는 locale과 무관한 순수 데이터 구조.
 */

/** 천간 (天干) — 10개 */
export type HeavenlyStem =
  | 'jia'   // 甲
  | 'yi'    // 乙
  | 'bing'  // 丙
  | 'ding'  // 丁
  | 'wu'    // 戊
  | 'ji'    // 己
  | 'geng'  // 庚
  | 'xin'   // 辛
  | 'ren'   // 壬
  | 'gui';  // 癸

/** 지지 (地支) — 12개 */
export type EarthlyBranch =
  | 'zi'    // 子
  | 'chou'  // 丑
  | 'yin'   // 寅
  | 'mao'   // 卯
  | 'chen'  // 辰
  | 'si'    // 巳
  | 'wu'    // 午
  | 'wei'   // 未
  | 'shen'  // 申
  | 'you'   // 酉
  | 'xu'    // 戌
  | 'hai';  // 亥

/** 오행 (五行) */
export type FiveElement = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

/** 사용자 입력: 생년월일시 (SPEC 5.2 — 생년월일 필수, 시간·성별 선택) */
export interface BirthInput {
  year: number;
  month: number;
  day: number;
  hour?: number;
  gender?: 'M' | 'F';
}

/** 사주 원국(四柱原局) — 계산 결과 */
export interface SajuPillar {
  yearStem: HeavenlyStem;
  yearBranch: EarthlyBranch;
  monthStem: HeavenlyStem;
  monthBranch: EarthlyBranch;
  dayStem: HeavenlyStem;
  dayBranch: EarthlyBranch;
  hourStem?: HeavenlyStem;
  hourBranch?: EarthlyBranch;
}

/**
 * 사주 타입 slug — 10~15개 내외 (SPEC 6절).
 * 해석 템플릿·결과 페이지 라우팅에 사용. locale 무관.
 */
export type SajuType =
  | 'mu-huo-zhi-ren'
  | 'jin-shui-zhi-ren'
  | 'tu-jin-zhi-ren'
  | 'shui-mu-zhi-ren'
  | 'huo-tu-zhi-ren'
  | 'mu-jin-zhi-ren'
  | 'jin-mu-zhi-ren'
  | 'shui-huo-zhi-ren'
  | 'huo-jin-zhi-ren'
  | 'tu-shui-zhi-ren';

/** 등록된 모든 SajuType (generateStaticParams·분류기 검증용) */
export const SAJU_TYPES: readonly SajuType[] = [
  'mu-huo-zhi-ren',
  'jin-shui-zhi-ren',
  'tu-jin-zhi-ren',
  'shui-mu-zhi-ren',
  'huo-tu-zhi-ren',
  'mu-jin-zhi-ren',
  'jin-mu-zhi-ren',
  'shui-huo-zhi-ren',
  'huo-jin-zhi-ren',
  'tu-shui-zhi-ren',
] as const;

export function isSajuType(value: string): value is SajuType {
  return (SAJU_TYPES as readonly string[]).includes(value);
}
