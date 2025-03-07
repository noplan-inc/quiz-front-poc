import { motion } from "framer-motion";

interface QuizCompleteProps {
    onRestart?: () => void;
}

const QuizComplete: React.FC<QuizCompleteProps> = ({ onRestart }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gray-50"
        >
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                <h2 className="text-2xl font-bold mb-4">クイズ完了！</h2>
                <p className="text-gray-600 mb-6">
                    お疲れ様でした！すべての問題に回答しました。
                </p>

                {onRestart && (
                    <button
                        onClick={onRestart}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300"
                        type="button"
                    >
                        もう一度挑戦する
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default QuizComplete;
