import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import QuizFooter from "../QuizFooter";

describe("QuizFooterコンポーネント", () => {
    it("タイマーが正しく表示される", () => {
        render(
            <QuizFooter elapsedTime={65} answered={false} onNext={() => {}} />
        );

        // タイマーの表示が "01:05" であることを確認
        expect(screen.getByText("01:05")).toBeInTheDocument();
    });

    it("未回答時には「次へ」ボタンが表示されない", () => {
        render(
            <QuizFooter elapsedTime={30} answered={false} onNext={() => {}} />
        );

        // 「つぎへ」ボタンが存在しないことを確認
        expect(screen.queryByText("つぎへ")).not.toBeInTheDocument();
    });

    it("回答後には「次へ」ボタンが表示される", () => {
        render(
            <QuizFooter elapsedTime={45} answered={true} onNext={() => {}} />
        );

        // 「つぎへ」ボタンが表示されていることを確認
        expect(screen.getByText("つぎへ")).toBeInTheDocument();
    });

    it("「次へ」ボタンをクリックすると、onNext関数が呼ばれる", () => {
        const mockOnNext = vi.fn();
        render(
            <QuizFooter elapsedTime={70} answered={true} onNext={mockOnNext} />
        );

        // 「つぎへ」ボタンをクリック
        fireEvent.click(screen.getByText("つぎへ"));

        // onNext関数が呼ばれたことを確認
        expect(mockOnNext).toHaveBeenCalledTimes(1);
    });
});
