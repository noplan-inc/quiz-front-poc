import { describe, it, expect } from "vitest";
import type {
    Choice,
    ImageChoice,
    MultiAnswerQuizProps,
    OrderSelectionQuizProps,
    CharacterOrderQuizProps,
    CombinationQuizProps,
    NumberInputQuizProps,
    QuizProps,
} from "../quiz";

describe("クイズの型定義", () => {
    describe("選択肢が画像の問題", () => {
        it("選択肢が画像の型が正しく定義されていること", () => {
            const imageChoice: ImageChoice = {
                id: "a",
                imageUrl: "https://example.com/image.jpg",
                imageAlt: "代替テキスト",
                isCorrect: true,
            };

            expect(imageChoice.id).toBe("a");
            expect(imageChoice.imageUrl).toBeDefined();
            expect(imageChoice.isCorrect).toBe(true);
        });
    });

    describe("一問多答クイズ", () => {
        it("一問多答クイズの型が正しく定義されていること", () => {
            const multiAnswerQuiz: MultiAnswerQuizProps = {
                id: "1",
                type: "multiAnswer",
                question: "テスト問題",
                choices: [
                    { id: "a", text: "選択肢A", isCorrect: true },
                    { id: "b", text: "選択肢B", isCorrect: true },
                    { id: "c", text: "選択肢C", isCorrect: false },
                ],
                onAnswer: () => {},
            };

            expect(multiAnswerQuiz.type).toBe("multiAnswer");
            expect(
                multiAnswerQuiz.choices.filter((choice) => choice.isCorrect)
                    .length
            ).toBe(2);
        });
    });

    describe("順序選択クイズ", () => {
        it("順序選択クイズの型が正しく定義されていること", () => {
            const orderQuiz: OrderSelectionQuizProps = {
                id: "1",
                type: "orderSelection",
                question: "テスト問題",
                choices: [
                    { id: "a", text: "1番目", order: 1 },
                    { id: "b", text: "2番目", order: 2 },
                    { id: "c", text: "3番目", order: 3 },
                ],
                onAnswer: () => {},
            };

            expect(orderQuiz.type).toBe("orderSelection");
            expect(orderQuiz.choices[0].order).toBeDefined();
        });
    });

    describe("文字の順序選択クイズ", () => {
        it("文字の順序選択クイズの型が正しく定義されていること", () => {
            const characterOrderQuiz: CharacterOrderQuizProps = {
                id: "1",
                type: "characterOrder",
                question: "テスト問題",
                correctAnswer: "ABCDEF",
                characters: ["A", "B", "C", "D", "E", "F"],
                onAnswer: () => {},
            };

            expect(characterOrderQuiz.type).toBe("characterOrder");
            expect(characterOrderQuiz.correctAnswer).toBeDefined();
            expect(characterOrderQuiz.characters.length).toBe(6);
        });
    });

    describe("組み合わせ選択クイズ", () => {
        it("組み合わせ選択クイズの型が正しく定義されていること", () => {
            const combinationQuiz: CombinationQuizProps = {
                id: "1",
                type: "combination",
                question: "テスト問題",
                leftItems: [
                    { id: "l1", text: "左項目1" },
                    { id: "l2", text: "左項目2" },
                ],
                rightItems: [
                    { id: "r1", text: "右項目1" },
                    { id: "r2", text: "右項目2" },
                ],
                correctCombinations: [
                    { leftId: "l1", rightId: "r2" },
                    { leftId: "l2", rightId: "r1" },
                ],
                onAnswer: () => {},
            };

            expect(combinationQuiz.type).toBe("combination");
            expect(combinationQuiz.leftItems.length).toBe(2);
            expect(combinationQuiz.rightItems.length).toBe(2);
            expect(combinationQuiz.correctCombinations.length).toBe(2);
        });
    });

    describe("数字入力クイズ", () => {
        it("数字入力クイズの型が正しく定義されていること", () => {
            const numberInputQuiz: NumberInputQuizProps = {
                id: "1",
                type: "numberInput",
                question: "テスト問題",
                correctAnswer: 42,
                maxDigits: 2,
                onAnswer: () => {},
            };

            expect(numberInputQuiz.type).toBe("numberInput");
            expect(numberInputQuiz.correctAnswer).toBe(42);
            expect(numberInputQuiz.maxDigits).toBe(2);
        });
    });

    describe("QuizProps統合型", () => {
        it("QuizPropsに新しいクイズタイプが含まれていること", () => {
            const quizzes: QuizProps[] = [
                {
                    id: "1",
                    type: "text",
                    question: "テキスト問題",
                    choices: [{ id: "a", text: "選択肢", isCorrect: true }],
                    onAnswer: () => {},
                },
                {
                    id: "2",
                    type: "multiAnswer",
                    question: "複数回答問題",
                    choices: [
                        { id: "a", text: "選択肢A", isCorrect: true },
                        { id: "b", text: "選択肢B", isCorrect: true },
                    ],
                    onAnswer: () => {},
                },
                {
                    id: "3",
                    type: "numberInput",
                    question: "数値入力問題",
                    correctAnswer: 42,
                    maxDigits: 2,
                    onAnswer: () => {},
                },
            ];

            expect(quizzes.length).toBe(3);
            // ここではTypeScriptの型チェックが通ることを確認しています
            // 実際の値の検証はしませんが、コンパイルエラーがなければテストは成功します
        });
    });
});
