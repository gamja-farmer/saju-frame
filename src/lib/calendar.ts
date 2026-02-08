/**
 * 양력 → 음력 변환 (만세력 萬年曆 기반).
 * calculator에서 사용. 외부 API 미사용, 규칙/테이블 기반 구현 예정.
 */

export interface LunarDate {
  year: number;
  month: number;
  day: number;
  isLeapMonth?: boolean;
}

/**
 * 양력 날짜를 음력 날짜로 변환.
 * @param year 양력 년
 * @param month 양력 월 (1–12)
 * @param day 양력 일
 */
export function solarToLunar(
  year: number,
  month: number,
  day: number
): LunarDate {
  // TODO: 만세력 테이블/알고리즘으로 실제 변환 구현 (절기·윤달 반영)
  return { year, month, day };
}
