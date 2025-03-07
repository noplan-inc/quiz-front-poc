import type { OrderSelectionQuizProps } from "@/types/quiz";
import { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import type { DragSourceMonitor, DropTargetMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/**
 * 順序選択問題を表示するコンポーネント
 * ドラッグ&ドロップで項目を並べ替える
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
        <div className="w-full">
            {/* クイズボックス */}
            <div className="border-4 border-red-600 rounded-lg bg-white overflow-hidden flex flex-col">
                {/* ヘッダー部分 */}
                <div className="bg-red-600 p-3 text-white text-center font-bold">
                    問題
                </div>

                {/* 問題文と画像 */}
                <div className="p-6">
                    <h2 className="text-xl font-bold text-indigo-950 mb-4">
                        {question}
                    </h2>

                    {/* 画像があれば表示 */}
                    {imageUrl && (
                        <div className="mb-6">
                            <img
                                src={imageUrl}
                                alt={imageAlt || "問題の画像"}
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                    )}

                    {/* 並び替え可能なリスト */}
                    <div className="mt-6">
                        <p className="text-sm text-gray-600 mb-2">
                            ※項目をドラッグ&ドロップして並べ替えてください
                        </p>
                        <DndProvider backend={HTML5Backend}>
                            <div className="space-y-3">
                                {items.map((item, index) => (
                                    <DraggableItem
                                        key={item.id}
                                        id={item.id}
                                        index={index}
                                        text={item.text}
                                        isAnswered={isAnswered}
                                        isCorrect={
                                            isAnswered &&
                                            item.order === index + 1
                                        }
                                        moveItem={moveItem}
                                    />
                                ))}
                            </div>
                        </DndProvider>
                    </div>
                </div>
            </div>

            {/* 「つぎへ」ボタン（回答後に表示） */}
            {isAnswered && (
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        className="px-6 py-2 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                    >
                        つぎへ
                    </button>
                </div>
            )}

            {/* 確認ボタン（回答前に表示） */}
            {!isAnswered && (
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={checkAnswer}
                        data-testid="submit-button"
                        className="px-6 py-2 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                    >
                        確認
                    </button>
                </div>
            )}

            {/* 回答結果のフィードバック */}
            {isAnswered && (
                <div className="mt-4 p-3 rounded bg-gray-100">
                    {isCorrect
                        ? "正解です！"
                        : "不正解です。正しい順序で並べ直してみましょう。"}
                </div>
            )}
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

    return (
        <div
            ref={ref}
            draggable={!isAnswered}
            data-testid={`item-${id}`}
            className={`p-3 rounded-md bg-indigo-950 text-white font-medium flex items-center justify-between cursor-move ${
                isAnswered && isCorrect ? "border-2 border-green-500" : ""
            } ${isAnswered && !isCorrect ? "border-2 border-red-500" : ""}`}
            style={{ opacity }}
        >
            <div className="flex-1">
                <span className="font-bold">{text}</span>
            </div>
            {!isAnswered && (
                <div className="text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
