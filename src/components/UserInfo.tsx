import { useState, useEffect } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
}

interface UserInfoProps {
    userId: number;
    fetchUser?: (userId: number) => Promise<User>;
}

// デフォルトのfetchUser関数
export const defaultFetchUser = async (userId: number): Promise<User> => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!response.ok) {
        throw new Error("ユーザー情報の取得に失敗しました");
    }
    return await response.json();
};

export default function UserInfo({
    userId,
    fetchUser = defaultFetchUser,
}: UserInfoProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const userData = await fetchUser(userId);
                setUser(userData);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "不明なエラーが発生しました"
                );
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [userId, fetchUser]);

    if (loading) return <div data-testid="loading">読み込み中...</div>;
    if (error) return <div data-testid="error">エラー: {error}</div>;
    if (!user) return <div data-testid="no-user">ユーザーが見つかりません</div>;

    return (
        <div data-testid="user-info">
            <h2>{user.name}</h2>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}
