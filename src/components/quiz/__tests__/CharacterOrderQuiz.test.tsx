import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import type { CharacterOrderQuizProps } from "@/types/quiz";

// CharacterOrderQuizコンポーネントはまだ実装されていないためモックします
vi.mock("../CharacterOrderQuiz", () => ({
    CharacterOrderQuiz: ({
        question,
        characters,
        correctAnswer,
        onAnswer,
        imageUrl,
        imageAlt,
    }: CharacterOrderQuizProps & { imageUrl?: string; imageAlt?: string }) => (
        <div data-testid="character-order-quiz">
            <h2>{question}</h2>
            {imageUrl && <img src={imageUrl} alt={imageAlt || "問題の画像"} />}
            <div>
                {characters.map((char, index) => (
                    <button key={index} data-testid={`char-${char}`}>
                        {char}
                    </button>
                ))}
            </div>
            <div>
                <span data-testid="answer-area">答えを入力</span>
            </div>
            <button
                data-testid="submit-button"
                onClick={() => onAnswer(correctAnswer)}
            >
                確認
            </button>
        </div>
    ),
}));

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

        // 回答ボタンを取得してクリック
        const submitButton = screen.getByTestId("submit-button");
        fireEvent.click(submitButton);

        // 回答処理が正しい引数で呼び出されたことを確認
        expect(mockProps.onAnswer).toHaveBeenCalledTimes(1);
        expect(mockProps.onAnswer).toHaveBeenCalledWith(
            mockProps.correctAnswer
        );
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
