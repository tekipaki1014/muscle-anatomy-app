export interface Muscle {
    id: string;
    name: string;      // Japanese name (e.g., 上腕二頭筋)
    nameEn: string;    // English name (e.g., Biceps Brachii)
    origin: string;    // 起始
    insertion: string; // 停止
    innervation: string; // 支配神経
    segment: string;   // 髄節レベル (e.g., C5, C6)
    category: 'shoulder' | 'arm' | 'forearm' | 'hand'; // 部位カテゴリー
}

export type QuizMode = '4choice' | 'reverse' | 'combination';
export type QuestionType = 'innervation' | 'origin' | 'insertion' | 'nameEn';
