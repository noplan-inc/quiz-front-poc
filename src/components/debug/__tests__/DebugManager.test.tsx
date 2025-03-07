import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DebugManager from "../DebugManager";

// DebugModalコンポーネントをモック
vi.mock("../DebugModal", () => ({
    default: ({
        isOpen,
        onClose,
        onSelectQuiz,
    }: {
        isOpen: boolean;
        onClose: () => void;
        onSelectQuiz: (quizId: string) => void;
    }) => (
        <div data-testid="mock-debug-modal" data-is-open={isOpen}>
            {isOpen && (
                <>
                    <span>モックモーダル</span>
                    <button
                        type="button"
                        onClick={() => onSelectQuiz("test-id")}
                    >
                        クイズ選択
                    </button>
                    <button type="button" onClick={onClose}>
                        閉じる
                    </button>
                </>
            )}
        </div>
    ),
}));

describe("DebugManager", () => {
    // モック関数
    const mockSelectQuiz = vi.fn();

    beforeEach(() => {
        // モックのリセット
        vi.resetAllMocks();
        // 環境設定のモック（開発環境設定）
        vi.stubEnv("NODE_ENV", "development");
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it("初期状態ではモーダルが閉じていること", () => {
        render(<DebugManager onSelectQuiz={mockSelectQuiz} />);

        // モーダルが閉じていることを確認
        const modal = screen.getByTestId("mock-debug-modal");
        expect(modal).toHaveAttribute("data-is-open", "false");
    });

    it("dキーを押すとモーダルが開くこと", () => {
        render(<DebugManager onSelectQuiz={mockSelectQuiz} />);

        // dキーイベントをシミュレート
        fireEvent.keyDown(window, { key: "d" });

        // モーダルが開いていることを確認
        const modal = screen.getByTestId("mock-debug-modal");
        expect(modal).toHaveAttribute("data-is-open", "true");
    });

    it("dキーを再度押すとモーダルが閉じること", () => {
        render(<DebugManager onSelectQuiz={mockSelectQuiz} />);

        // 1回目のdキーでモーダルを開く
        fireEvent.keyDown(window, { key: "d" });

        // モーダルが開いていることを確認
        let modal = screen.getByTestId("mock-debug-modal");
        expect(modal).toHaveAttribute("data-is-open", "true");

        // 2回目のdキーでモーダルを閉じる
        fireEvent.keyDown(window, { key: "d" });

        // モーダルが閉じていることを確認
        modal = screen.getByTestId("mock-debug-modal");
        expect(modal).toHaveAttribute("data-is-open", "false");
    });

    it("開発環境ではデバッグボタンが表示されること", () => {
        render(<DebugManager onSelectQuiz={mockSelectQuiz} />);

        // デバッグボタンが表示されていることを確認
        const debugButton = screen.getByText("デバッグ [d]");
        expect(debugButton).toBeInTheDocument();
    });

    it("デバッグボタンをクリックするとモーダルが開くこと", () => {
        render(<DebugManager onSelectQuiz={mockSelectQuiz} />);

        // デバッグボタンをクリック
        const debugButton = screen.getByText("デバッグ [d]");
        fireEvent.click(debugButton);

        // モーダルが開いていることを確認
        const modal = screen.getByTestId("mock-debug-modal");
        expect(modal).toHaveAttribute("data-is-open", "true");
    });

    it("モーダルからクイズが選択されるとonSelectQuiz関数が呼ばれること", () => {
        render(<DebugManager onSelectQuiz={mockSelectQuiz} />);

        // モーダルを開く
        fireEvent.keyDown(window, { key: "d" });

        // モーダルからクイズを選択
        const selectButton = screen.getByText("クイズ選択");
        fireEvent.click(selectButton);

        // onSelectQuiz関数が呼ばれたことを確認
        expect(mockSelectQuiz).toHaveBeenCalledWith("test-id");
    });

    it("input要素にフォーカスがある場合はdキーのイベントが無視されること", () => {
        // 入力フィールドを含むダミーの要素を追加
        const input = document.createElement("input");
        document.body.appendChild(input);
        input.focus();

        render(<DebugManager onSelectQuiz={mockSelectQuiz} />);

        // dキーイベントをシミュレート
        fireEvent.keyDown(window, { key: "d" });

        // モーダルが閉じたままであることを確認
        const modal = screen.getByTestId("mock-debug-modal");
        expect(modal).toHaveAttribute("data-is-open", "false");

        // 後片付け
        document.body.removeChild(input);
    });

    it("モディファイアキーが押されている場合はdキーのイベントが無視されること", () => {
        render(<DebugManager onSelectQuiz={mockSelectQuiz} />);

        // Ctrlキーを押しながらdキーを押す
        fireEvent.keyDown(window, { key: "d", ctrlKey: true });

        // モーダルが閉じたままであることを確認
        const modal = screen.getByTestId("mock-debug-modal");
        expect(modal).toHaveAttribute("data-is-open", "false");
    });

    it("本番環境ではデバッグボタンが表示されないこと", () => {
        // 本番環境設定にモック
        vi.stubEnv("NODE_ENV", "production");

        render(<DebugManager onSelectQuiz={mockSelectQuiz} />);

        // デバッグボタンが表示されていないことを確認
        const debugButton = screen.queryByText("デバッグ [d]");
        expect(debugButton).not.toBeInTheDocument();
    });
});
