import type { QuizProps } from "@/types/quiz";

export const sampleQuizzes: QuizProps[] = [
    // 1. テキスト問題 (4択)
    {
        id: "1",
        type: "text",
        question: "プログラミングにおいて「DRY原則」とは何の略称ですか？",
        choices: [
            { id: "a", text: "Do Repeat Yourself", isCorrect: false },
            { id: "b", text: "Don't Repeat Yourself", isCorrect: true },
            { id: "c", text: "Define Reusable Yield", isCorrect: false },
            { id: "d", text: "Document Regularly Yearly", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // 2. 画像付きの問題 (4択)
    {
        id: "2",
        type: "image",
        question: "この画像は何を表していますか？",
        imageUrl: "https://picsum.photos/id/0/500/300",
        imageAlt: "ノートパソコンとコーヒーカップの画像",
        choices: [
            { id: "a", text: "プログラミング環境", isCorrect: true },
            { id: "b", text: "カフェの風景", isCorrect: false },
            { id: "c", text: "オフィスデスク", isCorrect: false },
            { id: "d", text: "デジタルアート", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // 3. 動画付きの問題 (4択)
    {
        id: "3",
        type: "video",
        question: "この動画で主に紹介されているのは何ですか？",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        poster: "https://www.w3schools.com/images/picture.jpg",
        choices: [
            { id: "a", text: "宇宙の風景", isCorrect: false },
            { id: "b", text: "都市の景観", isCorrect: false },
            { id: "c", text: "自然の生態系", isCorrect: true },
            { id: "d", text: "海洋生物", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // 4. 音声付きの問題 (4択)
    {
        id: "4",
        type: "audio",
        question: "この音声で聞こえる動物は何ですか？",
        audioUrl: "https://www.w3schools.com/html/horse.mp3",
        choices: [
            { id: "a", text: "犬", isCorrect: false },
            { id: "b", text: "猫", isCorrect: false },
            { id: "c", text: "馬", isCorrect: true },
            { id: "d", text: "鳥", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // 5. 選択肢が画像の問題
    {
        id: "5",
        type: "imageChoice",
        question: "次のうち、Reactのロゴはどれですか？",
        choices: [
            {
                id: "a",
                imageUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
                imageAlt: "Reactロゴ",
                isCorrect: true,
            },
            {
                id: "b",
                imageUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/512px-Vue.js_Logo_2.svg.png",
                imageAlt: "Vueロゴ",
                isCorrect: false,
            },
            {
                id: "c",
                imageUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/512px-Angular_full_color_logo.svg.png",
                imageAlt: "Angularロゴ",
                isCorrect: false,
            },
            {
                id: "d",
                imageUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png",
                imageAlt: "JavaScriptロゴ",
                isCorrect: false,
            },
        ],
        onAnswer: () => {},
    },

    // 6. 複数回答可能な問題
    {
        id: "6",
        type: "multiAnswer",
        question:
            "次のうち、JavaScriptのフレームワークはどれですか？（複数選択可）",
        choices: [
            { id: "a", text: "React", isCorrect: true },
            { id: "b", text: "Angular", isCorrect: true },
            { id: "c", text: "Django", isCorrect: false },
            { id: "d", text: "Vue.js", isCorrect: true },
        ],
        onAnswer: () => {},
    },

    // 7. 順序選択問題
    {
        id: "7",
        type: "orderSelection",
        question: "ソフトウェア開発ライフサイクルの正しい順序を選んでください",
        choices: [
            { id: "a", text: "計画", order: 1 },
            { id: "b", text: "分析", order: 2 },
            { id: "c", text: "設計", order: 3 },
            { id: "d", text: "実装", order: 4 },
            { id: "e", text: "テスト", order: 5 },
            { id: "f", text: "運用・保守", order: 6 },
        ],
        onAnswer: () => {},
    },

    // 8. 文字の順序選択問題
    {
        id: "8",
        type: "characterOrder",
        question:
            "次の文字を並べ替えて、正しいプログラミング言語の名前を作ってください",
        characters: ["P", "Y", "T", "H", "O", "N"],
        correctAnswer: "PYTHON",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/200px-Python-logo-notext.svg.png",
        imageAlt: "Pythonのロゴ",
        onAnswer: () => {},
    },

    // 9. 数字入力問題
    {
        id: "9",
        type: "numberInput",
        question: "2^10 = ?",
        correctAnswer: 1024,
        maxDigits: 4,
        imageUrl: "https://picsum.photos/id/237/500/300",
        imageAlt: "計算のイメージ",
        onAnswer: () => {},
    },

    // 10. 複数回答可能な問題 (別バージョン)
    {
        id: "10",
        type: "multiAnswer",
        question: "次のうち、モバイルOSはどれですか？（複数選択可）",
        choices: [
            { id: "a", text: "iOS", isCorrect: true },
            { id: "b", text: "Android", isCorrect: true },
            { id: "c", text: "Windows", isCorrect: false },
            { id: "d", text: "MacOS", isCorrect: false },
        ],
        onAnswer: () => {},
    },

    // 11. 組み合わせ選択問題
    {
        id: "11",
        type: "combination",
        question:
            "プログラミング言語と、その主な用途を正しく組み合わせてください",
        leftItems: [
            { id: "a1", text: "JavaScript" },
            { id: "a2", text: "Python" },
            { id: "a3", text: "C++" },
            { id: "a4", text: "SQL" },
        ],
        rightItems: [
            { id: "b1", text: "Webフロントエンド開発" },
            { id: "b2", text: "データ分析・AI" },
            { id: "b3", text: "システム・ゲーム開発" },
            { id: "b4", text: "データベース操作" },
        ],
        correctCombinations: [
            { leftId: "a1", rightId: "b1" },
            { leftId: "a2", rightId: "b2" },
            { leftId: "a3", rightId: "b3" },
            { leftId: "a4", rightId: "b4" },
        ],
        imageUrl: "https://picsum.photos/id/0/500/300",
        imageAlt: "プログラミング言語の組み合わせ問題",
        onAnswer: () => {},
    },
];
