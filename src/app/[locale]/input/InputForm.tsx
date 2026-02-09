'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { submitBirthData } from './actions';

const initialState = { error: undefined as string | undefined };

export function InputForm({ locale }: { locale: string }) {
  const t = useTranslations('input');
  const [state, formAction, isPending] = useActionState(submitBirthData, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="locale" value={locale} />
      <div>
        <label htmlFor="year">{t('birthdate')}（年）</label>
        <input id="year" name="year" type="number" min={1900} max={2100} required placeholder="1990" />
      </div>
      <div>
        <label htmlFor="month">月</label>
        <input id="month" name="month" type="number" min={1} max={12} required placeholder="1" />
      </div>
      <div>
        <label htmlFor="day">日</label>
        <input id="day" name="day" type="number" min={1} max={31} required placeholder="15" />
      </div>
      <div>
        <label htmlFor="hour">{t('birthtime')}（選填）</label>
        <input id="hour" name="hour" type="number" min={0} max={23} placeholder="0–23" />
        <p className="text-sm text-gray-500">{t('optional')}</p>
      </div>
      <div>
        <label>{t('gender')}（選填）</label>
        <select name="gender">
          <option value="">—</option>
          <option value="M">男</option>
          <option value="F">女</option>
        </select>
      </div>
      {state?.error && <p role="alert" className="text-red-600">{state.error}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? '…' : t('submit')}
      </button>
    </form>
  );
}
