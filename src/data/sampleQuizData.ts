import type { QuizProps } from "@/types/quiz";

export const sampleQuizzes: QuizProps[] = [
    // タイプ0: 一問一答(2択) - テキスト問題文
    {
        id: "0-1",
        type: "text",
        question: "JavaScriptの拡張言語はどれですか？",
        choices: [
            { id: "a", text: "TypeScript", isCorrect: true },
            { id: "b", text: "CoffeeScript", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // タイプ0: 一問一答(2択) - テキスト&画像問題
    {
        id: "0-2",
        type: "image",
        question: "この画像はどの都市の風景ですか？",
        imageUrl: "https://picsum.photos/id/1018/600/400",
        imageAlt: "都市の風景",
        choices: [
            { id: "a", text: "東京", isCorrect: false },
            { id: "b", text: "京都", isCorrect: true },
        ],
        onAnswer: () => {},
    },

    // タイプ0: 一問一答(2択) - テキスト&動画問題
    {
        id: "0-3",
        type: "video",
        question: "このビデオでは何について説明していますか？",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        poster: "https://www.w3schools.com/images/w3schools_logo_436_2.png",
        choices: [
            { id: "a", text: "プログラミング言語", isCorrect: false },
            { id: "b", text: "自然の風景", isCorrect: true },
        ],
        onAnswer: () => {},
    },

    // タイプ0: 一問一答(2択) - テキスト&音声問題
    {
        id: "0-4",
        type: "audio",
        question: "この音声で聞こえる楽器は何ですか？",
        audioUrl: "https://www.w3schools.com/html/horse.mp3",
        choices: [
            { id: "a", text: "ピアノ", isCorrect: false },
            { id: "b", text: "ドラム", isCorrect: true },
        ],
        onAnswer: () => {},
    },

    // タイプ1: 一問一答(2択) 選択肢が画像ver - テキスト問題文
    {
        id: "1-1",
        type: "imageChoice",
        question: "正しいロゴはどちらですか？",
        choices: [
            {
                id: "a",
                imageUrl:
                    "https://www.w3schools.com/images/w3schools_logo_436_2.png",
                imageAlt: "W3Schoolsロゴ",
                isCorrect: true,
            },
            {
                id: "b",
                imageUrl: "https://picsum.photos/id/237/200/100",
                imageAlt: "別のロゴ",
                isCorrect: false,
            },
        ],
        onAnswer: () => {},
    },

    // タイプ1: 一問一答(2択) 選択肢が画像ver - テキスト&音声問題
    {
        id: "1-2",
        type: "imageChoice",
        question: "この音声に最も関連する画像はどちらですか？",
        audioUrl: "https://www.w3schools.com/html/horse.mp3",
        choices: [
            {
                id: "a",
                imageUrl: "https://picsum.photos/id/237/200/200",
                imageAlt: "犬の画像",
                isCorrect: false,
            },
            {
                id: "b",
                imageUrl: "https://picsum.photos/id/1074/200/200",
                imageAlt: "馬の画像",
                isCorrect: true,
            },
        ],
        onAnswer: () => {},
    },

    // タイプ2: 一問一答(4択) - テキスト問題文
    {
        id: "2-1",
        type: "text",
        question: "次のうち、日本の首都はどれですか？",
        choices: [
            { id: "a", text: "大阪", isCorrect: false },
            { id: "b", text: "京都", isCorrect: false },
            { id: "c", text: "東京", isCorrect: true },
            { id: "d", text: "横浜", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // タイプ2: 一問一答(4択) - テキスト&画像問題
    {
        id: "2-2",
        type: "image",
        question: "この画像はどの動物ですか？",
        imageUrl: "https://picsum.photos/id/237/400/300",
        imageAlt: "動物の写真",
        choices: [
            { id: "a", text: "猫", isCorrect: false },
            { id: "b", text: "犬", isCorrect: true },
            { id: "c", text: "うさぎ", isCorrect: false },
            { id: "d", text: "ハムスター", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // タイプ4: 一問多答(4択) - テキスト問題文
    {
        id: "4-1",
        type: "multiAnswer",
        question: "次のうち、果物はどれですか？（複数選択可）",
        choices: [
            { id: "a", text: "りんご", isCorrect: true },
            { id: "b", text: "トマト", isCorrect: true },
            { id: "c", text: "じゃがいも", isCorrect: false },
            { id: "d", text: "キュウリ", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // タイプ4: 一問多答(4択) - テキスト&画像問題
    {
        id: "4-2",
        type: "multiAnswer",
        question: "この画像の中に含まれるものをすべて選んでください",
        imageUrl: "https://picsum.photos/id/1084/400/300",
        imageAlt: "風景写真",
        choices: [
            { id: "a", text: "山", isCorrect: true },
            { id: "b", text: "川", isCorrect: true },
            { id: "c", text: "建物", isCorrect: false },
            { id: "d", text: "自動車", isCorrect: false },
        ],
        onAnswer: () => {},
    },
];
