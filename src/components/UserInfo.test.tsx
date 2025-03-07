import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import UserInfo, { User } from "./UserInfo";

describe("UserInfoコンポーネント", () => {
    const mockUser: User = {
        id: 1,
        name: "山田太郎",
        email: "taro@example.com",
    };

    // 成功するモック関数
    const mockFetchUserSuccess = vi.fn().mockResolvedValue(mockUser);

    // 失敗するモック関数
    const mockFetchUserError = vi
        .fn()
        .mockRejectedValue(new Error("API呼び出しに失敗しました"));

    beforeEach(() => {
        // 各テスト前にモック関数のリセット
        vi.clearAllMocks();
    });

    it("ユーザー情報の読み込み中に読み込み中メッセージを表示する", async () => {
        // モックの解決を遅延させるために新しいモック関数を作成
        const delayedMock = vi.fn().mockImplementation(
            () =>
                new Promise((resolve) => {
                    setTimeout(() => resolve(mockUser), 100);
                })
        );

        render(<UserInfo userId={1} fetchUser={delayedMock} />);
        expect(screen.getByTestId("loading")).toBeInTheDocument();

        // ユーザー情報がロードされるまで待機
        await waitFor(() => {
            expect(screen.getByTestId("user-info")).toBeInTheDocument();
        });
    });

    it("ユーザー情報を正しく表示する", async () => {
        render(<UserInfo userId={1} fetchUser={mockFetchUserSuccess} />);

        // ユーザー情報が表示されるまで待機
        await waitFor(() => {
            expect(screen.getByTestId("user-info")).toBeInTheDocument();
        });

        expect(screen.getByText("山田太郎")).toBeInTheDocument();
        expect(screen.getByText("ID: 1")).toBeInTheDocument();
        expect(screen.getByText("Email: taro@example.com")).toBeInTheDocument();

        // モック関数が1回だけ呼ばれたことを確認
        expect(mockFetchUserSuccess).toHaveBeenCalledTimes(1);
        expect(mockFetchUserSuccess).toHaveBeenCalledWith(1);
    });

    it("APIエラー時にエラーメッセージを表示する", async () => {
        render(<UserInfo userId={1} fetchUser={mockFetchUserError} />);

        // エラーメッセージが表示されるまで待機
        await waitFor(() => {
            expect(screen.getByTestId("error")).toBeInTheDocument();
        });

        expect(
            screen.getByText(/エラー: API呼び出しに失敗しました/)
        ).toBeInTheDocument();
        expect(mockFetchUserError).toHaveBeenCalledTimes(1);
    });
});
