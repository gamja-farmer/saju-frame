'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { submitBirthData } from './actions';

const initialState = { error: undefined as string | undefined };

const inputClass =
  'w-full rounded-input border border-divider bg-bg-soft px-sm py-xs text-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors duration-200';

const labelClass = 'block text-small text-text-secondary mb-xs';

export function InputForm({ locale }: { locale: string }) {
  const t = useTranslations('input');
  const [state, formAction, isPending] = useActionState(submitBirthData, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-md">
      <input type="hidden" name="locale" value={locale} />

      {/* 생년 */}
      <div>
        <label htmlFor="year" className={labelClass}>
          {t('birthdate')}（年）
        </label>
        <input
          id="year"
          name="year"
          type="number"
          min={1900}
          max={2100}
          required
          placeholder="1990"
          className={inputClass}
        />
      </div>

      {/* 월 */}
      <div>
        <label htmlFor="month" className={labelClass}>
          月
        </label>
        <input
          id="month"
          name="month"
          type="number"
          min={1}
          max={12}
          required
          placeholder="1"
          className={inputClass}
        />
      </div>

      {/* 일 */}
      <div>
        <label htmlFor="day" className={labelClass}>
          日
        </label>
        <input
          id="day"
          name="day"
          type="number"
          min={1}
          max={31}
          required
          placeholder="15"
          className={inputClass}
        />
      </div>

      {/* 시간 (선택) */}
      <div>
        <label htmlFor="hour" className={labelClass}>
          {t('birthtime')}（選填）
        </label>
        <input
          id="hour"
          name="hour"
          type="number"
          min={0}
          max={23}
          placeholder="0–23"
          className={inputClass}
        />
        <p className="mt-xs text-small text-text-muted">{t('optional')}</p>
      </div>

      {/* 성별 (선택) */}
      <div>
        <label className={labelClass}>{t('gender')}（選填）</label>
        <select name="gender" className={inputClass}>
          <option value="">—</option>
          <option value="M">男</option>
          <option value="F">女</option>
        </select>
      </div>

      {/* 에러 메시지 */}
      {state?.error && (
        <p role="alert" className="text-small text-accent-primary">
          {state.error}
        </p>
      )}

      {/* 제출 버튼 */}
      <div className="pt-sm flex justify-center">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center h-[52px] w-full max-w-[320px] rounded-button bg-accent-primary text-white text-body font-body transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? '…' : t('submit')}
        </button>
      </div>
    </form>
  );
}
