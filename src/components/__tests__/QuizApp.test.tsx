import { sampleQuizzes } from "@/data/sampleQuizData";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import QuizApp from "../QuizApp";

// 依存するコンポーネントをモックする
vi.mock("../SingleQuizView", () => ({
    default: ({ onComplete }: { onComplete: () => void }) => (
        <div data-testid="mock-single-quiz-view">
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

// サンプルデータをモック
vi.mock("@/data/sampleQuizData", () => ({
    sampleQuizzes: [
        {
            id: "mock1",
            type: "text",
            question: "モックテスト問題",
            choices: [
                { id: "a", text: "選択肢A", isCorrect: true },
                { id: "b", text: "選択肢B", isCorrect: false },
            ],
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
});
