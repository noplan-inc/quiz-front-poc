import type { CombinationQuizProps } from "@/types/quiz";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CombinationQuiz } from "../CombinationQuiz";

// モック用の関数を定義
vi.mock("react", async () => {
    const actual = await vi.importActual("react");
    return {
        ...actual,
        // 必要に応じてReactの関数をモック
    };
});

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

        // 左側のアイテムを選択して右側と組み合わせる
        mockProps.leftItems.forEach((leftItem, index) => {
            const rightItem = mockProps.rightItems[index];

            // 左側を選択
            fireEvent.click(screen.getByTestId(`left-${leftItem.id}`));

            // 右側を選択して組み合わせる
            fireEvent.click(screen.getByTestId(`right-${rightItem.id}`));
        });

        // 回答ボタンを取得してクリック
        const submitButton = screen.getByTestId("submit-button");
        fireEvent.click(submitButton);

        // 回答処理が呼び出されたことを確認
        expect(mockProps.onAnswer).toHaveBeenCalledTimes(1);
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
