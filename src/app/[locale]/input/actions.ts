'use server';

import { redirect } from 'next/navigation';
import { calculatePillar } from '@/domain/saju/calculator';
import { classifySajuType } from '@/domain/saju/classifier';
import { seedFromPillar, VARIANT_COUNT } from '@/domain/interpretation/composer';
import type { BirthInput } from '@/domain/saju/types';
import { routing } from '@/i18n/routing';

function parseNum(s: string | null): number | undefined {
  if (s == null || s === '') return undefined;
  const n = parseInt(s, 10);
  return Number.isInteger(n) ? n : undefined;
}

export async function submitBirthData(
  _prevState: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const locale = formData.get('locale') as string | null;
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    return { error: 'Invalid locale' };
  }

  const year = parseNum(formData.get('year') as string | null);
  const month = parseNum(formData.get('month') as string | null);
  const day = parseNum(formData.get('day') as string | null);
  const hourRaw = formData.get('hour');
  const hour = hourRaw !== null && hourRaw !== '' ? parseNum(String(hourRaw)) : undefined;
  const genderRaw = formData.get('gender');
  const gender =
    genderRaw === 'M' || genderRaw === 'F' ? (genderRaw as 'M' | 'F') : undefined;

  if (year == null || month == null || day == null) {
    return { error: 'Year, month, and day are required' };
  }
  if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
    return { error: 'Invalid date range' };
  }

  const input: BirthInput = { year, month, day };
  if (hour !== undefined && hour >= 0 && hour <= 23) input.hour = hour;
  if (gender !== undefined) input.gender = gender;

  const pillar = calculatePillar(input);
  const type = classifySajuType(pillar);
  const variantIndex = seedFromPillar(pillar) % VARIANT_COUNT;

  redirect(`/${locale}/result/${type}/${variantIndex}`);
}
