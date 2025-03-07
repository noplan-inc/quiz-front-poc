import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import React from "react";
import SingleQuizView from "../SingleQuizView";
import type { QuizProps } from "@/types/quiz";

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

// framer-motionのモック
vi.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
            <div {...props}>{children}</div>
        ),
    },
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

// setTimeoutのモック
beforeEach(() => {
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

        // 進行状況が表示されていることを確認
        expect(screen.getByText("問題 1/2")).toBeInTheDocument();
        expect(screen.getByTestId("mock-quiz-item")).toBeInTheDocument();
    });

    it("回答後に次の問題に自動的に遷移する", () => {
        const mockOnComplete = vi.fn();
        render(
            <SingleQuizView quizzes={mockQuizzes} onComplete={mockOnComplete} />
        );

        // 回答ボタンをクリック
        fireEvent.click(screen.getByTestId("answer-button"));

        // 最初のタイマーをスキップ (回答から次の問題への遷移)
        act(() => {
            vi.advanceTimersByTime(1000);
        });

        // 次のタイマーをスキップ (アニメーション時間)
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // 2問目に進んだことを確認
        expect(screen.getByText("問題 2/2")).toBeInTheDocument();
    });

    it("全ての問題に回答後、onCompleteが呼ばれる", () => {
        const mockOnComplete = vi.fn();
        render(
            <SingleQuizView quizzes={mockQuizzes} onComplete={mockOnComplete} />
        );

        // 1問目の回答
        fireEvent.click(screen.getByTestId("answer-button"));

        // タイマーをスキップ
        act(() => {
            vi.advanceTimersByTime(1000);
        });
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // 2問目の回答
        fireEvent.click(screen.getByTestId("answer-button"));

        // タイマーをスキップ
        act(() => {
            vi.advanceTimersByTime(1000);
        });

        // onCompleteが呼ばれたことを確認
        expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
});
