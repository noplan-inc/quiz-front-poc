import type { CharacterOrderQuizProps } from "@/types/quiz";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CharacterOrderQuiz } from "../CharacterOrderQuiz";

// モック用の関数を定義
vi.mock("react", async () => {
    const actual = await vi.importActual("react");
    return {
        ...actual,
        // 必要に応じてReactの関数をモック
    };
});

describe("CharacterOrderQuiz", () => {
    // テスト用のモックプロップス
    const mockProps: CharacterOrderQuizProps = {
        id: "test-quiz",
        type: "characterOrder",
        question:
            "次の文字を並べ替えて、正しいプログラミング言語の名前を作ってください",
        characters: ["P", "T", "Y", "H", "O", "N"],
        correctAnswer: "PYTHON",
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

    it("問題文と文字が正しく表示されること", () => {
        render(<CharacterOrderQuiz {...mockProps} />);

        // 問題文が表示されていることを確認
        expect(screen.getByText(mockProps.question)).toBeInTheDocument();

        // すべての文字が表示されていることを確認
        for (const char of mockProps.characters) {
            expect(screen.getByTestId(`char-${char}`)).toBeInTheDocument();
        }
    });

    it("確認ボタンをクリックすると回答処理が呼ばれること", () => {
        render(<CharacterOrderQuiz {...mockProps} />);

        // 各文字をクリックして選択
        for (const char of mockProps.characters) {
            const charButton = screen.getByTestId(`char-${char}`);
            fireEvent.click(charButton);
        }

        // 回答ボタンを取得してクリック
        const submitButton = screen.getByTestId("submit-button");
        fireEvent.click(submitButton);

        // 回答処理が呼ばれたことを確認
        expect(mockProps.onAnswer).toHaveBeenCalledTimes(1);
    });

    it("メディア（画像）が存在する場合に正しく表示されること", () => {
        const propsWithImage: CharacterOrderQuizProps & {
            imageUrl?: string;
            imageAlt?: string;
        } = {
            ...mockProps,
            imageUrl: "test-image.jpg",
            imageAlt: "テスト画像",
        };

        render(<CharacterOrderQuiz {...propsWithImage} />);

        // 画像が表示されていることを確認
        const image = screen.getByAltText("テスト画像");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "test-image.jpg");
    });
});
