import type { OrderSelectionQuizProps } from "@/types/quiz";
import { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { DropTargetMonitor, DragSourceMonitor } from "react-dnd";

/**
 * 順序選択問題を表示するコンポーネント
 */
export const OrderSelectionQuiz: React.FC<
    OrderSelectionQuizProps & { imageUrl?: string; imageAlt?: string }
> = ({ question, choices, onAnswer, imageUrl, imageAlt }) => {
    // 並び替え可能な選択肢の状態
    const [items, setItems] = useState(() =>
        // ランダムな順序で初期化（初期表示では順番をシャッフル）
        [...choices].sort(() => Math.random() - 0.5)
    );

    // ユーザーの回答が正しいかどうかの状態
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // 項目を移動する関数
    const moveItem = (dragIndex: number, hoverIndex: number) => {
        const newItems = [...items];
        const draggedItem = newItems[dragIndex];

        // 配列から要素を削除してから挿入
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, draggedItem);

        setItems(newItems);
    };

    // 回答を確認する関数
    const checkAnswer = () => {
        // 現在の順序が正しいかどうかを確認
        const isAnswerCorrect = items.every(
            (item, index) => item.order === index + 1
        );

        setIsCorrect(isAnswerCorrect);
        setIsAnswered(true);

        // 回答のIDを順番に配列として渡す
        onAnswer(items.map((item) => item.id));
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            {/* 問題文 */}
            <h2 className="text-xl font-bold mb-4">{question}</h2>

            {/* 画像があれば表示 */}
            {imageUrl && (
                <div className="mb-4">
                    <img
                        src={imageUrl}
                        alt={imageAlt || "問題の画像"}
                        className="max-w-full rounded"
                    />
                </div>
            )}

            {/* 選択肢 */}
            <div className="mb-6">
                <DndProvider backend={HTML5Backend}>
                    <div className="space-y-2">
                        {items.map((item, index) => (
                            <DraggableItem
                                key={item.id}
                                id={item.id}
                                index={index}
                                text={item.text}
                                isAnswered={isAnswered}
                                isCorrect={
                                    isAnswered && item.order === index + 1
                                }
                                moveItem={moveItem}
                            />
                        ))}
                    </div>
                </DndProvider>
            </div>

            {/* 回答ボタン */}
            <div className="mt-4">
                <button
                    type="button"
                    onClick={checkAnswer}
                    disabled={isAnswered}
                    className={`px-4 py-2 rounded font-medium ${
                        isAnswered
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    確認する
                </button>

                {/* 回答後のフィードバック */}
                {isAnswered && (
                    <div
                        className={`mt-4 p-3 rounded ${
                            isCorrect
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {isCorrect
                            ? "正解です！正しい順序に並べることができました。"
                            : "不正解です。もう一度挑戦してみましょう。"}
                    </div>
                )}
            </div>
        </div>
    );
};

// ドラッグ可能な項目のコンポーネント
interface DraggableItemProps {
    id: string;
    index: number;
    text: string;
    isAnswered: boolean;
    isCorrect: boolean;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
    id,
    index,
    text,
    isAnswered,
    isCorrect,
    moveItem,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    // ドラッグ&ドロップの実装
    const [{ isDragging }, drag] = useDrag({
        type: "item",
        item: { id, index },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: () => !isAnswered, // 回答済みの場合はドラッグ不可
    });

    const [, drop] = useDrop({
        accept: "item",
        hover: (
            item: { id: string; index: number },
            monitor: DropTargetMonitor
        ) => {
            if (!monitor.isOver({ shallow: true })) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            // 同じ位置の場合は何もしない
            if (dragIndex === hoverIndex) return;

            // 項目を移動
            moveItem(dragIndex, hoverIndex);

            // ドラッグしている項目のインデックスを更新
            item.index = hoverIndex;
        },
        canDrop: () => !isAnswered, // 回答済みの場合はドロップ不可
    });

    // ドラッグとドロップの参照を組み合わせる
    drag(drop(ref));

    // ドラッグ中のスタイル
    const opacity = isDragging ? 0.5 : 1;

    // 回答後のスタイル
    let backgroundColor = "bg-white";
    if (isAnswered) {
        backgroundColor = isCorrect ? "bg-green-100" : "bg-red-100";
    }

    return (
        <div
            ref={ref}
            draggable={!isAnswered}
            className={`p-3 border rounded cursor-move flex items-center ${backgroundColor}`}
            style={{ opacity }}
        >
            <div className="flex-1">
                <span className="font-medium">{text}</span>
            </div>
            {!isAnswered && (
                <div className="text-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-labelledby="drag-handle-title"
                        role="img"
                    >
                        <title id="drag-handle-title">ドラッグハンドル</title>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
};
