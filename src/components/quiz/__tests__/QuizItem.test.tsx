import type { TextQuizProps } from "@/types/quiz";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import QuizItem from "../QuizItem";

describe("QuizItemコンポーネント", () => {
    // テキスト問題のテストデータ
    const textQuizProps: TextQuizProps = {
        id: "test-1",
        type: "text",
        question: "テスト問題文です",
        choices: [
            { id: "a", text: "選択肢A", isCorrect: true },
            { id: "b", text: "選択肢B", isCorrect: false },
        ],
        onAnswer: vi.fn(),
    };

    it("テキスト問題が正しく表示される", () => {
        render(<QuizItem {...textQuizProps} />);

        // 問題文が表示されていることを確認
        expect(screen.getByTestId("question-text")).toHaveTextContent(
            "テスト問題文です"
        );

        // 選択肢が表示されていることを確認
        expect(screen.getByTestId("choice-a")).toHaveTextContent("選択肢A");
        expect(screen.getByTestId("choice-b")).toHaveTextContent("選択肢B");
    });

    it("選択肢をクリックするとonAnswerが呼ばれる", () => {
        render(<QuizItem {...textQuizProps} />);

        // 選択肢をクリック
        fireEvent.click(screen.getByTestId("choice-a"));

        // onAnswerが呼ばれたことを確認
        expect(textQuizProps.onAnswer).toHaveBeenCalledWith("a");
    });

    it("回答後は選択肢が無効化される", () => {
        render(<QuizItem {...textQuizProps} />);

        // 最初は選択肢が有効
        expect(screen.getByTestId("choice-a")).not.toBeDisabled();

        // 選択肢をクリック
        fireEvent.click(screen.getByTestId("choice-a"));

        // 回答後は選択肢が無効化される
        expect(screen.getByTestId("choice-a")).toBeDisabled();
        expect(screen.getByTestId("choice-b")).toBeDisabled();
    });

    it("正解の選択肢を選ぶと正解表示がされる", () => {
        render(<QuizItem {...textQuizProps} />);

        // 正解の選択肢をクリック
        fireEvent.click(screen.getByTestId("choice-a"));

        // 正解のマークが表示される
        expect(screen.getByTestId("choice-a")).toHaveTextContent("✓");
    });
});
