/**
 * 選択肢の型定義
 */
export interface Choice {
    id: string;
    text: string;
    isCorrect: boolean;
}

/**
 * 問題の基本型定義
 */
export interface QuizBaseProps {
    id: string;
    question: string;
    choices: Choice[];
    onAnswer: (choiceId: string) => void;
}

/**
 * テキストのみの問題
 */
export interface TextQuizProps extends QuizBaseProps {
    type: "text";
}

/**
 * 画像付きの問題
 */
export interface ImageQuizProps extends QuizBaseProps {
    type: "image";
    imageUrl: string;
    imageAlt?: string;
}

/**
 * 動画付きの問題
 */
export interface VideoQuizProps extends QuizBaseProps {
    type: "video";
    videoUrl: string;
    poster?: string;
}

/**
 * 音声付きの問題
 */
export interface AudioQuizProps extends QuizBaseProps {
    type: "audio";
    audioUrl: string;
}

/**
 * すべての問題タイプのユニオン
 */
export type QuizProps =
    | TextQuizProps
    | ImageQuizProps
    | VideoQuizProps
    | AudioQuizProps;
