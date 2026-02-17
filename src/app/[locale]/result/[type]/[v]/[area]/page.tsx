import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import { SAJU_TYPES, isSajuType } from '@/domain/saju/types';
import { AdBanner } from '@/components/AdBanner';
import {
  getFullVariantContent,
  VARIANT_COUNT,
  AREA_KEYS,
  isAreaKey,
} from '@/domain/interpretation/composer';
import type { Locale, AreaKey } from '@/domain/interpretation/composer';
import { getTypeMetadata } from '@/domain/interpretation/typeMetadata';

type Props = {
  params: Promise<{ locale: string; type: string; v: string; area: string }>;
};

export function generateStaticParams() {
  const params: { locale: string; type: string; v: string; area: string }[] = [];
  for (const locale of routing.locales) {
    for (const type of SAJU_TYPES) {
      for (let v = 0; v < VARIANT_COUNT; v++) {
        for (const area of AREA_KEYS) {
          params.push({ locale, type, v: String(v), area });
        }
      }
    }
  }
  return params;
}

type MetaProps = {
  params: Promise<{ locale: string; type: string; v: string; area: string }>;
};

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const { locale, type, v, area } = await params;
  if (
    !hasLocale(routing.locales, locale) ||
    !isSajuType(type) ||
    !isValidV(v) ||
    !isAreaKey(area)
  ) {
    return { title: 'Not Found' };
  }
  const base = getBaseUrl();
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternates[loc] = `${base}/${loc}/result/${type}/${v}/${area}`;
  }
  const areaLabels: Record<AreaKey, string> = {
    wealth: '財運',
    love: '感情',
    career: '事業',
    health: '健康',
  };
  return {
    title: `${areaLabels[area]}解讀：${type}`,
    description: `${areaLabels[area]} interpretation for type ${type}, variant ${v}.`,
    alternates: { languages: alternates },
  };
}

function hasLocale(
  locales: readonly string[],
  value: string
): value is (typeof locales)[number] {
  return locales.includes(value);
}

function isValidV(v: string): boolean {
  const n = parseInt(v, 10);
  return Number.isInteger(n) && n >= 0 && n < VARIANT_COUNT;
}

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? '';
}

/** 구조화 5섹션 라벨 */
const SECTION_LABELS = {
  structureBasis: '構造根據',
  tendencyDesc: '性向說明',
  strengthInterp: '優勢解讀',
  riskInterp: '風險解讀',
  practicalAdvice: '實際建議',
} as const;

export default async function AreaDetailPage({ params }: Props) {
  const { locale, type, v, area } = await params;
  if (
    !hasLocale(routing.locales, locale) ||
    !isSajuType(type) ||
    !isValidV(v) ||
    !isAreaKey(area)
  ) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations('result');
  const variantIndex = parseInt(v, 10);
  const result = getFullVariantContent(type, variantIndex, locale as Locale);
  const areaResult = result.areas[area];
  const structured = result.structuredAreas[area];
  const meta = getTypeMetadata(locale as 'zh-TW' | 'ko' | 'en')[type as import('@/domain/saju/types').SajuType];

  const otherAreas = AREA_KEYS.filter((k) => k !== area);

  return (
    <main className="mx-auto max-w-[680px] px-[20px] pb-xxl">
      {/* ── 상단 네비게이션 ── */}
      <nav className="pt-xl flex items-center justify-between">
        <Link
          href={`/${locale}/result/${type}/${v}`}
          className="text-small text-accent-primary hover:opacity-80 transition-opacity duration-200"
        >
          ← {t('backToOverview')}
        </Link>
        <span className="text-small text-text-muted">{meta.code}</span>
      </nav>

      {/* ── 영역 제목 + 근거 라벨 ── */}
      <section className="pt-xl">
        <h1 className="text-hero font-heading leading-[1.4]">
          {t(area)}
        </h1>
        {structured && (
          <p className="mt-sm text-small text-accent-primary">
            「{structured.basisLabel}」
          </p>
        )}
      </section>

      {/* ── 구분선 ── */}
      <hr className="my-xl" />

      {/* ── 구조화 5섹션 해석 ── */}
      {structured ? (
        <section className="flex flex-col">
          <article>
            <h3 className="text-sub font-heading leading-[1.4]">
              {SECTION_LABELS.structureBasis}
            </h3>
            <p className="mt-sm text-body text-text-primary leading-[1.8]">
              {structured.structureBasis}
            </p>
          </article>

          <hr className="my-xl" />

          <article>
            <h3 className="text-sub font-heading leading-[1.4]">
              {SECTION_LABELS.tendencyDesc}
            </h3>
            <p className="mt-sm text-body text-text-primary leading-[1.8]">
              {structured.tendencyDesc}
            </p>
          </article>

          <hr className="my-xl" />

          <article>
            <h3 className="text-sub font-heading leading-[1.4]">
              {SECTION_LABELS.strengthInterp}
            </h3>
            <p className="mt-sm text-body text-text-primary leading-[1.8]">
              {structured.strengthInterp}
            </p>
          </article>

          <hr className="my-xl" />

          <article>
            <h3 className="text-sub font-heading leading-[1.4]">
              {SECTION_LABELS.riskInterp}
            </h3>
            <p className="mt-sm text-body text-text-primary leading-[1.8]">
              {structured.riskInterp}
            </p>
          </article>

          <hr className="my-xl" />

          <article>
            <h3 className="text-sub font-heading leading-[1.4]">
              {SECTION_LABELS.practicalAdvice}
            </h3>
            <p className="mt-sm text-body text-text-primary leading-[1.8]">
              {structured.practicalAdvice}
            </p>
          </article>
        </section>
      ) : (
        /* 구조화 템플릿이 없는 경우 기존 main 텍스트 폴백 */
        <section>
          <p className="text-body text-text-primary leading-[1.8]">
            {areaResult.main || '—'}
          </p>
        </section>
      )}

      {/* ── 보조 슬롯 (補充說明) ── */}
      {(areaResult.auxiliaries.situationEmphasis ||
        areaResult.auxiliaries.misunderstandingBuffer ||
        areaResult.auxiliaries.timeContext) && (
        <>
          <hr className="my-xl" />
          <section>
            <h3 className="text-sub font-heading leading-[1.4]">
              補充說明
            </h3>
            <div className="mt-md flex flex-col gap-sm">
              {areaResult.auxiliaries.situationEmphasis && (
                <aside className="rounded-card bg-bg-soft px-sm py-sm">
                  <p className="text-body text-text-secondary leading-[1.8]">
                    {areaResult.auxiliaries.situationEmphasis}
                  </p>
                </aside>
              )}
              {areaResult.auxiliaries.misunderstandingBuffer && (
                <aside className="rounded-card bg-bg-soft px-sm py-sm">
                  <p className="text-body text-text-secondary leading-[1.8]">
                    {areaResult.auxiliaries.misunderstandingBuffer}
                  </p>
                </aside>
              )}
              {areaResult.auxiliaries.timeContext && (
                <aside className="rounded-card bg-bg-soft px-sm py-sm">
                  <p className="text-body text-text-secondary leading-[1.8]">
                    {areaResult.auxiliaries.timeContext}
                  </p>
                </aside>
              )}
            </div>
          </section>
        </>
      )}

      {/* ── 구분선 ── */}
      <hr className="my-xl" />

      {/* ── 광고 슬롯 (하단 70% 이후) ── */}
      <aside className="my-lg">
        <AdBanner />
      </aside>

      {/* ── 다른 영역으로 이동 ── */}
      <hr className="my-xl" />
      <nav>
        <h3 className="text-sub font-heading leading-[1.4]">
          {t('otherAreas')}
        </h3>
        <div className="mt-md flex flex-col gap-sm">
          {otherAreas.map((otherArea: AreaKey) => (
            <Link
              key={otherArea}
              href={`/${locale}/result/${type}/${v}/${otherArea}`}
              className="text-body text-accent-primary hover:opacity-80 transition-opacity duration-200"
            >
              {t(otherArea)} →
            </Link>
          ))}
        </div>
      </nav>

      {/* ── 결과 총람으로 돌아가기 ── */}
      <div className="pt-xl pb-lg flex justify-center">
        <Link
          href={`/${locale}/result/${type}/${v}`}
          className="text-small text-text-muted hover:text-accent-primary transition-colors duration-200"
        >
          ← {t('backToOverview')}
        </Link>
      </div>
    </main>
  );
}
