/**
 * 타입 메타데이터.
 * 각 SajuType에 대한 전문가 표시용 사전 정의 데이터.
 * 身強/身弱, 喜用神 등은 타입 단위로 고정 — 복잡한 명리 계산 불필요.
 */

import type { FiveElement } from '@/domain/saju/types';
import type { SajuType } from '@/domain/saju/types';

export interface TypeMetadata {
  /** 분석 코드 (예: "A1-木火型") */
  code: string;
  /** 표시명 (예: "木火之人") */
  label: string;
  /** 주 오행 */
  dominantElement: FiveElement;
  /** 부 오행 */
  subElement: FiveElement;
  /** 身強/身弱/中和 판정 */
  bodyStrength: '身強' | '身弱' | '中和';
  /** 身強/身弱 한 줄 설명 */
  bodyStrengthDesc: string;
  /** 喜用神 (예: "水、金") */
  favorableGod: string;
  /** 喜用神 한 줄 설명 */
  favorableGodDesc: string;
  /** 핵심 특질 한 줄 요약 */
  coreTraitSummary: string;
}

/**
 * 10개 타입 메타데이터.
 * A그룹(1-5): 相生 조합, B그룹(1-5): 相剋/긴장 조합.
 */
export const TYPE_METADATA: Record<SajuType, TypeMetadata> = {
  'mu-huo-zhi-ren': {
    code: 'A1-木火型',
    label: '木火之人',
    dominantElement: 'wood',
    subElement: 'fire',
    bodyStrength: '身強',
    bodyStrengthDesc: '整體能量偏向旺盛，自我意識與行動力較強，適合主動開創',
    favorableGod: '水、金',
    favorableGodDesc: '水能滋養而不過燃，金能適度修剪方向，幫助你在熱情中保持節制',
    coreTraitSummary: '以理想驅動行動，直覺敏銳但需要學會節奏控制',
  },
  'jin-shui-zhi-ren': {
    code: 'A2-金水型',
    label: '金水之人',
    dominantElement: 'metal',
    subElement: 'water',
    bodyStrength: '身強',
    bodyStrengthDesc: '內在能量沉穩而銳利，分析力與判斷力是你的核心優勢',
    favorableGod: '木、火',
    favorableGodDesc: '木能引導能量向外生長，火能溫暖過於冷靜的內在，幫助你更好地表達',
    coreTraitSummary: '冷靜觀察後精準行動，深度思考者但需留意表達的時機',
  },
  'tu-jin-zhi-ren': {
    code: 'A3-土金型',
    label: '土金之人',
    dominantElement: 'earth',
    subElement: 'metal',
    bodyStrength: '身強',
    bodyStrengthDesc: '能量厚實穩固，耐力與承擔力是你最大的特質',
    favorableGod: '木、水',
    favorableGodDesc: '木能鬆動過於固定的結構，水能增添靈活度，幫助你在穩健中保持彈性',
    coreTraitSummary: '穩紮穩打的實踐者，可靠但需注意避免過度保守',
  },
  'shui-mu-zhi-ren': {
    code: 'A4-水木型',
    label: '水木之人',
    dominantElement: 'water',
    subElement: 'wood',
    bodyStrength: '中和',
    bodyStrengthDesc: '能量處於流動與生長的平衡狀態，適應力是你的天然優勢',
    favorableGod: '火、土',
    favorableGodDesc: '火能為你的方向提供聚焦點，土能給予穩定的根基，幫助你在流動中找到錨點',
    coreTraitSummary: '靈活多變的探索者，適應力強但需要刻意培養方向感',
  },
  'huo-tu-zhi-ren': {
    code: 'A5-火土型',
    label: '火土之人',
    dominantElement: 'fire',
    subElement: 'earth',
    bodyStrength: '身強',
    bodyStrengthDesc: '能量溫暖而厚實，同時具備行動力和承擔力',
    favorableGod: '金、水',
    favorableGodDesc: '金能幫助你收束過度的付出，水能降溫避免燃燒殆盡，讓你在照顧別人的同時也照顧自己',
    coreTraitSummary: '溫暖的行動派，擅長照顧他人但需學會設定界線',
  },
  'mu-jin-zhi-ren': {
    code: 'B1-木金型',
    label: '木金之人',
    dominantElement: 'wood',
    subElement: 'metal',
    bodyStrength: '中和',
    bodyStrengthDesc: '成長與收斂的力量在你身上形成動態平衡，內在有一種自我修正的機制',
    favorableGod: '水、火',
    favorableGodDesc: '水能潤澤成長的能量，火能化解金木之間的張力，幫助你在擴展和收束間更順暢',
    coreTraitSummary: '在成長與自律間尋找平衡，精煉型人格但需避免過度自我要求',
  },
  'jin-mu-zhi-ren': {
    code: 'B2-金木型',
    label: '金木之人',
    dominantElement: 'metal',
    subElement: 'wood',
    bodyStrength: '中和',
    bodyStrengthDesc: '結構感與生長力在你身上共存，既有規則意識又保有彈性',
    favorableGod: '水、土',
    favorableGodDesc: '水能作為金木之間的橋樑，土能穩固你的根基，讓你的結構更有溫度',
    coreTraitSummary: '有原則的建設者，系統化思維但需留出即興的空間',
  },
  'shui-huo-zhi-ren': {
    code: 'B3-水火型',
    label: '水火之人',
    dominantElement: 'water',
    subElement: 'fire',
    bodyStrength: '身弱',
    bodyStrengthDesc: '內在能量在深沉與爆發之間交替，情感世界豐富但表達需要過程',
    favorableGod: '木、土',
    favorableGodDesc: '木能引導水火的能量找到出口，土能提供穩定的容器，讓你的內在世界有安全的表達空間',
    coreTraitSummary: '深沉的感受者，內外反差大但擁有獨特的雙重視角',
  },
  'huo-jin-zhi-ren': {
    code: 'B4-火金型',
    label: '火金之人',
    dominantElement: 'fire',
    subElement: 'metal',
    bodyStrength: '身強',
    bodyStrengthDesc: '能量充沛且具有強烈的推進力，行動力和決斷力是你的核心武器',
    favorableGod: '土、水',
    favorableGodDesc: '土能緩衝火金之間的衝撞，水能降溫讓你在衝刺後有恢復的空間',
    coreTraitSummary: '果斷的執行者，目標明確但需學會在行動與等待之間找到節奏',
  },
  'tu-shui-zhi-ren': {
    code: 'B5-土水型',
    label: '土水之人',
    dominantElement: 'earth',
    subElement: 'water',
    bodyStrength: '身弱',
    bodyStrengthDesc: '能量沉靜而深層，外在平穩但內在運作比表面看到的更豐富',
    favorableGod: '火、金',
    favorableGodDesc: '火能為你的能量注入溫度和動力，金能幫助你將想法轉化為行動，讓內在的豐富被看見',
    coreTraitSummary: '安靜的觀察者，厚積薄發但需學會適時讓自己被看見',
  },
};
