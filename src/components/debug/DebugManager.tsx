import { useEffect, useState } from "react";
import DebugModal from "./DebugModal";

interface DebugManagerProps {
    onSelectQuiz: (quizId: string) => void;
}

/**
 * デバッグ機能を管理するコンポーネント
 * - dキーでデバッグモーダルの表示
 * - クイズの選択と移動
 */
const DebugManager: React.FC<DebugManagerProps> = ({ onSelectQuiz }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // キーボード入力のイベントリスナー
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // dキーでデバッグモーダルを開く (シフトやコントロールなどのキーが押されていない場合のみ)
            if (
                e.key === "d" &&
                !e.altKey &&
                !e.ctrlKey &&
                !e.metaKey &&
                !e.shiftKey
            ) {
                // フォーム入力中は無視
                if (
                    document.activeElement instanceof HTMLInputElement ||
                    document.activeElement instanceof HTMLTextAreaElement ||
                    document.activeElement instanceof HTMLSelectElement
                ) {
                    return;
                }

                // モーダルの表示状態を切り替え
                setIsModalOpen((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleClose = () => {
        setIsModalOpen(false);
    };

    // デバッグ状態表示（開発環境でのみ表示）
    const isDevelopment = process.env.NODE_ENV === "development";

    return (
        <>
            {/* デバッグモーダル */}
            <DebugModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSelectQuiz={onSelectQuiz}
            />

            {/* デバッグ表示（開発環境のみ） */}
            {isDevelopment && (
                <div className="fixed top-2 right-2 z-40">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full opacity-50 hover:opacity-100"
                        title="デバッグモードを開く (dキー)"
                    >
                        デバッグ [d]
                    </button>
                </div>
            )}
        </>
    );
};

export default DebugManager;
