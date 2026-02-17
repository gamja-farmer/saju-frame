import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import { SAJU_TYPES, isSajuType } from '@/domain/saju/types';
import { AdBanner } from '@/components/AdBanner';
import type { FiveElement } from '@/domain/saju/types';
import {
  getFullVariantContent,
  VARIANT_COUNT,
  AREA_KEYS,
} from '@/domain/interpretation/composer';
import type { Locale, AreaKey } from '@/domain/interpretation/composer';
import { getGlossaryDescription } from '@/domain/interpretation/glossary';

type Props = { params: Promise<{ locale: string; type: string; v: string }> };

export function generateStaticParams() {
  const params: { locale: string; type: string; v: string }[] = [];
  for (const locale of routing.locales) {
    for (const type of SAJU_TYPES) {
      for (let v = 0; v < VARIANT_COUNT; v++) {
        params.push({ locale, type, v: String(v) });
      }
    }
  }
  return params;
}

type MetaProps = { params: Promise<{ locale: string; type: string; v: string }> };

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const { locale, type, v } = await params;
  if (!hasLocale(routing.locales, locale) || !isSajuType(type) || !isValidV(v)) {
    return { title: 'Not Found' };
  }
  const base = getBaseUrl();
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternates[loc] = `${base}/${loc}/result/${type}/${v}`;
  }
  const tMeta = await getTranslations({ locale, namespace: 'result' });
  return {
    title: `${tMeta('chartReading')}：${type}`,
    description: `Chart interpretation for type ${type}, variant ${v}.`,
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

/** 로케일별 핵심 용어 표기 (일주/喜用神/五行) */
const GLOSSARY_TERM_BY_LOCALE: Record<
  'zh-TW' | 'ko' | 'en',
  { dayMaster: string; favorableGod: string; element: string }
> = {
  ko: { dayMaster: '일주', favorableGod: '희용신', element: '오행' },
  'zh-TW': { dayMaster: '日主', favorableGod: '喜用神', element: '五行' },
  en: { dayMaster: '日主', favorableGod: '喜用神', element: '五行' },
};

/** 용어에 data-tooltip 속성을 부여하는 헬퍼 */
function Glossary({
  term,
  locale,
}: {
  term: string;
  locale: 'zh-TW' | 'ko' | 'en';
}) {
  const desc = getGlossaryDescription(term, locale);
  if (!desc) return <span>{term}</span>;
  return (
    <span
      className="underline decoration-accent-soft decoration-dotted underline-offset-4 cursor-help"
      data-tooltip={desc}
    >
      {term}
    </span>
  );
}

const ELEMENT_BY_LOCALE: Record<
  'zh-TW' | 'ko' | 'en',
  Record<FiveElement, string>
> = {
  ko: { wood: '목', fire: '화', earth: '토', metal: '금', water: '수' },
  'zh-TW': { wood: '木', fire: '火', earth: '土', metal: '金', water: '水' },
  en: { wood: '木', fire: '火', earth: '土', metal: '金', water: '水' },
};

/** 五行 분포를 한 줄 텍스트로 포맷 */
function formatElementDist(
  dist: Record<FiveElement, number>,
  locale: 'zh-TW' | 'ko' | 'en'
): string {
  const order: FiveElement[] = ['wood', 'fire', 'earth', 'metal', 'water'];
  const labels = ELEMENT_BY_LOCALE[locale];
  return order.map((el) => `${labels[el]} ${dist[el]}%`).join(' · ');
}

export default async function ResultVariantPage({ params }: Props) {
  const { locale, type, v } = await params;
  if (!hasLocale(routing.locales, locale) || !isSajuType(type) || !isValidV(v)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('result');
  const variantIndex = parseInt(v, 10);
  const result = getFullVariantContent(type, variantIndex, locale as Locale);

  /** 3단계 본문과 Step 매핑 */
  const stepBodyMap: Record<number, string> = {
    0: result.impression || '—',
    1: '',
    2: result.tendency || '—',
    3: result.flow || '—',
  };

  return (
    <main className="mx-auto max-w-[680px] px-[20px] pb-xxl">
      {/* ── Hero: 타입 코드 ── */}
      <header className="pt-xxl">
        <p className="text-small text-text-muted tracking-wide">
          {result.summary.typeCode}
        </p>
      </header>

      {/* ── 핵심 명반 요약 (문단 기반, 표 금지) ── */}
      <section className="pt-xl">
        <h2 className="text-section font-heading leading-[1.4]">
          {t('coreSummary')}
        </h2>

        <div className="mt-md flex flex-col gap-sm">
          <p className="text-body leading-[1.8]">
            <span className="text-accent-primary">
              <Glossary
                term={
                  GLOSSARY_TERM_BY_LOCALE[locale as 'zh-TW' | 'ko' | 'en']
                    .dayMaster
                }
                locale={locale as 'zh-TW' | 'ko' | 'en'}
              />
            </span>
            {' — '}
            {result.summary.dayMaster.value}
            {', '}
            {result.summary.dayMaster.desc}
          </p>

          <p className="text-body leading-[1.8]">
            <span className="text-accent-primary">
              <Glossary term={result.summary.bodyStrength.value} locale={locale as 'zh-TW' | 'ko' | 'en'} />
            </span>
            {' — '}
            {result.summary.bodyStrength.desc}
          </p>

          <p className="text-body leading-[1.8]">
            <span className="text-accent-primary">
              <Glossary
                term={
                  GLOSSARY_TERM_BY_LOCALE[locale as 'zh-TW' | 'ko' | 'en']
                    .favorableGod
                }
                locale={locale as 'zh-TW' | 'ko' | 'en'}
              />
            </span>
            {' — '}
            {result.summary.favorableGod.value}
            {', '}
            {result.summary.favorableGod.desc}
          </p>

          {/* 五行 분포: 접기(toggle) */}
          <details className="mt-sm">
            <summary className="cursor-pointer text-small text-text-secondary hover:text-accent-primary transition-colors duration-200">
              <Glossary
                term={
                  GLOSSARY_TERM_BY_LOCALE[locale as 'zh-TW' | 'ko' | 'en']
                    .element
                }
                locale={locale as 'zh-TW' | 'ko' | 'en'}
              />{' '}
              {t('elementDist')}
            </summary>
            <p className="mt-sm text-body text-text-secondary leading-[1.8]">
              {formatElementDist(
                result.summary.elementDistribution,
                locale as 'zh-TW' | 'ko' | 'en'
              )}
            </p>
          </details>
        </div>
      </section>

      {/* ── 구분선 ── */}
      <hr className="my-xl" />

      {/* ── 분석 단계 ── */}
      <section>
        <h2 className="text-section font-heading leading-[1.4]">
          {t('analysisProcess')}
        </h2>

        {/* 단계 진행 표시 */}
        <nav className="mt-md flex flex-wrap gap-xs text-small text-text-muted">
          {result.analysisSteps.map((step, i) => (
            <span key={step.title}>
              {i > 0 && <span className="mx-xs">→</span>}
              {`${i + 1}. ${step.title}`}
            </span>
          ))}
        </nav>

        {/* 각 단계 상세 */}
        {result.analysisSteps.map((step, i) => (
          <article key={step.title} className="pt-xl">
            <h3 className="text-sub font-heading leading-[1.4]">
              {step.title}
            </h3>
            <p className="mt-xs text-small text-accent-primary">
              「{step.basisLabel}」
            </p>
            <p className="mt-sm text-body text-text-primary leading-[1.8]">
              {step.logicSentence}
            </p>
            {stepBodyMap[i] && (
              <p className="mt-sm text-body text-text-secondary leading-[1.8]">
                {stepBodyMap[i]}
              </p>
            )}
            {i === 1 && (
              <p className="mt-sm text-body text-text-secondary leading-[1.8]">
                {formatElementDist(
                  result.summary.elementDistribution,
                  locale as 'zh-TW' | 'ko' | 'en'
                )}
              </p>
            )}
          </article>
        ))}
      </section>

      {/* ── 구분선 ── */}
      <hr className="my-xl" />

      {/* ── 4개 영역 티저 섹션 (카드 금지) ── */}
      <section>
        <h2 className="text-section font-heading leading-[1.4]">
          {t('areasTitle')}
        </h2>

        {AREA_KEYS.map((area: AreaKey) => {
          const areaResult = result.areas[area];
          return (
            <article key={area} className="pt-xl">
              <h3 className="text-sub font-heading leading-[1.4]">
                {t(area)}
              </h3>
              <p className="mt-sm text-body text-text-secondary leading-[1.8]">
                {areaResult.summary || '—'}
              </p>
              <Link
                href={`/${locale}/result/${type}/${v}/${area}`}
                className="inline-block mt-sm text-small text-accent-primary hover:opacity-80 transition-opacity duration-200"
              >
                {t('viewDetail')} →
              </Link>
            </article>
          );
        })}
      </section>

      {/* ── 구분선 ── */}
      <hr className="my-xl" />

      {/* ── 광고 슬롯 (하단 70% 이후) ── */}
      <aside className="my-lg">
        <AdBanner />
      </aside>

      {/* ── 면책 성명 ── */}
      <footer className="pt-lg pb-xxl">
        <p className="text-small text-text-muted leading-[1.8]">
          {result.disclaimer}
        </p>
      </footer>
    </main>
  );
}
