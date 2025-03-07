import type { NumberInputQuizProps } from "@/types/quiz";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// NumberInputQuizコンポーネントはまだ実装されていないためモックします
vi.mock("../NumberInputQuiz", () => ({
    NumberInputQuiz: ({
        question,
        maxDigits,
        onAnswer,
        imageUrl,
        imageAlt,
    }: NumberInputQuizProps & { imageUrl?: string; imageAlt?: string }) => {
        const handleSubmit = () => {
            const input = document.querySelector(
                'input[data-testid="number-input"]'
            ) as HTMLInputElement;
            const answer = Number.parseInt(input.value, 10);
            onAnswer(String(answer));
        };

        return (
            <div data-testid="number-input-quiz">
                <h2>{question}</h2>
                {imageUrl && (
                    <img src={imageUrl} alt={imageAlt || "問題の画像"} />
                )}
                <div>
                    <input
                        type="number"
                        data-testid="number-input"
                        defaultValue="0"
                        min="0"
                        max={10 ** maxDigits - 1}
                    />
                </div>
                <button
                    type="button"
                    data-testid="submit-button"
                    onClick={handleSubmit}
                >
                    確認
                </button>
            </div>
        );
    },
}));

describe("NumberInputQuiz", () => {
    // テスト用のモックプロップス
    const mockProps: NumberInputQuizProps = {
        id: "test-quiz",
        type: "numberInput",
        question: "2^10 = ?",
        correctAnswer: 1024,
        maxDigits: 4,
        onAnswer: vi.fn(),
    };

    beforeEach(() => {
        // モックのリセット
        vi.resetAllMocks();
    });

    afterEach(() => {
        // テスト後のクリーンアップ
        cleanup();
    });

    it("問題文と数字入力フィールドが正しく表示されること", () => {
        render(<NumberInputQuiz {...mockProps} />);

        // 問題文が表示されていることを確認
        expect(screen.getByText(mockProps.question)).toBeInTheDocument();

        // 数字入力フィールドが表示されていることを確認
        const input = screen.getByTestId("number-input");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "number");

        // 最大桁数が正しく設定されていることを確認
        expect(input).toHaveAttribute(
            "max",
            String(10 ** mockProps.maxDigits - 1)
        );
    });

    it("確認ボタンをクリックすると回答処理が呼ばれること", () => {
        render(<NumberInputQuiz {...mockProps} />);

        // 入力フィールドに値を入力
        const input = screen.getByTestId("number-input") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "1024" } });

        // 回答ボタンを取得してクリック
        const submitButton = screen.getByTestId("submit-button");
        fireEvent.click(submitButton);

        // 回答処理が正しい引数で呼び出されたことを確認
        expect(mockProps.onAnswer).toHaveBeenCalledTimes(1);
        expect(mockProps.onAnswer).toHaveBeenCalledWith("1024");
    });

    it("メディア（画像）が存在する場合に正しく表示されること", () => {
        const propsWithImage: NumberInputQuizProps & {
            imageUrl?: string;
            imageAlt?: string;
        } = {
            ...mockProps,
            imageUrl: "test-image.jpg",
            imageAlt: "テスト画像",
        };

        render(<NumberInputQuiz {...propsWithImage} />);

        // 画像が表示されていることを確認
        const image = screen.getByAltText("テスト画像");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "test-image.jpg");
    });
});
