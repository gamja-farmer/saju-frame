/**
 * 양력 → 음력 변환. lunar-typescript 사용 (PROJECT_SPEC 11절).
 */

import { Solar } from 'lunar-typescript';

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
  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();
  return {
    year: lunar.getYear(),
    month: lunar.getMonth(),
    day: lunar.getDay(),
  };
}
