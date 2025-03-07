import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import QuizComplete from "../QuizComplete";

// framer-motionのアニメーションをモック
vi.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
}));

describe("QuizCompleteコンポーネント", () => {
    it("完了メッセージが表示される", () => {
        render(<QuizComplete />);

        expect(screen.getByText("クイズ完了！")).toBeInTheDocument();
        expect(
            screen.getByText("お疲れ様でした！すべての問題に回答しました。")
        ).toBeInTheDocument();
    });

    it("onRestartが指定されている場合、再挑戦ボタンが表示される", () => {
        const mockOnRestart = vi.fn();
        render(<QuizComplete onRestart={mockOnRestart} />);

        const restartButton = screen.getByText("もう一度挑戦する");
        expect(restartButton).toBeInTheDocument();
    });

    it("再挑戦ボタンをクリックするとonRestartが呼ばれる", () => {
        const mockOnRestart = vi.fn();
        render(<QuizComplete onRestart={mockOnRestart} />);

        fireEvent.click(screen.getByText("もう一度挑戦する"));
        expect(mockOnRestart).toHaveBeenCalledTimes(1);
    });

    it("onRestartが指定されていない場合、再挑戦ボタンは表示されない", () => {
        render(<QuizComplete />);

        const restartButton = screen.queryByText("もう一度挑戦する");
        expect(restartButton).not.toBeInTheDocument();
    });
});
