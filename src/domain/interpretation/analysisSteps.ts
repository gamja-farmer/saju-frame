/**
 * 분석 단계 구조 (Layer 2).
 * 4단계 분석 과정을 타입별로 정의.
 * 각 단계: 제목 + 근거 라벨 + 논리 연결 문장.
 * variant와 무관하게 타입 고정.
 */

import type { SajuType } from '@/domain/saju/types';

export type Locale = 'zh-TW' | 'ko' | 'en';

export interface AnalysisStep {
  /** 단계 제목 (예: "命盤解析") */
  title: string;
  /** 근거 라벨 (예: "判斷依據：四柱原局結構") */
  basisLabel: string;
  /** 논리 연결 문장 — "由於…因此…" 또는 "當…時，容易…" 패턴 */
  logicSentence: string;
}

/** 4단계 제목 상수 (번체 중국어) */
export const STEP_TITLES = [
  '命盤解析',
  '五行平衡',
  '性格推導',
  '運勢建議',
] as const;

/** 4단계 제목 (한국어) */
export const STEP_TITLES_KO = [
  '명반 분석',
  '오행 균형',
  '성격 추론',
  '운세 제안',
] as const;

/**
 * 타입별 4단계 분석 (번체 중국어).
 */
const analysisStepTemplatesZh: Record<SajuType, AnalysisStep[]> = {
  'mu-huo-zhi-ren': [
    {
      title: '命盤解析',
      basisLabel: '判斷依據：四柱原局結構',
      logicSentence: '由於你的日主屬木，且命盤中火的能量明顯，因此整體命盤呈現出一種「理想驅動、直覺先行」的結構特徵。',
    },
    {
      title: '五行平衡',
      basisLabel: '判斷依據：五行比例分析',
      logicSentence: '由於木火能量佔比偏高，整體五行分布呈現偏旺的狀態，因此你的能量傾向於向外擴張，需要適度的收斂來維持平衡。',
    },
    {
      title: '性格推導',
      basisLabel: '判斷依據：日主特質＋五行偏向',
      logicSentence: '由於日主木氣受到火的引動，因此在性格上你傾向於快速點燃熱情、以直覺做決策，行動力強但需要注意節奏的控制。',
    },
    {
      title: '運勢建議',
      basisLabel: '判斷依據：喜用神方向',
      logicSentence: '由於你的喜用神為水和金，因此在人生節奏上，適度的沉澱和修整會幫助你走得更穩、更遠。',
    },
  ],
  'jin-shui-zhi-ren': [
    {
      title: '命盤解析',
      basisLabel: '判斷依據：四柱原局結構',
      logicSentence: '由於你的日主屬金，且命盤中水的能量顯著，因此整體命盤呈現出「冷靜分析、深度思考」的結構特徵。',
    },
    {
      title: '五行平衡',
      basisLabel: '判斷依據：五行比例分析',
      logicSentence: '由於金水能量偏重，整體偏向內斂和沉澱，因此你的能量適合深耕而非廣撒，精準投入比盲目擴張更有效。',
    },
    {
      title: '性格推導',
      basisLabel: '判斷依據：日主特質＋五行偏向',
      logicSentence: '由於日主金氣得水之助而更加銳利，因此你天生具有洞察力和判斷力，但在表達和行動上傾向謹慎而內斂。',
    },
    {
      title: '運勢建議',
      basisLabel: '判斷依據：喜用神方向',
      logicSentence: '由於你的喜用神為木和火，因此在人生發展上，適度的向外表達和主動行動會幫助你將內在的深度轉化為外在的成果。',
    },
  ],
  'tu-jin-zhi-ren': [
    {
      title: '命盤解析',
      basisLabel: '判斷依據：四柱原局結構',
      logicSentence: '由於你的日主屬土，且命盤中金的能量明顯，因此整體命盤呈現出「穩重務實、注重原則」的結構特徵。',
    },
    {
      title: '五行平衡',
      basisLabel: '判斷依據：五行比例分析',
      logicSentence: '由於土金能量偏重，整體偏向穩固和收斂，因此你的能量適合長期累積，但需要注意保持一定的靈活度。',
    },
    {
      title: '性格推導',
      basisLabel: '判斷依據：日主特質＋五行偏向',
      logicSentence: '由於日主土氣得金之助而更加堅實，因此你天生具有承擔力和持久力，做事講究步驟和原則。',
    },
    {
      title: '運勢建議',
      basisLabel: '判斷依據：喜用神方向',
      logicSentence: '由於你的喜用神為木和水，因此在人生發展上，適度的突破和變通會幫助你避免過度保守而錯失機會。',
    },
  ],
  'shui-mu-zhi-ren': [
    {
      title: '命盤解析',
      basisLabel: '判斷依據：四柱原局結構',
      logicSentence: '由於你的日主屬水，且命盤中木的能量顯著，因此整體命盤呈現出「靈活流動、持續生長」的結構特徵。',
    },
    {
      title: '五行平衡',
      basisLabel: '判斷依據：五行比例分析',
      logicSentence: '由於水木能量處於相對平衡的狀態，因此你具有良好的適應力，但需要刻意培養聚焦的能力來避免能量分散。',
    },
    {
      title: '性格推導',
      basisLabel: '判斷依據：日主特質＋五行偏向',
      logicSentence: '由於日主水氣得木之引導而向外生長，因此你天生具有探索精神和成長欲望，環境適應力很強。',
    },
    {
      title: '運勢建議',
      basisLabel: '判斷依據：喜用神方向',
      logicSentence: '由於你的喜用神為火和土，因此在人生發展上，找到明確的目標和穩定的根基會幫助你將探索的能量轉化為具體的成果。',
    },
  ],
  'huo-tu-zhi-ren': [
    {
      title: '命盤解析',
      basisLabel: '判斷依據：四柱原局結構',
      logicSentence: '由於你的日主屬火，且命盤中土的能量明顯，因此整體命盤呈現出「溫暖踏實、行動與承擔並重」的結構特徵。',
    },
    {
      title: '五行平衡',
      basisLabel: '判斷依據：五行比例分析',
      logicSentence: '由於火土能量偏旺，整體偏向溫暖和厚實，因此你天生具有照顧者的特質，但需要注意避免過度承擔。',
    },
    {
      title: '性格推導',
      basisLabel: '判斷依據：日主特質＋五行偏向',
      logicSentence: '由於日主火氣得土之承載而更加穩定，因此你既有行動的熱情又有落地的能力，是能讓別人安心的存在。',
    },
    {
      title: '運勢建議',
      basisLabel: '判斷依據：喜用神方向',
      logicSentence: '由於你的喜用神為金和水，因此在人生發展上，學會適度收斂和自我保護會幫助你持續燃燒而不至於耗盡。',
    },
  ],
  'mu-jin-zhi-ren': [
    {
      title: '命盤解析',
      basisLabel: '判斷依據：四柱原局結構',
      logicSentence: '由於你的日主屬木，但命盤中金的能量形成制約，因此整體命盤呈現出「成長與修剪並存」的張力結構。',
    },
    {
      title: '五行平衡',
      basisLabel: '判斷依據：五行比例分析',
      logicSentence: '由於木金之間存在相剋的張力，因此你的能量在擴展和收斂之間形成動態平衡，這種張力反而是你精煉自我的來源。',
    },
    {
      title: '性格推導',
      basisLabel: '判斷依據：日主特質＋五行偏向',
      logicSentence: '由於日主木氣受金的修剪而更加精煉，因此你同時具有成長的渴望和自律的能力，在探索與節制之間尋找平衡。',
    },
    {
      title: '運勢建議',
      basisLabel: '判斷依據：喜用神方向',
      logicSentence: '由於你的喜用神為水和火，因此在人生發展上，滋養成長的力量和化解內在張力的溫度都是你需要的支持。',
    },
  ],
  'jin-mu-zhi-ren': [
    {
      title: '命盤解析',
      basisLabel: '判斷依據：四柱原局結構',
      logicSentence: '由於你的日主屬金，但命盤中木的能量帶來生長的力量，因此整體命盤呈現出「結構中有彈性」的特徵。',
    },
    {
      title: '五行平衡',
      basisLabel: '判斷依據：五行比例分析',
      logicSentence: '由於金木之間的張力被其他元素緩和，因此你的能量在秩序和活力之間找到了共存的方式。',
    },
    {
      title: '性格推導',
      basisLabel: '判斷依據：日主特質＋五行偏向',
      logicSentence: '由於日主金氣與木的生長力共存，因此你天生具有建構的能力——既能建立秩序，又能在秩序中留出發展的空間。',
    },
    {
      title: '運勢建議',
      basisLabel: '判斷依據：喜用神方向',
      logicSentence: '由於你的喜用神為水和土，因此在人生發展上，增加潤澤和穩固的力量會讓你的建構更加持久和有溫度。',
    },
  ],
  'shui-huo-zhi-ren': [
    {
      title: '命盤解析',
      basisLabel: '判斷依據：四柱原局結構',
      logicSentence: '由於你的日主屬水，但命盤中火的能量形成對比，因此整體命盤呈現出「深沉與爆發交替」的矛盾結構。',
    },
    {
      title: '五行平衡',
      basisLabel: '判斷依據：五行比例分析',
      logicSentence: '由於水火之間存在明顯的張力，因此你的能量波動幅度較大，高峰期創造力驚人，低谷期需要安靜充電。',
    },
    {
      title: '性格推導',
      basisLabel: '判斷依據：日主特質＋五行偏向',
      logicSentence: '由於日主水氣與火的表達力共存，因此你內在感受豐富但表達需要過程，外在的平靜下藏著深層的情感流動。',
    },
    {
      title: '運勢建議',
      basisLabel: '判斷依據：喜用神方向',
      logicSentence: '由於你的喜用神為木和土，因此在人生發展上，找到將內在感受轉化為外在表達的管道，以及穩定的支撐系統是關鍵。',
    },
  ],
  'huo-jin-zhi-ren': [
    {
      title: '命盤解析',
      basisLabel: '判斷依據：四柱原局結構',
      logicSentence: '由於你的日主屬火，且命盤中金的能量帶來收束力，因此整體命盤呈現出「推進力加上精準度」的行動型結構。',
    },
    {
      title: '五行平衡',
      basisLabel: '判斷依據：五行比例分析',
      logicSentence: '由於火金能量均強，整體偏向外放和行動，因此你的能量適合目標導向的推進，但需要適度的休息來避免過度消耗。',
    },
    {
      title: '性格推導',
      basisLabel: '判斷依據：日主特質＋五行偏向',
      logicSentence: '由於日主火氣得金的收束而更加精準，因此你既有衝勁又懂得在關鍵時刻收住力道，決斷力是你最大的優勢。',
    },
    {
      title: '運勢建議',
      basisLabel: '判斷依據：喜用神方向',
      logicSentence: '由於你的喜用神為土和水，因此在人生發展上，適度的緩衝和冷靜的反思會讓你的行動更有效率、更可持續。',
    },
  ],
  'tu-shui-zhi-ren': [
    {
      title: '命盤解析',
      basisLabel: '判斷依據：四柱原局結構',
      logicSentence: '由於你的日主屬土，但命盤中水的能量帶來流動性，因此整體命盤呈現出「穩定中帶有深度」的內斂結構。',
    },
    {
      title: '五行平衡',
      basisLabel: '判斷依據：五行比例分析',
      logicSentence: '由於土水之間存在一定的張力，因此你的能量在穩固和流動之間尋找平衡，外在沉穩但內在持續運轉。',
    },
    {
      title: '性格推導',
      basisLabel: '判斷依據：日主特質＋五行偏向',
      logicSentence: '由於日主土氣與水的深沉共存，因此你天生具有觀察和包容的能力，但表達和行動的節奏比較慢熱。',
    },
    {
      title: '運勢建議',
      basisLabel: '判斷依據：喜用神方向',
      logicSentence: '由於你的喜用神為火和金，因此在人生發展上，注入更多的熱情和行動力會幫助你將深沉的積累轉化為被看見的成果。',
    },
  ],
};

/**
 * 타입별 4단계 분석 (한국어).
 */
const analysisStepTemplatesKo: Record<SajuType, AnalysisStep[]> = {
  'mu-huo-zhi-ren': [
    { title: '명반 분석', basisLabel: '판단 근거: 사주 원국 구조', logicSentence: '일주가 목(木)에 속하고 명반에 화(火) 에너지가 뚜렷하므로, 전반적으로 「이상 추동·직관 선행」의 구조적 특징을 보입니다.' },
    { title: '오행 균형', basisLabel: '판단 근거: 오행 비율 분석', logicSentence: '목화 에너지 비중이 높아 오행 분포가 왕성한 편이므로, 에너지가 밖으로 확장하려 하며 적절한 수렴이 균형 유지에 필요합니다.' },
    { title: '성격 추론', basisLabel: '판단 근거: 일주 특질 및 오행 편향', logicSentence: '일주 목기가 화에 의해 움직이므로, 성격상 열정을 빠르게 점화하고 직관으로 결단을 내리며, 행동력은 강하지만 리듬 조절에 유의해야 합니다.' },
    { title: '운세 제안', basisLabel: '판단 근거: 희용신 방향', logicSentence: '희용신이 수와 금이므로, 인생 리듬에서 적절한 침잠과 휴식이 더 안정적이고 먼 길을 걷는 데 도움이 됩니다.' },
  ],
  'jin-shui-zhi-ren': [
    { title: '명반 분석', basisLabel: '판단 근거: 사주 원국 구조', logicSentence: '일주가 금에 속하고 명반에 수 에너지가 뚜렷하므로, 전반적으로 「냉정한 분석·깊은 사고」의 구조적 특징을 보입니다.' },
    { title: '오행 균형', basisLabel: '판단 근거: 오행 비율 분석', logicSentence: '금수 에너지가 무거워 전체가 내향과 침잠 쪽이므로, 넓게 뿌리기보다 한 곳에 깊이 파고드는 데 적합하고, 정확한 집중이 무분별한 확장보다 효과적입니다.' },
    { title: '성격 추론', basisLabel: '판단 근거: 일주 특질 및 오행 편향', logicSentence: '일주 금기가 수의 도움으로 더 예리해져 통찰력과 판단력을 갖추지만, 표현과 행동에는 신중하고 내향적입니다.' },
    { title: '운세 제안', basisLabel: '판단 근거: 희용신 방향', logicSentence: '희용신이 목과 화이므로, 인생 발전에서 적절한 외적 표현과 적극적 행동이 내면의 깊이를 밖의 성과로 바꾸는 데 도움이 됩니다.' },
  ],
  'tu-jin-zhi-ren': [
    { title: '명반 분석', basisLabel: '판단 근거: 사주 원국 구조', logicSentence: '일주가 토에 속하고 명반에 금 에너지가 뚜렷하므로, 전반적으로 「견실하고 실용적이며 원칙 중시」의 구조적 특징을 보입니다.' },
    { title: '오행 균형', basisLabel: '판단 근거: 오행 비율 분석', logicSentence: '토금 에너지가 무거워 전체가 견고함과 수렴 쪽이므로, 장기적 축적에 적합하나 어느 정도 유연성을 유지하는 것이 좋습니다.' },
    { title: '성격 추론', basisLabel: '판단 근거: 일주 특질 및 오행 편향', logicSentence: '일주 토기가 금의 도움으로 더 단단해져 책임감과 지속력이 있고, 일을 단계와 원칙에 맞춰 진행합니다.' },
    { title: '운세 제안', basisLabel: '판단 근거: 희용신 방향', logicSentence: '희용신이 목과 수이므로, 인생 발전에서 적절한 돌파와 융통이 지나치게 보수적이어서 기회를 놓치는 것을 막는 데 도움이 됩니다.' },
  ],
  'shui-mu-zhi-ren': [
    { title: '명반 분석', basisLabel: '판단 근거: 사주 원국 구조', logicSentence: '일주가 수에 속하고 명반에 목 에너지가 뚜렷하므로, 전반적으로 「유연한 유동·지속적 성장」의 구조적 특징을 보입니다.' },
    { title: '오행 균형', basisLabel: '판단 근거: 오행 비율 분석', logicSentence: '수목 에너지가 상대적 균형에 있으므로 적응력이 좋지만, 에너지가 분산되지 않도록 집중력을 의식적으로 기를 필요가 있습니다.' },
    { title: '성격 추론', basisLabel: '판단 근거: 일주 특질 및 오행 편향', logicSentence: '일주 수기가 목의 인도로 밖으로 성장하므로, 탐구심과 성장 욕구가 있고 환경 적응력이 강합니다.' },
    { title: '운세 제안', basisLabel: '판단 근거: 희용신 방향', logicSentence: '희용신이 화와 토이므로, 인생 발전에서 명확한 목표와 안정된 기반을 마련하면 탐구 에너지를 구체적 성과로 바꾸는 데 도움이 됩니다.' },
  ],
  'huo-tu-zhi-ren': [
    { title: '명반 분석', basisLabel: '판단 근거: 사주 원국 구조', logicSentence: '일주가 화에 속하고 명반에 토 에너지가 뚜렷하므로, 전반적으로 「따뜻하고 실착실·행동과 책임감 병행」의 구조적 특징을 보입니다.' },
    { title: '오행 균형', basisLabel: '판단 근거: 오행 비율 분석', logicSentence: '화토 에너지가 왕성해 전체가 따뜻함과 두터움 쪽이므로 돌봄의 특질이 있지만, 지나친 부담을 피하는 것이 좋습니다.' },
    { title: '성격 추론', basisLabel: '판단 근거: 일주 특질 및 오행 편향', logicSentence: '일주 화기가 토에 의해 담겨 더 안정되어 행동의 열정과 현실로의 귀착 능력을 갖추고, 타인에게 안심을 주는 존재입니다.' },
    { title: '운세 제안', basisLabel: '판단 근거: 희용신 방향', logicSentence: '희용신이 금과 수이므로, 인생 발전에서 적절한 수렴과 자기 보호가 지속적으로 타오르며 고갈되지 않는 데 도움이 됩니다.' },
  ],
  'mu-jin-zhi-ren': [
    { title: '명반 분석', basisLabel: '판단 근거: 사주 원국 구조', logicSentence: '일주가 목에 속하나 명반에 금 에너지가 제약을 만들어 「성장과 다듬음이 공존」하는 긴장 구조를 보입니다.' },
    { title: '오행 균형', basisLabel: '판단 근거: 오행 비율 분석', logicSentence: '목금 간에 상극의 긴장이 있어, 에너지가 확장과 수렴 사이에서 역동적 균형을 이루며 이 긴장은 오히려 자기 정제의 원천이 됩니다.' },
    { title: '성격 추론', basisLabel: '판단 근거: 일주 특질 및 오행 편향', logicSentence: '일주 목기가 금에 의해 다듬어져 성장 욕구와 절제 능력을 동시에 갖추고, 탐구와 절제 사이에서 균형을 찾습니다.' },
    { title: '운세 제안', basisLabel: '판단 근거: 희용신 방향', logicSentence: '희용신이 수와 화이므로, 인생 발전에서 성장을 불리는 힘과 내면 긴장을 풀어주는 온기가 모두 필요한 지원입니다.' },
  ],
  'jin-mu-zhi-ren': [
    { title: '명반 분석', basisLabel: '판단 근거: 사주 원국 구조', logicSentence: '일주가 금에 속하나 명반에 목 에너지가 성장력을 더해 「구조 속 유연성」의 특징을 보입니다.' },
    { title: '오행 균형', basisLabel: '판단 근거: 오행 비율 분석', logicSentence: '금목 간 긴장이 다른 요소로 완화되어 에너지가 질서와 활력 사이에서 공존 방식을 찾습니다.' },
    { title: '성격 추론', basisLabel: '판단 근거: 일주 특질 및 오행 편향', logicSentence: '일주 금기와 목의 성장력이 공존해 건설 능력이 있으며, 질서를 세우면서도 그 안에 발전의 여지를 둡니다.' },
    { title: '운세 제안', basisLabel: '판단 근거: 희용신 방향', logicSentence: '희용신이 수와 토이므로, 인생 발전에서 윤택함과 견고함을 더하면 건설이 더 오래 가고 온기가 더해집니다.' },
  ],
  'shui-huo-zhi-ren': [
    { title: '명반 분석', basisLabel: '판단 근거: 사주 원국 구조', logicSentence: '일주가 수에 속하나 명반에 화 에너지가 대비를 이루어 「깊은 침잠과 폭발의 교차」라는 모순적 구조를 보입니다.' },
    { title: '오행 균형', basisLabel: '판단 근거: 오행 비율 분석', logicSentence: '수화 간에 뚜렷한 긴장이 있어 에너지 변동 폭이 크고, 고조 시 창의력이 뛰어나며 저조 시 고요한 충전이 필요합니다.' },
    { title: '성격 추론', basisLabel: '판단 근거: 일주 특질 및 오행 편향', logicSentence: '일주 수기와 화의 표현력이 공존해 내면 감정은 풍부하지만 표현에는 과정이 필요하며, 겉의 평온 아래 깊은 감정 흐름이 있습니다.' },
    { title: '운세 제안', basisLabel: '판단 근거: 희용신 방향', logicSentence: '희용신이 목과 토이므로, 인생 발전에서 내면 감정을 밖으로 표현하는 통로와 안정된 지지 체계를 마련하는 것이 핵심입니다.' },
  ],
  'huo-jin-zhi-ren': [
    { title: '명반 분석', basisLabel: '판단 근거: 사주 원국 구조', logicSentence: '일주가 화에 속하고 명반에 금 에너지가 수렴력을 더해 「추진력과 정확도」를 갖춘 행동형 구조를 보입니다.' },
    { title: '오행 균형', basisLabel: '판단 근거: 오행 비율 분석', logicSentence: '화금 에너지가 모두 강해 전체가 외향과 행동 쪽이므로 목표 지향적 추진에 적합하나, 과도한 소모를 막기 위한 적절한 휴식이 필요합니다.' },
    { title: '성격 추론', basisLabel: '판단 근거: 일주 특질 및 오행 편향', logicSentence: '일주 화기가 금의 수렴으로 더 정교해져 추진력과 함께 중요한 순간에 힘을 거두는 법을 알고, 결단력이 가장 큰 강점입니다.' },
    { title: '운세 제안', basisLabel: '판단 근거: 희용신 방향', logicSentence: '희용신이 토와 수이므로, 인생 발전에서 적절한 완충과 냉정한 성찰이 행동을 더 효율적이고 지속 가능하게 합니다.' },
  ],
  'tu-shui-zhi-ren': [
    { title: '명반 분석', basisLabel: '판단 근거: 사주 원국 구조', logicSentence: '일주가 토에 속하나 명반에 수 에너지가 유동성을 더해 「안정 속 깊이」를 지닌 내향 구조를 보입니다.' },
    { title: '오행 균형', basisLabel: '판단 근거: 오행 비율 분석', logicSentence: '토수 간에 일정한 긴장이 있어 에너지가 견고함과 유동 사이에서 균형을 찾고, 겉으로는 차분하지만 내면은 끊임없이 움직입니다.' },
    { title: '성격 추론', basisLabel: '판단 근거: 일주 특질 및 오행 편향', logicSentence: '일주 토기와 수의 깊이가 공존해 관찰과 포용 능력이 있지만, 표현과 행동의 리듬은 서서히 올라오는 편입니다.' },
    { title: '운세 제안', basisLabel: '판단 근거: 희용신 방향', logicSentence: '희용신이 화와 금이므로, 인생 발전에서 열정과 행동력을 더하면 깊이 쌓인 것이 드러나는 성과로 전환되는 데 도움이 됩니다.' },
  ],
};

const STEP_BY_LOCALE: Record<Locale, Record<SajuType, AnalysisStep[]>> = {
  'zh-TW': analysisStepTemplatesZh,
  ko: analysisStepTemplatesKo,
  en: analysisStepTemplatesZh,
};

/** locale별 분석 단계 조회 */
export function getAnalysisSteps(type: SajuType, locale: Locale): AnalysisStep[] {
  return (STEP_BY_LOCALE[locale] ?? analysisStepTemplatesZh)[type] ?? [];
}

/** @deprecated getAnalysisSteps(type, locale) 사용 */
export const analysisStepTemplates = analysisStepTemplatesZh;
