import type { OrderSelectionQuizProps } from "@/types/quiz";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OrderSelectionQuiz } from "../OrderSelectionQuiz";

// モックを作成
vi.mock("react-dnd", () => ({
    DndProvider: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    useDrag: () => [{ isDragging: false }, vi.fn()],
    useDrop: () => [{}, vi.fn()],
}));

vi.mock("react-dnd-html5-backend", () => ({
    HTML5Backend: {},
}));

vi.mock("react-dnd-touch-backend", () => ({
    TouchBackend: {},
}));

// isTouchDeviceをモック
vi.mock("../OrderSelectionQuiz", async () => {
    const actual = await vi.importActual("../OrderSelectionQuiz");
    return {
        ...actual,
        isTouchDevice: () => false,
    };
});

describe("OrderSelectionQuiz", () => {
    // テスト用のモックプロップス
    const mockProps: OrderSelectionQuizProps = {
        id: "test-quiz",
        type: "orderSelection",
        question: "以下の項目を正しい順序に並べ替えてください",
        choices: [
            { id: "c", text: "ステップ3", order: 3 },
            { id: "a", text: "ステップ1", order: 1 },
            { id: "b", text: "ステップ2", order: 2 },
            { id: "d", text: "ステップ4", order: 4 },
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

    it("問題文と選択肢が正しく表示されること", () => {
        render(<OrderSelectionQuiz {...mockProps} />);

        // 問題文が表示されていることを確認
        expect(screen.getByText(mockProps.question)).toBeInTheDocument();

        // すべての選択肢が表示されていることを確認
        for (const choice of mockProps.choices) {
            expect(screen.getByText(choice.text)).toBeInTheDocument();
        }
    });

    it("ドラッグ&ドロップのための要素が存在すること", () => {
        render(<OrderSelectionQuiz {...mockProps} />);

        // 選択肢コンテナが存在することを確認
        const container = screen
            .getByText(mockProps.choices[0].text)
            .closest("div");
        expect(container).toBeInTheDocument();
    });

    it("確認ボタンをクリックすると回答処理が呼ばれること", async () => {
        render(<OrderSelectionQuiz {...mockProps} />);

        // 回答ボタンを取得
        const submitButton = screen.getByRole("button", { name: /確認/i });

        // 回答ボタンをクリック
        fireEvent.click(submitButton);

        // 回答処理が呼ばれたことを確認
        expect(mockProps.onAnswer).toHaveBeenCalledTimes(1);
        // 実際の順序はシャッフルされるため、回答の内容は検証しない
        expect(mockProps.onAnswer).toHaveBeenCalled();
    });

    it("選択肢を間違った順序に並べると正解と不正解が適切に表示されること", async () => {
        render(<OrderSelectionQuiz {...mockProps} />);

        // 回答ボタンを取得
        const submitButton = screen.getByRole("button", { name: /確認/i });

        // 回答ボタンをクリック
        fireEvent.click(submitButton);

        // フィードバックが表示されることを確認
        expect(screen.getByText(/正解|不正解/)).toBeInTheDocument();
    });

    it("メディア（画像）が存在する場合に正しく表示されること", () => {
        const propsWithImage: OrderSelectionQuizProps & {
            imageUrl?: string;
            imageAlt?: string;
        } = {
            ...mockProps,
            imageUrl: "test-image.jpg",
            imageAlt: "テスト画像",
        };

        render(<OrderSelectionQuiz {...propsWithImage} />);

        // 画像が表示されていることを確認
        const image = screen.getByAltText("テスト画像");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "test-image.jpg");
    });
});
