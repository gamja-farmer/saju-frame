import type { SajuType } from '@/domain/saju/types';
import { SAJU_TYPES } from '@/domain/saju/types';

/** 3단계: 人生脈絡 — 強盛的時期、搖擺的時期、反覆出現的主題 (K=5) */
const OPTIONS: string[] = [
  '人生中較容易在累積到一定階段後迎來較順的時期；偶爾會有反覆的主題。',
  '人生中強盛的時期與沉潛的時期交錯出現；某類課題可能一再出現。',
  '人生步調偏穩健，較少大起大落；某些主題會持續伴隨你。',
  '人生中適應力強，不同階段可能有明顯轉折；反覆的主題較不明顯。',
  '人生中容易在特定領域發光；某段時期可能較多考驗。',
];

export const flowTemplates: Record<SajuType, string[]> = Object.fromEntries(
  SAJU_TYPES.map((type) => [type, [...OPTIONS]])
) as Record<SajuType, string[]>;
