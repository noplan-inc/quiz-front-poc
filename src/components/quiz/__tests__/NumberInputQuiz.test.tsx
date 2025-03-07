import type { NumberInputQuizProps } from "@/types/quiz";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NumberInputQuiz } from "../NumberInputQuiz";

// モック用の関数を定義
vi.mock("react", async () => {
    const actual = await vi.importActual("react");
    return {
        ...actual,
        // 必要に応じてReactの関数をモック
    };
});

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

    it("問題文と数字表示エリアが正しく表示されること", () => {
        render(<NumberInputQuiz {...mockProps} />);

        // 問題文が表示されていることを確認
        expect(screen.getByText(mockProps.question)).toBeInTheDocument();

        // 数字表示エリアが表示されていることを確認
        const display = screen.getByTestId("number-input-display");
        expect(display).toBeInTheDocument();

        // 削除ボタンが表示されていることを確認
        const deleteButton = screen.getByText("削除");
        expect(deleteButton).toBeInTheDocument();

        // 数字キーパッドが表示されていることを確認
        const numberButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) =>
            String(num)
        );
        for (const num of numberButtons) {
            expect(screen.getByText(num)).toBeInTheDocument();
        }
    });

    it("確認ボタンをクリックすると回答処理が呼ばれること", () => {
        render(<NumberInputQuiz {...mockProps} />);

        // 数字ボタンをクリックして入力
        fireEvent.click(screen.getByText("1"));
        fireEvent.click(screen.getByText("0"));
        fireEvent.click(screen.getByText("2"));
        fireEvent.click(screen.getByText("4"));

        // 数字表示エリアに入力値が表示されることを確認
        const display = screen.getByTestId("number-input-display");
        expect(display).toHaveTextContent("1024");

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
