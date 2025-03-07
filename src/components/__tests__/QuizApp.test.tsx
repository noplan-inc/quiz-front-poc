import type { QuizProps } from "@/types/quiz";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import QuizApp from "../QuizApp";

// 依存するコンポーネントをモック
vi.mock("../SingleQuizView", () => ({
    default: ({
        onComplete,
        quizzes,
    }: {
        onComplete: () => void;
        quizzes: QuizProps[];
    }) => (
        <div
            data-testid="mock-single-quiz-view"
            data-quiz-count={quizzes.length}
        >
            <span>現在のクイズID: {quizzes[0]?.id || "なし"}</span>
            <button
                onClick={onComplete}
                data-testid="trigger-complete"
                type="button"
            >
                Complete Quiz
            </button>
        </div>
    ),
}));

vi.mock("../QuizComplete", () => ({
    default: ({ onRestart }: { onRestart: () => void }) => (
        <div data-testid="mock-quiz-complete">
            <button
                onClick={onRestart}
                data-testid="trigger-restart"
                type="button"
            >
                Restart
            </button>
        </div>
    ),
}));

// デバッグマネージャーをモック
vi.mock("../debug/DebugManager", () => ({
    default: ({ onSelectQuiz }: { onSelectQuiz: (quizId: string) => void }) => (
        <div data-testid="mock-debug-manager">
            <button
                onClick={() => onSelectQuiz("2")}
                data-testid="select-quiz-2"
                type="button"
            >
                クイズ2を選択
            </button>
        </div>
    ),
}));

// サンプルデータをモック
vi.mock("@/data/sampleQuizData", () => ({
    sampleQuizzes: [
        {
            id: "1",
            type: "text",
            question: "モックテスト問題1",
            choices: [
                { id: "a", text: "選択肢A", isCorrect: true },
                { id: "b", text: "選択肢B", isCorrect: false },
            ],
        },
        {
            id: "2",
            type: "image",
            question: "モックテスト問題2",
            imageUrl: "test.jpg",
            choices: [
                { id: "a", text: "選択肢A", isCorrect: true },
                { id: "b", text: "選択肢B", isCorrect: false },
            ],
        },
        {
            id: "3",
            type: "numberInput",
            question: "モックテスト問題3",
            correctAnswer: 42,
            maxDigits: 2,
        },
    ],
}));

describe("QuizAppコンポーネント", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("初期状態ではSingleQuizViewが表示される", () => {
        render(<QuizApp />);

        expect(screen.getByTestId("mock-single-quiz-view")).toBeInTheDocument();
        expect(
            screen.queryByTestId("mock-quiz-complete")
        ).not.toBeInTheDocument();
    });

    it("クイズ完了後はQuizCompleteが表示される", () => {
        render(<QuizApp />);

        // クイズ完了をトリガー
        act(() => {
            fireEvent.click(screen.getByTestId("trigger-complete"));
        });

        // 完了画面が表示されていることを確認
        expect(screen.getByTestId("mock-quiz-complete")).toBeInTheDocument();
        expect(
            screen.queryByTestId("mock-single-quiz-view")
        ).not.toBeInTheDocument();
    });

    it("再スタート時にSingleQuizViewが再表示される", () => {
        render(<QuizApp />);

        // クイズ完了をトリガー
        act(() => {
            fireEvent.click(screen.getByTestId("trigger-complete"));
        });

        // 再スタートをトリガー
        act(() => {
            fireEvent.click(screen.getByTestId("trigger-restart"));
        });

        // クイズ画面が再表示されていることを確認
        expect(screen.getByTestId("mock-single-quiz-view")).toBeInTheDocument();
        expect(
            screen.queryByTestId("mock-quiz-complete")
        ).not.toBeInTheDocument();
    });

    // デバッグ機能のテスト
    it("デバッグマネージャーが表示されていること", () => {
        render(<QuizApp />);

        expect(screen.getByTestId("mock-debug-manager")).toBeInTheDocument();
    });

    it("デバッグ機能を使って特定のクイズにジャンプできること", () => {
        render(<QuizApp />);

        // 初期状態ではクイズ1が表示されていることを確認
        expect(screen.getByText("現在のクイズID: 1")).toBeInTheDocument();

        // デバッグマネージャーからクイズ2を選択
        act(() => {
            fireEvent.click(screen.getByTestId("select-quiz-2"));
        });

        // クイズ2が表示されていることを確認
        expect(screen.getByText("現在のクイズID: 2")).toBeInTheDocument();
    });

    it("クイズ完了後にデバッグ機能を使うとクイズ表示に戻ること", () => {
        render(<QuizApp />);

        // クイズ完了をトリガー
        act(() => {
            fireEvent.click(screen.getByTestId("trigger-complete"));
        });

        // 完了画面が表示されていることを確認
        expect(screen.getByTestId("mock-quiz-complete")).toBeInTheDocument();

        // デバッグマネージャーからクイズ2を選択
        act(() => {
            fireEvent.click(screen.getByTestId("select-quiz-2"));
        });

        // クイズ2が表示されていることを確認
        expect(screen.getByText("現在のクイズID: 2")).toBeInTheDocument();
        expect(
            screen.queryByTestId("mock-quiz-complete")
        ).not.toBeInTheDocument();
    });
});
