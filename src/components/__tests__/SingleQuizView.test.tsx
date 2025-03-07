import type { QuizProps } from "@/types/quiz";
import { act, fireEvent, render, screen } from "@testing-library/react";
import type React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SingleQuizView from "../SingleQuizView";

// framer-motionのモック
vi.mock("framer-motion", () => ({
    motion: {
        div: ({
            children,
            ...props
        }: React.PropsWithChildren<Record<string, unknown>>) => (
            <div {...props}>{children}</div>
        ),
    },
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

// フルモックに切り替え
vi.mock("../quiz", () => ({
    QuizItem: ({ onAnswer }: { onAnswer: (id: string) => void }) => (
        <div data-testid="mock-quiz-item">
            <button
                data-testid="answer-button"
                onClick={() => onAnswer("a")}
                type="button"
            >
                回答する
            </button>
        </div>
    ),
}));

// フッターコンポーネントのモック
vi.mock("../QuizFooter", () => ({
    default: ({
        answered,
        onNext,
    }: {
        answered: boolean;
        onNext: () => void;
    }) => (
        <div data-testid="mock-quiz-footer">
            <div data-testid="mock-timer">00:00</div>
            {answered && (
                <button
                    data-testid="next-button"
                    onClick={onNext}
                    type="button"
                >
                    つぎへ
                </button>
            )}
        </div>
    ),
}));

beforeEach(() => {
    // タイマーをモック化
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

describe("SingleQuizViewコンポーネント", () => {
    // テスト用クイズデータ
    const mockQuizzes = [
        {
            id: "1",
            type: "text" as const,
            question: "問題1",
            choices: [
                { id: "a", text: "選択肢A", isCorrect: true },
                { id: "b", text: "選択肢B", isCorrect: false },
            ],
            onAnswer: vi.fn(),
        },
        {
            id: "2",
            type: "text" as const,
            question: "問題2",
            choices: [
                { id: "a", text: "選択肢A", isCorrect: false },
                { id: "b", text: "選択肢B", isCorrect: true },
            ],
            onAnswer: vi.fn(),
        },
    ] as QuizProps[];

    it("最初の問題が表示される", () => {
        const mockOnComplete = vi.fn();
        render(
            <SingleQuizView quizzes={mockQuizzes} onComplete={mockOnComplete} />
        );

        // 進行状況が表示されていることを確認（新デザインでは「第1問」という表示に変更）
        expect(screen.getByText(/第1問/)).toBeInTheDocument();
        expect(screen.getByTestId("mock-quiz-item")).toBeInTheDocument();
        expect(screen.getByTestId("mock-quiz-footer")).toBeInTheDocument();
    });

    it("回答後に次の問題に自動的に遷移する", () => {
        const mockOnComplete = vi.fn();
        render(
            <SingleQuizView quizzes={mockQuizzes} onComplete={mockOnComplete} />
        );

        // 回答ボタンをクリック
        fireEvent.click(screen.getByTestId("answer-button"));

        // 「つぎへ」ボタンが表示されることを確認
        expect(screen.getByTestId("next-button")).toBeInTheDocument();

        // 「つぎへ」ボタンをクリック
        fireEvent.click(screen.getByTestId("next-button"));

        // アニメーション時間をスキップ
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // 2問目に進んだことを確認（新デザインでは「第2問」という表示に変更）
        expect(screen.getByText(/第2問/)).toBeInTheDocument();
    });

    it("全ての問題に回答後、onCompleteが呼ばれる", () => {
        const mockOnComplete = vi.fn();
        render(
            <SingleQuizView quizzes={mockQuizzes} onComplete={mockOnComplete} />
        );

        // 1問目の回答
        fireEvent.click(screen.getByTestId("answer-button"));

        // 「つぎへ」ボタンをクリック
        fireEvent.click(screen.getByTestId("next-button"));

        // アニメーション時間をスキップ
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // 2問目の回答
        fireEvent.click(screen.getByTestId("answer-button"));

        // 「つぎへ」ボタンをクリック
        fireEvent.click(screen.getByTestId("next-button"));

        // アニメーション時間をスキップ
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // onCompleteが呼ばれたことを確認
        expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
});
