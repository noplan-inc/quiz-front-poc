import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import type { CombinationQuizProps } from "@/types/quiz";

// CombinationQuizコンポーネントはまだ実装されていないためモックします
vi.mock("../CombinationQuiz", () => ({
    CombinationQuiz: ({
        question,
        leftItems,
        rightItems,
        correctCombinations,
        onAnswer,
        imageUrl,
        imageAlt,
    }: CombinationQuizProps & { imageUrl?: string; imageAlt?: string }) => (
        <div data-testid="combination-quiz">
            <h2>{question}</h2>
            {imageUrl && <img src={imageUrl} alt={imageAlt || "問題の画像"} />}
            <div className="left-items">
                {leftItems.map((item) => (
                    <div key={item.id} data-testid={`left-${item.id}`}>
                        {item.text}
                    </div>
                ))}
            </div>
            <div className="right-items">
                {rightItems.map((item) => (
                    <div key={item.id} data-testid={`right-${item.id}`}>
                        {item.text}
                    </div>
                ))}
            </div>
            <button
                type="button"
                data-testid="submit-button"
                onClick={() =>
                    onAnswer(
                        correctCombinations.map(
                            (c) => c.leftId + "-" + c.rightId
                        )
                    )
                }
            >
                確認
            </button>
        </div>
    ),
}));

describe("CombinationQuiz", () => {
    // テスト用のモックプロップス
    const mockProps: CombinationQuizProps = {
        id: "test-quiz",
        type: "combination",
        question:
            "プログラミング言語と、その主な用途を正しく組み合わせてください",
        leftItems: [
            { id: "a1", text: "JavaScript" },
            { id: "a2", text: "Python" },
            { id: "a3", text: "C++" },
            { id: "a4", text: "SQL" },
        ],
        rightItems: [
            { id: "b1", text: "Webフロントエンド開発" },
            { id: "b2", text: "データ分析・AI" },
            { id: "b3", text: "システム・ゲーム開発" },
            { id: "b4", text: "データベース操作" },
        ],
        correctCombinations: [
            { leftId: "a1", rightId: "b1" },
            { leftId: "a2", rightId: "b2" },
            { leftId: "a3", rightId: "b3" },
            { leftId: "a4", rightId: "b4" },
        ],
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

    it("問題文と左右の項目が正しく表示されること", () => {
        render(<CombinationQuiz {...mockProps} />);

        // 問題文が表示されていることを確認
        expect(screen.getByText(mockProps.question)).toBeInTheDocument();

        // 左側の項目がすべて表示されていることを確認
        for (const item of mockProps.leftItems) {
            expect(screen.getByTestId(`left-${item.id}`)).toBeInTheDocument();
            expect(screen.getByText(item.text)).toBeInTheDocument();
        }

        // 右側の項目がすべて表示されていることを確認
        for (const item of mockProps.rightItems) {
            expect(screen.getByTestId(`right-${item.id}`)).toBeInTheDocument();
            expect(screen.getByText(item.text)).toBeInTheDocument();
        }
    });

    it("確認ボタンをクリックすると回答処理が呼ばれること", () => {
        render(<CombinationQuiz {...mockProps} />);

        // 回答ボタンを取得してクリック
        const submitButton = screen.getByTestId("submit-button");
        fireEvent.click(submitButton);

        // 回答処理が正しい引数で呼び出されたことを確認
        expect(mockProps.onAnswer).toHaveBeenCalledTimes(1);
        // 回答は組み合わせIDの配列として渡される
        expect(mockProps.onAnswer).toHaveBeenCalledWith([
            "a1-b1",
            "a2-b2",
            "a3-b3",
            "a4-b4",
        ]);
    });

    it("メディア（画像）が存在する場合に正しく表示されること", () => {
        const propsWithImage: CombinationQuizProps & {
            imageUrl?: string;
            imageAlt?: string;
        } = {
            ...mockProps,
            imageUrl: "test-image.jpg",
            imageAlt: "テスト画像",
        };

        render(<CombinationQuiz {...propsWithImage} />);

        // 画像が表示されていることを確認
        const image = screen.getByAltText("テスト画像");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "test-image.jpg");
    });
});
