import type { Choice, ImageQuizProps } from "@/types/quiz";
import ChoiceList, { type ChoiceStatus } from "./ChoiceList";

interface ImageQuizComponentProps extends ImageQuizProps {
  selectedChoiceId: string | null;
  isAnswered: boolean;
  getChoiceStatus: (choice: Choice) => ChoiceStatus;
  onSelectChoice: (choiceId: string) => void;
}

const ImageQuiz: React.FC<ImageQuizComponentProps> = ({
  question,
  choices,
  imageUrl,
  imageAlt = "問題の画像",
  selectedChoiceId,
  isAnswered,
  getChoiceStatus,
  onSelectChoice,
}) => {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4" data-testid="question-text">
        {question}
      </h3>

      <div className="my-4">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="max-w-full h-auto rounded-lg mx-auto"
          data-testid="question-image"
        />
      </div>

      <ChoiceList
        choices={choices}
        selectedChoiceId={selectedChoiceId}
        isAnswered={isAnswered}
        getChoiceStatus={getChoiceStatus}
        onSelectChoice={onSelectChoice}
      />
    </div>
  );
};

export default ImageQuiz;
