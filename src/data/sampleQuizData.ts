import type { QuizProps } from "@/types/quiz";

export const sampleQuizzes: QuizProps[] = [
  {
    id: "1",
    type: "text",
    question: "JavaScriptの拡張言語はどれですか？",
    choices: [
      { id: "a", text: "TypeScript", isCorrect: true },
      { id: "b", text: "CoffeeScript", isCorrect: false },
    ],
    onAnswer: () => {},
  },
  {
    id: "2",
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
  {
    id: "3",
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
  {
    id: "4",
    type: "audio",
    question: "この音声で聞こえる楽器は何ですか？",
    audioUrl: "https://www.w3schools.com/html/horse.mp3",
    choices: [
      { id: "a", text: "ピアノ", isCorrect: false },
      { id: "b", text: "ドラム", isCorrect: true },
    ],
    onAnswer: () => {},
  },
];
