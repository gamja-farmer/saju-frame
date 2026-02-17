/**
 * 타입 메타데이터.
 * 각 SajuType에 대한 전문가 표시용 사전 정의 데이터.
 * 身強/身弱, 喜用神 등은 타입 단위로 고정 — 복잡한 명리 계산 불필요.
 */

import type { FiveElement } from '@/domain/saju/types';
import type { SajuType } from '@/domain/saju/types';

export type Locale = 'zh-TW' | 'ko' | 'en';

export interface TypeMetadata {
  /** 분석 코드 (예: "A1-木火型") */
  code: string;
  /** 표시명 (예: "木火之人") */
  label: string;
  /** 주 오행 */
  dominantElement: FiveElement;
  /** 부 오행 */
  subElement: FiveElement;
  /** 身強/身弱/中和 또는 신강/신약/중화 판정 */
  bodyStrength: string;
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
 * 10개 타입 메타데이터 (번체 중국어).
 * A그룹(1-5): 相生 조합, B그룹(1-5): 相剋/긴장 조합.
 */
const TYPE_METADATA_ZH: Record<SajuType, TypeMetadata> = {
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

/**
 * 10개 타입 메타데이터 (한국어).
 */
const TYPE_METADATA_KO: Record<SajuType, TypeMetadata> = {
  'mu-huo-zhi-ren': {
    code: 'A1-목화형',
    label: '목화인',
    dominantElement: 'wood',
    subElement: 'fire',
    bodyStrength: '신강',
    bodyStrengthDesc: '전체 에너지가 왕성하고, 자아의식과 행동력이 강하며, 적극적으로 개척하는 데 적합',
    favorableGod: '水、金',
    favorableGodDesc: '水는 과열을 막아주고, 金은 방향을 다듬어 열정 속에서 절제를 유지하게 돕습니다',
    coreTraitSummary: '이상으로 행동을 이끌며 직관이 예리하지만 리듬 조절을 배울 필요가 있습니다',
  },
  'jin-shui-zhi-ren': {
    code: 'A2-금수형',
    label: '금수인',
    dominantElement: 'metal',
    subElement: 'water',
    bodyStrength: '신강',
    bodyStrengthDesc: '내면 에너지가 차분하고 날카로우며, 분석력과 판단력이 핵심 강점입니다',
    favorableGod: '木、火',
    favorableGodDesc: '木은 에너지를 밖으로 이끌고, 火는 지나치게 냉철한 내면을 따뜻하게 해 표현력을 돕습니다',
    coreTraitSummary: '냉정히 관찰한 뒤 정확히 행동하며, 깊이 생각하지만 표현 타이밍에 유의해야 합니다',
  },
  'tu-jin-zhi-ren': {
    code: 'A3-토금형',
    label: '토금인',
    dominantElement: 'earth',
    subElement: 'metal',
    bodyStrength: '신강',
    bodyStrengthDesc: '에너지가 두터우며 견고하고, 인내심과 책임감이 가장 큰 특질입니다',
    favorableGod: '木、水',
    favorableGodDesc: '木은 고정된 구조를 느슨하게 하고, 水는 유연함을 더해 건실함 속 탄력을 유지하게 합니다',
    coreTraitSummary: '꾸준히 실천하는 사람으로 믿음직하지만 지나치게 보수적이 되지 않도록 주의해야 합니다',
  },
  'shui-mu-zhi-ren': {
    code: 'A4-수목형',
    label: '수목인',
    dominantElement: 'water',
    subElement: 'wood',
    bodyStrength: '중화',
    bodyStrengthDesc: '에너지가 유동과 성장의 균형을 이루며, 적응력이 천부적 강점입니다',
    favorableGod: '火、土',
    favorableGodDesc: '火는 방향에 초점을 주고, 土는 안정된 토대를 마련해 유동 속에서 균형점을 찾게 합니다',
    coreTraitSummary: '유연하고 탐험적인 성향으로 적응력이 뛰어나지만 방향감각을 의도적으로 키울 필요가 있습니다',
  },
  'huo-tu-zhi-ren': {
    code: 'A5-화토형',
    label: '화토인',
    dominantElement: 'fire',
    subElement: 'earth',
    bodyStrength: '신강',
    bodyStrengthDesc: '에너지가 따뜻하고 두터우며, 행동력과 책임감을 함께 갖춥니다',
    favorableGod: '金、水',
    favorableGodDesc: '金은 과한 헌신을 정리하고, 水는 식혀 고갈을 막아 남을 돌보는 동안 자신도 챙기게 합니다',
    coreTraitSummary: '따뜻한 실행파로 타인을 잘 돌보지만 경계를 세우는 법을 배울 필요가 있습니다',
  },
  'mu-jin-zhi-ren': {
    code: 'B1-목금형',
    label: '목금인',
    dominantElement: 'wood',
    subElement: 'metal',
    bodyStrength: '중화',
    bodyStrengthDesc: '성장과 수렴의 힘이 역동적으로 균형을 이루며, 스스로를 바로잡는 기제가 있습니다',
    favorableGod: '水、火',
    favorableGodDesc: '水는 성장 에너지를 불려주고, 火는 목금 간 긴장을 풀어 확장과 수렴을 매끄럽게 합니다',
    coreTraitSummary: '성장과 절제 사이에서 균형을 추구하며, 정제된 성향이지만 지나친 자기 요구를 피해야 합니다',
  },
  'jin-mu-zhi-ren': {
    code: 'B2-금목형',
    label: '금목인',
    dominantElement: 'metal',
    subElement: 'wood',
    bodyStrength: '중화',
    bodyStrengthDesc: '구조감과 성장력이 공존하며, 규칙 의식과 유연함을 함께 갖춥니다',
    favorableGod: '水、土',
    favorableGodDesc: '水는 금목 사이를 잇고, 土는 기반을 단단히 해 구조에 온기를 더합니다',
    coreTraitSummary: '원칙 있는 건설자로 체계적 사고가 있지만 즉흥의 여지를 두는 것이 좋습니다',
  },
  'shui-huo-zhi-ren': {
    code: 'B3-수화형',
    label: '수화인',
    dominantElement: 'water',
    subElement: 'fire',
    bodyStrength: '신약',
    bodyStrengthDesc: '내면 에너지가 깊은 침잠과 폭발 사이를 오가며, 감정이 풍부하지만 표현에는 시간이 걸립니다',
    favorableGod: '木、土',
    favorableGodDesc: '木은 수화 에너지가 표출되게 하고, 土는 안정된 그릇이 되어 내면 세계가 담길 공간을 제공합니다',
    coreTraitSummary: '깊은 감성가로 겉과 속이 다르지만 독특한 이중 시각을 지닙니다',
  },
  'huo-jin-zhi-ren': {
    code: 'B4-화금형',
    label: '화금인',
    dominantElement: 'fire',
    subElement: 'metal',
    bodyStrength: '신강',
    bodyStrengthDesc: '에너지가 넘치고 추진력이 강하며, 행동력과 결단력이 핵심 무기입니다',
    favorableGod: '土、水',
    favorableGodDesc: '土는 화금 충돌을 완충하고, 水는 식혀 주어 질주 후 회복할 여유를 줍니다',
    coreTraitSummary: '결단력 있는 실행자로 목표가 분명하지만 행동과 대기 사이 리듬을 찾을 필요가 있습니다',
  },
  'tu-shui-zhi-ren': {
    code: 'B5-토수형',
    label: '토수인',
    dominantElement: 'earth',
    subElement: 'water',
    bodyStrength: '신약',
    bodyStrengthDesc: '에너지가 고요하고 깊으며, 겉으로는 차분하지만 내면은 표면보다 풍부하게 움직입니다',
    favorableGod: '火、金',
    favorableGodDesc: '火는 에너지에 온기와 동력을 주고, 金은 생각을 행동으로 바꾸어 내면의 풍요를 드러내게 합니다',
    coreTraitSummary: '조용한 관찰자로 차곡차곡 쌓아가지만 때로 자신을 드러내는 것을 배울 필요가 있습니다',
  },
};

/** en은 zh-TW 폴백 */
const TYPE_METADATA_EN = TYPE_METADATA_ZH;

const METADATA_BY_LOCALE: Record<Locale, Record<SajuType, TypeMetadata>> = {
  'zh-TW': TYPE_METADATA_ZH,
  ko: TYPE_METADATA_KO,
  en: TYPE_METADATA_EN,
};

/** locale별 타입 메타데이터 조회 */
export function getTypeMetadata(locale: Locale): Record<SajuType, TypeMetadata> {
  return METADATA_BY_LOCALE[locale] ?? TYPE_METADATA_ZH;
}

/** @deprecated getTypeMetadata(locale)[type] 사용 */
export const TYPE_METADATA = TYPE_METADATA_ZH;
