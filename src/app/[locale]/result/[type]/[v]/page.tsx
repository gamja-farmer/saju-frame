import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import { SAJU_TYPES, isSajuType } from '@/domain/saju/types';
import type { FiveElement } from '@/domain/saju/types';
import { elementToChinese } from '@/domain/saju/elements';
import {
  getFullVariantContent,
  VARIANT_COUNT,
  AREA_KEYS,
} from '@/domain/interpretation/composer';
import type { Locale, AreaKey } from '@/domain/interpretation/composer';
import { GLOSSARY } from '@/domain/interpretation/glossary';
import { STEP_TITLES } from '@/domain/interpretation/analysisSteps';

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
  return {
    title: `命盤解讀：${type}`,
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

/** 용어에 data-tooltip 속성을 부여하는 헬퍼 */
function Glossary({ term }: { term: string }) {
  const desc = GLOSSARY[term];
  if (!desc) return <span>{term}</span>;
  return <span data-tooltip={desc}>{term}</span>;
}

/** 五行 분포를 한 줄 텍스트로 포맷 */
function formatElementDist(dist: Record<FiveElement, number>): string {
  const order: FiveElement[] = ['wood', 'fire', 'earth', 'metal', 'water'];
  return order.map((el) => `${elementToChinese(el)} ${dist[el]}%`).join(' · ');
}

export default async function ResultVariantPage({ params }: Props) {
  const { locale, type, v } = await params;
  if (!hasLocale(routing.locales, locale) || !isSajuType(type) || !isValidV(v)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('result');
  const variantIndex = parseInt(v, 10);
  const result = getFullVariantContent(type, variantIndex, locale as Locale);

  /** 3단계 본문과 Step 매핑 (Step1→impression, Step2→五行, Step3→tendency, Step4→flow) */
  const stepBodyMap: Record<number, string> = {
    0: result.impression || '—',
    1: '', // Step 2는 五行 데이터 표시
    2: result.tendency || '—',
    3: result.flow || '—',
  };

  return (
    <main>
      {/* ── Layer 1: 핵심 요약 블록 ── */}
      <header>
        <p>{result.summary.typeCode}</p>
      </header>

      <section>
        <h2>核心命盤摘要</h2>

        <dl>
          <dt><Glossary term="日主" /></dt>
          <dd>
            {result.summary.dayMaster.value}
            {' — '}
            {result.summary.dayMaster.desc}
          </dd>

          <dt><Glossary term="五行" />分布</dt>
          <dd>{formatElementDist(result.summary.elementDistribution)}</dd>

          <dt>
            <Glossary term={result.summary.bodyStrength.value} />
          </dt>
          <dd>{result.summary.bodyStrength.desc}</dd>

          <dt><Glossary term="喜用神" /></dt>
          <dd>
            {result.summary.favorableGod.value}
            {' — '}
            {result.summary.favorableGod.desc}
          </dd>
        </dl>
      </section>

      {/* ── Layer 2: 분석 단계 ── */}
      <section>
        <h2>分析過程</h2>

        {/* 단계 진행 표시 */}
        <nav>
          {STEP_TITLES.map((title, i) => (
            <span key={title}>
              {i > 0 && ' → '}
              {`${i + 1}. ${title}`}
            </span>
          ))}
        </nav>

        {/* 각 단계 상세 */}
        {result.analysisSteps.map((step, i) => (
          <article key={step.title}>
            <h3>{step.title}</h3>
            <p><small>「{step.basisLabel}」</small></p>
            <p>{step.logicSentence}</p>
            {stepBodyMap[i] && <p>{stepBodyMap[i]}</p>}
            {i === 1 && (
              <p>{formatElementDist(result.summary.elementDistribution)}</p>
            )}
          </article>
        ))}
      </section>

      {/* ── 4개 영역 요약 카드 ── */}
      <section>
        <h2>{t('areasTitle')}</h2>
        <div>
          {AREA_KEYS.map((area: AreaKey) => {
            const areaResult = result.areas[area];
            return (
              <Link
                key={area}
                href={`/${locale}/result/${type}/${v}/${area}`}
              >
                <article>
                  <h3>{t(area)}</h3>
                  <p>{areaResult.summary || '—'}</p>
                  <span>{t('viewDetail')}</span>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 면책 성명 ── */}
      <footer>
        <p><small>{result.disclaimer}</small></p>
      </footer>
    </main>
  );
}
