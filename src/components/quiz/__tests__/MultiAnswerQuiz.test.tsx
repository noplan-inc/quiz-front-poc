import type { MultiAnswerQuizProps } from "@/types/quiz";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MultiAnswerQuiz } from "../MultiAnswerQuiz";

describe("MultiAnswerQuiz コンポーネント", () => {
    const mockOnAnswer = vi.fn();

    const testProps: MultiAnswerQuizProps = {
        id: "test-quiz",
        type: "multiAnswer",
        question: "正しいものをすべて選んでください",
        choices: [
            { id: "a", text: "選択肢A", isCorrect: true },
            { id: "b", text: "選択肢B", isCorrect: false },
            { id: "c", text: "選択肢C", isCorrect: true },
            { id: "d", text: "選択肢D", isCorrect: false },
        ],
        onAnswer: mockOnAnswer,
    };

    beforeEach(() => {
        mockOnAnswer.mockClear();
    });

    it("問題文と選択肢が正しく表示される", () => {
        render(<MultiAnswerQuiz {...testProps} />);

        // 問題文が表示されていることを確認
        expect(
            screen.getByText("正しいものをすべて選んでください")
        ).toBeInTheDocument();

        // 選択肢が表示されていることを確認
        expect(screen.getByText("選択肢A")).toBeInTheDocument();
        expect(screen.getByText("選択肢B")).toBeInTheDocument();
        expect(screen.getByText("選択肢C")).toBeInTheDocument();
        expect(screen.getByText("選択肢D")).toBeInTheDocument();
    });

    it("選択肢をクリックすると選択状態が切り替わる", () => {
        render(<MultiAnswerQuiz {...testProps} />);

        // 選択肢をクリック
        fireEvent.click(screen.getByText("選択肢A"));

        // 選択された状態になっていることを確認
        const selectedChoices = screen.getAllByTestId("choice-selected");
        expect(selectedChoices).toHaveLength(1);

        // もう一度クリックすると選択が解除される
        fireEvent.click(screen.getByText("選択肢A"));
        expect(screen.queryByTestId("choice-selected")).toBeNull();
    });

    it("「確認」ボタンをクリックするとonAnswerが呼ばれる", () => {
        render(<MultiAnswerQuiz {...testProps} />);

        // 複数の選択肢を選択
        fireEvent.click(screen.getByText("選択肢A"));
        fireEvent.click(screen.getByText("選択肢C"));

        // 確認ボタンをクリック
        fireEvent.click(screen.getByTestId("submit-button"));

        // onAnswerが選択したIDの配列で呼ばれたことを確認
        expect(mockOnAnswer).toHaveBeenCalledTimes(1);
        expect(mockOnAnswer).toHaveBeenCalledWith(["a", "c"]);
    });

    it("何も選択せずに「確認」ボタンは表示されない", () => {
        render(<MultiAnswerQuiz {...testProps} />);

        // 確認ボタンが表示されていないことを確認
        expect(screen.queryByTestId("submit-button")).toBeNull();

        // onAnswerが呼ばれないことを確認
        expect(mockOnAnswer).not.toHaveBeenCalled();
    });
});
