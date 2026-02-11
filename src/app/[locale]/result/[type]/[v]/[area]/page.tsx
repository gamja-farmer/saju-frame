import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import { SAJU_TYPES, isSajuType } from '@/domain/saju/types';
import {
  getFullVariantContent,
  VARIANT_COUNT,
  AREA_KEYS,
  isAreaKey,
} from '@/domain/interpretation/composer';
import type { Locale, AreaKey } from '@/domain/interpretation/composer';
import { TYPE_METADATA } from '@/domain/interpretation/typeMetadata';

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
  const meta = TYPE_METADATA[type as keyof typeof TYPE_METADATA];

  // 다른 영역 네비게이션용
  const otherAreas = AREA_KEYS.filter((k) => k !== area);

  return (
    <main>
      {/* 상단 네비게이션 + 타입 코드 */}
      <nav>
        <Link href={`/${locale}/result/${type}/${v}`}>
          {t('backToOverview')}
        </Link>
        <span>{meta.code}</span>
      </nav>

      {/* 영역 제목 + 근거 라벨 */}
      <section>
        <h1>{t(area)}</h1>
        {structured && (
          <p><small>「{structured.basisLabel}」</small></p>
        )}
      </section>

      {/* ── Layer 3: 구조화 5섹션 해석 ── */}
      {structured ? (
        <section>
          <article>
            <h3>{SECTION_LABELS.structureBasis}</h3>
            <p>{structured.structureBasis}</p>
          </article>

          <article>
            <h3>{SECTION_LABELS.tendencyDesc}</h3>
            <p>{structured.tendencyDesc}</p>
          </article>

          <article>
            <h3>{SECTION_LABELS.strengthInterp}</h3>
            <p>{structured.strengthInterp}</p>
          </article>

          <article>
            <h3>{SECTION_LABELS.riskInterp}</h3>
            <p>{structured.riskInterp}</p>
          </article>

          <article>
            <h3>{SECTION_LABELS.practicalAdvice}</h3>
            <p>{structured.practicalAdvice}</p>
          </article>
        </section>
      ) : (
        /* 구조화 템플릿이 없는 경우 기존 main 텍스트 폴백 */
        <section>
          <p>{areaResult.main || '—'}</p>
        </section>
      )}

      {/* ── 보조 슬롯 (신뢰도 장치 재활용) ── */}
      {(areaResult.auxiliaries.situationEmphasis ||
        areaResult.auxiliaries.misunderstandingBuffer ||
        areaResult.auxiliaries.timeContext) && (
        <section>
          <h3>補充說明</h3>
          {areaResult.auxiliaries.situationEmphasis && (
            <aside>
              <p>{areaResult.auxiliaries.situationEmphasis}</p>
            </aside>
          )}
          {areaResult.auxiliaries.misunderstandingBuffer && (
            <aside>
              <p>{areaResult.auxiliaries.misunderstandingBuffer}</p>
            </aside>
          )}
          {areaResult.auxiliaries.timeContext && (
            <aside>
              <p>{areaResult.auxiliaries.timeContext}</p>
            </aside>
          )}
        </section>
      )}

      {/* ── 다른 영역으로 이동 ── */}
      <nav>
        <h3>{t('otherAreas')}</h3>
        <div>
          {otherAreas.map((otherArea: AreaKey) => (
            <Link
              key={otherArea}
              href={`/${locale}/result/${type}/${v}/${otherArea}`}
            >
              {t(otherArea)}
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
