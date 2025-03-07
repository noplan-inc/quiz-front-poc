import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ChoiceList, { ChoiceStatus } from "../ChoiceList";
import { Choice } from "@/types/quiz";

describe("ChoiceListコンポーネント", () => {
    // テスト用の選択肢データ
    const choices: Choice[] = [
        { id: "a", text: "選択肢A", isCorrect: true },
        { id: "b", text: "選択肢B", isCorrect: false },
    ];

    // モック関数
    const mockGetChoiceStatus = vi.fn((): ChoiceStatus => "default");
    const mockOnSelectChoice = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("選択肢が正しく表示される", () => {
        render(
            <ChoiceList
                choices={choices}
                selectedChoiceId={null}
                isAnswered={false}
                getChoiceStatus={mockGetChoiceStatus}
                onSelectChoice={mockOnSelectChoice}
            />
        );

        // 選択肢が表示されていることを確認
        expect(screen.getByTestId("choice-a")).toHaveTextContent("選択肢A");
        expect(screen.getByTestId("choice-b")).toHaveTextContent("選択肢B");
    });

    it("選択肢をクリックするとonSelectChoiceが呼ばれる", () => {
        render(
            <ChoiceList
                choices={choices}
                selectedChoiceId={null}
                isAnswered={false}
                getChoiceStatus={mockGetChoiceStatus}
                onSelectChoice={mockOnSelectChoice}
            />
        );

        // 選択肢をクリック
        fireEvent.click(screen.getByTestId("choice-a"));

        // onSelectChoiceが呼ばれたことを確認
        expect(mockOnSelectChoice).toHaveBeenCalledWith("a");
    });

    it("回答済みの場合、選択肢がdisabled状態になる", () => {
        render(
            <ChoiceList
                choices={choices}
                selectedChoiceId={null}
                isAnswered={true}
                getChoiceStatus={mockGetChoiceStatus}
                onSelectChoice={mockOnSelectChoice}
            />
        );

        // 回答済みの場合は選択肢が無効化されている
        expect(screen.getByTestId("choice-a")).toBeDisabled();
        expect(screen.getByTestId("choice-b")).toBeDisabled();
    });

    it("正解の選択肢にチェックマークが表示される", () => {
        // 正解表示ステータスを返すようにモック関数を設定
        const getChoiceStatusWithCorrect = vi.fn(
            (choice: Choice): ChoiceStatus => {
                return choice.isCorrect ? "correct" : "default";
            }
        );

        render(
            <ChoiceList
                choices={choices}
                selectedChoiceId={"a"}
                isAnswered={true}
                getChoiceStatus={getChoiceStatusWithCorrect}
                onSelectChoice={mockOnSelectChoice}
            />
        );

        // 正解マークが表示されている
        expect(screen.getByTestId("choice-a")).toHaveTextContent("✓");
        expect(screen.getByTestId("choice-b")).not.toHaveTextContent("✓");
    });

    it("選択された選択肢に適切なスタイルクラスが適用される", () => {
        // 正解・不正解の状態を返すようにモック関数を設定
        const getChoiceStatusMock = vi.fn((choice: Choice): ChoiceStatus => {
            if (choice.id === "a") return "correct";
            if (choice.id === "b") return "incorrect";
            return "default";
        });

        render(
            <ChoiceList
                choices={choices}
                selectedChoiceId={"b"}
                isAnswered={true}
                getChoiceStatus={getChoiceStatusMock}
                onSelectChoice={mockOnSelectChoice}
            />
        );

        // 正解の選択肢にはcorrectクラスが適用されている
        expect(screen.getByTestId("choice-a")).toHaveClass("border-green-500");

        // 不正解の選択肢にはincorrectクラスが適用されている
        expect(screen.getByTestId("choice-b")).toHaveClass("border-red-500");
    });
});
