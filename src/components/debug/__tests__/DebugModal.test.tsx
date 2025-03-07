import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DebugModal from "../DebugModal";

// モックデータ
vi.mock("@/data/sampleQuizData", () => ({
    sampleQuizzes: [
        {
            id: "1",
            type: "text",
            question: "テスト問題1",
            choices: [{ id: "a", text: "選択肢", isCorrect: true }],
        },
        {
            id: "2",
            type: "image",
            question: "テスト問題2（画像）",
            imageUrl: "test.jpg",
            imageAlt: "テスト画像",
            choices: [{ id: "a", text: "選択肢", isCorrect: true }],
        },
        {
            id: "3",
            type: "numberInput",
            question: "テスト問題3（数値入力）",
            correctAnswer: 42,
            maxDigits: 2,
        },
    ],
}));

// framer-motionのモック
vi.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: React.ComponentProps<"div">) => (
            <div data-testid="motion-div" {...props}>
                {children}
            </div>
        ),
    },
}));

describe("DebugModal", () => {
    // モック関数
    const mockClose = vi.fn();
    const mockSelectQuiz = vi.fn();

    beforeEach(() => {
        // モックのリセット
        vi.resetAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("isOpenがfalseの場合に何も表示されないこと", () => {
        render(
            <DebugModal
                isOpen={false}
                onClose={mockClose}
                onSelectQuiz={mockSelectQuiz}
            />
        );

        // モーダルが表示されていないことを確認
        expect(screen.queryByText("デバッグモード")).not.toBeInTheDocument();
    });

    it("isOpenがtrueの場合にモーダルが表示されること", () => {
        render(
            <DebugModal
                isOpen={true}
                onClose={mockClose}
                onSelectQuiz={mockSelectQuiz}
            />
        );

        // モーダルが表示されていることを確認
        expect(screen.getByText("デバッグモード")).toBeInTheDocument();
        expect(screen.getByText("クイズタイプを選択")).toBeInTheDocument();
    });

    it("閉じるボタンをクリックするとonClose関数が呼ばれること", () => {
        render(
            <DebugModal
                isOpen={true}
                onClose={mockClose}
                onSelectQuiz={mockSelectQuiz}
            />
        );

        // 閉じるボタンをクリック
        const closeButton = screen.getByRole("button", { name: "閉じる" });
        fireEvent.click(closeButton);

        // onClose関数が呼ばれたことを確認
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it("クイズをクリックするとonSelectQuiz関数が呼ばれ、モーダルが閉じること", () => {
        render(
            <DebugModal
                isOpen={true}
                onClose={mockClose}
                onSelectQuiz={mockSelectQuiz}
            />
        );

        // クイズアイテムを選択
        const quizItem = screen
            .getByText("ID: 1")
            .closest("button") as HTMLElement;
        fireEvent.click(quizItem);

        // onSelectQuiz関数が正しい引数で呼ばれたことを確認
        expect(mockSelectQuiz).toHaveBeenCalledWith("1");
        // モーダルが閉じられることを確認
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it("タイプフィルターボタンをクリックするとそのタイプのクイズだけが表示されること", () => {
        render(
            <DebugModal
                isOpen={true}
                onClose={mockClose}
                onSelectQuiz={mockSelectQuiz}
            />
        );

        // 初期状態ではすべてのクイズが表示されていることを確認
        expect(screen.getByText("ID: 1")).toBeInTheDocument();
        expect(screen.getByText("ID: 2")).toBeInTheDocument();
        expect(screen.getByText("ID: 3")).toBeInTheDocument();

        // 「画像付きの問題」フィルターをクリック
        const imageFilterButton = screen.getByText("画像付きの問題");
        fireEvent.click(imageFilterButton);

        // image タイプのクイズだけが表示されていることを確認
        expect(screen.queryByText("ID: 1")).not.toBeInTheDocument();
        expect(screen.getByText("ID: 2")).toBeInTheDocument();
        expect(screen.queryByText("ID: 3")).not.toBeInTheDocument();
    });

    it("「すべて」ボタンをクリックするとすべてのクイズが表示されること", () => {
        render(
            <DebugModal
                isOpen={true}
                onClose={mockClose}
                onSelectQuiz={mockSelectQuiz}
            />
        );

        // まず特定のタイプでフィルタリング
        const imageFilterButton = screen.getByText("画像付きの問題");
        fireEvent.click(imageFilterButton);

        // 次に「すべて」ボタンをクリック
        const allButton = screen.getByText("すべて");
        fireEvent.click(allButton);

        // 全てのクイズが表示されていることを確認
        expect(screen.getByText("ID: 1")).toBeInTheDocument();
        expect(screen.getByText("ID: 2")).toBeInTheDocument();
        expect(screen.getByText("ID: 3")).toBeInTheDocument();
    });

    it("ESCキーが押されるとonClose関数が呼ばれること", () => {
        render(
            <DebugModal
                isOpen={true}
                onClose={mockClose}
                onSelectQuiz={mockSelectQuiz}
            />
        );

        // ESCキーイベントをシミュレート
        fireEvent.keyDown(window, { key: "Escape" });

        // onClose関数が呼ばれたことを確認
        expect(mockClose).toHaveBeenCalledTimes(1);
    });
});
