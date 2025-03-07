import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import QuizComplete from "../QuizComplete";

// framer-motionのモック
vi.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
            <div {...props}>{children}</div>
        ),
    },
}));

describe("QuizComplete コンポーネント", () => {
    it("完了メッセージが表示される", () => {
        render(<QuizComplete />);
        expect(screen.getByText("クイズ完了！")).toBeInTheDocument();
    });

    it("再スタートボタンが表示される", () => {
        const mockRestart = vi.fn();
        render(<QuizComplete onRestart={mockRestart} />);
        expect(screen.getByText("もう一度挑戦する")).toBeInTheDocument();
    });

    it("再スタートボタンをクリックするとonRestartが呼ばれる", () => {
        const mockRestart = vi.fn();
        render(<QuizComplete onRestart={mockRestart} />);

        const button = screen.getByText("もう一度挑戦する");
        fireEvent.click(button);

        expect(mockRestart).toHaveBeenCalledTimes(1);
    });

    it("onRestartが提供されていない場合、再スタートボタンは表示されない", () => {
        render(<QuizComplete />);
        expect(screen.queryByText("もう一度挑戦する")).toBeNull();
    });
});
