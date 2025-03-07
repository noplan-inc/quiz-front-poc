import type { ImageChoiceQuizProps } from "@/types/quiz";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ImageChoiceQuiz } from "../ImageChoiceQuiz";

describe("ImageChoiceQuiz コンポーネント", () => {
    const mockOnAnswer = vi.fn();

    const testProps: ImageChoiceQuizProps = {
        id: "test-quiz",
        type: "imageChoice",
        question: "正しい画像を選んでください",
        choices: [
            {
                id: "a",
                imageUrl: "https://example.com/image1.jpg",
                imageAlt: "選択肢1",
                isCorrect: true,
            },
            {
                id: "b",
                imageUrl: "https://example.com/image2.jpg",
                imageAlt: "選択肢2",
                isCorrect: false,
            },
        ],
        onAnswer: mockOnAnswer,
    };

    beforeEach(() => {
        mockOnAnswer.mockClear();
    });

    it("問題と選択肢が正しく表示される", () => {
        render(<ImageChoiceQuiz {...testProps} />);

        // 問題文が表示されていることを確認
        expect(
            screen.getByText("正しい画像を選んでください")
        ).toBeInTheDocument();

        // 画像選択肢が表示されていることを確認
        const images = screen.getAllByRole("img");
        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute(
            "src",
            "https://example.com/image1.jpg"
        );
        expect(images[0]).toHaveAttribute("alt", "選択肢1");
        expect(images[1]).toHaveAttribute(
            "src",
            "https://example.com/image2.jpg"
        );
        expect(images[1]).toHaveAttribute("alt", "選択肢2");
    });

    it("選択肢をクリックするとonAnswerが呼ばれる", () => {
        render(<ImageChoiceQuiz {...testProps} />);

        // 最初の選択肢をクリック
        const images = screen.getAllByRole("img");
        fireEvent.click(images[0]);

        // onAnswerが正しく呼ばれたことを確認
        expect(mockOnAnswer).toHaveBeenCalledTimes(1);
        expect(mockOnAnswer).toHaveBeenCalledWith("a");
    });

    it("選択後は選択肢がハイライト表示される", () => {
        render(<ImageChoiceQuiz {...testProps} />);

        // 最初の選択肢をクリック
        const images = screen.getAllByRole("img");
        fireEvent.click(images[0]);

        // 選択した選択肢にselectクラスが追加されていることを確認
        const selectedChoices = screen.getAllByTestId("image-choice-selected");
        expect(selectedChoices).toHaveLength(1);
    });
});
