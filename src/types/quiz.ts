/**
 * 選択肢の型定義
 */
export interface Choice {
    id: string;
    text: string;
    isCorrect: boolean;
}

/**
 * 画像選択肢の型定義
 */
export interface ImageChoice {
    id: string;
    imageUrl: string;
    imageAlt?: string;
    isCorrect: boolean;
}

/**
 * 順序選択肢の型定義
 */
export interface OrderChoice {
    id: string;
    text: string;
    order: number;
}

/**
 * 組み合わせアイテムの型定義
 */
export interface CombinationItem {
    id: string;
    text: string;
}

/**
 * 組み合わせの正解パターン
 */
export interface CombinationPair {
    leftId: string;
    rightId: string;
}

/**
 * 問題の基本型定義
 */
export interface QuizBaseProps {
    id: string;
    question: string;
    onAnswer: (choiceId: string | string[]) => void;
}

/**
 * 選択肢を持つ問題の基本型
 */
export interface ChoiceQuizBaseProps extends QuizBaseProps {
    choices: Choice[];
}

/**
 * メディア付き問題の基本型
 */
export interface MediaQuizBaseProps {
    imageUrl?: string;
    imageAlt?: string;
    videoUrl?: string;
    poster?: string;
    audioUrl?: string;
}

/**
 * テキストのみの問題
 */
export interface TextQuizProps extends ChoiceQuizBaseProps {
    type: "text";
}

/**
 * 画像付きの問題
 */
export interface ImageQuizProps extends ChoiceQuizBaseProps {
    type: "image";
    imageUrl: string;
    imageAlt?: string;
}

/**
 * 動画付きの問題
 */
export interface VideoQuizProps extends ChoiceQuizBaseProps {
    type: "video";
    videoUrl: string;
    poster?: string;
}

/**
 * 音声付きの問題
 */
export interface AudioQuizProps extends ChoiceQuizBaseProps {
    type: "audio";
    audioUrl: string;
}

/**
 * 選択肢が画像の問題
 */
export interface ImageChoiceQuizProps
    extends QuizBaseProps,
        MediaQuizBaseProps {
    type: "imageChoice";
    choices: ImageChoice[];
}

/**
 * 複数回答可能な問題
 */
export interface MultiAnswerQuizProps
    extends ChoiceQuizBaseProps,
        MediaQuizBaseProps {
    type: "multiAnswer";
}

/**
 * 順序選択問題
 */
export interface OrderSelectionQuizProps
    extends QuizBaseProps,
        MediaQuizBaseProps {
    type: "orderSelection";
    choices: OrderChoice[];
}

/**
 * 文字の順序選択問題
 */
export interface CharacterOrderQuizProps
    extends QuizBaseProps,
        MediaQuizBaseProps {
    type: "characterOrder";
    characters: string[];
    correctAnswer: string;
}

/**
 * 組み合わせ選択問題
 */
export interface CombinationQuizProps
    extends QuizBaseProps,
        MediaQuizBaseProps {
    type: "combination";
    leftItems: CombinationItem[];
    rightItems: CombinationItem[];
    correctCombinations: CombinationPair[];
}

/**
 * 数字入力問題
 */
export interface NumberInputQuizProps
    extends QuizBaseProps,
        MediaQuizBaseProps {
    type: "numberInput";
    correctAnswer: number;
    maxDigits: number;
}

/**
 * すべての問題タイプのユニオン
 *
 * 【実装済みのクイズタイプ】
 * - text: テキストのみの問題
 * - image: 画像付きの問題
 * - video: 動画付きの問題
 * - audio: 音声付きの問題
 * - imageChoice: 選択肢が画像の問題
 * - multiAnswer: 複数回答可能な問題
 *
 * 【未実装のクイズタイプ】
 * 以下のタイプは型定義は存在しますが、表示コンポーネントが未実装のため使用できません：
 * - orderSelection: 順序選択問題
 * - characterOrder: 文字の順序選択問題
 * - combination: 組み合わせ選択問題
 * - numberInput: 数字入力問題
 */
export type QuizProps =
    | TextQuizProps
    | ImageQuizProps
    | VideoQuizProps
    | AudioQuizProps
    | ImageChoiceQuizProps
    | MultiAnswerQuizProps
    | OrderSelectionQuizProps
    | CharacterOrderQuizProps
    | CombinationQuizProps
    | NumberInputQuizProps;
