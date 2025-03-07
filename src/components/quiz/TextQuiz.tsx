import type { Choice, TextQuizProps } from "@/types/quiz";
import ChoiceList, { type ChoiceStatus } from "./ChoiceList";

interface TextQuizComponentProps extends TextQuizProps {
  selectedChoiceId: string | null;
  isAnswered: boolean;
  getChoiceStatus: (choice: Choice) => ChoiceStatus;
  onSelectChoice: (choiceId: string) => void;
}

const TextQuiz: React.FC<TextQuizComponentProps> = ({
  question,
  choices,
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

export default TextQuiz;
