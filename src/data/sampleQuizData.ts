import type { QuizProps } from "@/types/quiz";

export const sampleQuizzes: QuizProps[] = [
    // テキストクイズ（4択）
    {
        id: "1",
        type: "text",
        question: "JavaScriptの拡張言語はどれですか？",
        choices: [
            { id: "a", text: "TypeScript", isCorrect: true },
            { id: "b", text: "CoffeeScript", isCorrect: false },
            { id: "c", text: "Dart", isCorrect: false },
            { id: "d", text: "Ruby", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // テキストクイズ（3択）
    {
        id: "2",
        type: "text",
        question: "Reactの開発元は？",
        choices: [
            { id: "a", text: "Google", isCorrect: false },
            { id: "b", text: "Facebook（Meta）", isCorrect: true },
            { id: "c", text: "Microsoft", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // 画像クイズ（4択）
    {
        id: "3",
        type: "image",
        question: "この画像はどの都市の風景ですか？",
        imageUrl: "https://picsum.photos/id/1018/600/400",
        imageAlt: "都市の風景",
        choices: [
            { id: "a", text: "東京", isCorrect: false },
            { id: "b", text: "京都", isCorrect: true },
            { id: "c", text: "大阪", isCorrect: false },
            { id: "d", text: "札幌", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // 画像クイズ（2択）
    {
        id: "4",
        type: "image",
        question: "この建物の名前は？",
        imageUrl: "https://picsum.photos/id/1040/600/400",
        imageAlt: "有名な建物",
        choices: [
            { id: "a", text: "エッフェル塔", isCorrect: true },
            { id: "b", text: "東京タワー", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // 動画クイズ（3択）
    {
        id: "5",
        type: "video",
        question: "このビデオでは何について説明していますか？",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        poster: "https://www.w3schools.com/images/w3schools_logo_436_2.png",
        choices: [
            { id: "a", text: "プログラミング言語", isCorrect: false },
            { id: "b", text: "自然の風景", isCorrect: true },
            { id: "c", text: "宇宙探査", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // 動画クイズ（4択）
    {
        id: "6",
        type: "video",
        question: "この動画に登場する動物は何ですか？",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        poster: "https://www.w3schools.com/images/w3schools_logo_436_2.png",
        choices: [
            { id: "a", text: "ライオン", isCorrect: false },
            { id: "b", text: "ウサギ", isCorrect: true },
            { id: "c", text: "クマ", isCorrect: false },
            { id: "d", text: "キリン", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // 音声クイズ（2択）
    {
        id: "7",
        type: "audio",
        question: "この音声で聞こえる楽器は何ですか？",
        audioUrl: "https://www.w3schools.com/html/horse.mp3",
        choices: [
            { id: "a", text: "ピアノ", isCorrect: false },
            { id: "b", text: "ドラム", isCorrect: true },
        ],
        onAnswer: () => {},
    },

    // 音声クイズ（4択）
    {
        id: "8",
        type: "audio",
        question: "この音声はどの動物の鳴き声ですか？",
        audioUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        choices: [
            { id: "a", text: "イヌ", isCorrect: false },
            { id: "b", text: "ネコ", isCorrect: false },
            { id: "c", text: "ウマ", isCorrect: true },
            { id: "d", text: "トリ", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // テキストクイズ（4択）
    {
        id: "9",
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

    // テキストクイズ（4択）
    {
        id: "10",
        type: "text",
        question: "HTMLの略称として正しいものは？",
        choices: [
            { id: "a", text: "Hyper Text Markup Language", isCorrect: true },
            { id: "b", text: "High Tech Modern Language", isCorrect: false },
            { id: "c", text: "Home Tool Markup Language", isCorrect: false },
            {
                id: "d",
                text: "Hyperlinks and Text Markup Language",
                isCorrect: false,
            },
        ],
        onAnswer: () => {},
    },
];
