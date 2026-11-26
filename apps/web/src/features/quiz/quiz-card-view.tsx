import { QuestionCard } from "./question-card";
import { QuizSidebar } from "./sidebar";
import type { QuizStrings } from "./strings";
import type { QuizQuestion } from "./types";

interface QuizCardViewProps {
  t: QuizStrings;
  question: QuizQuestion;
  selectedOption: string | null;
  onSelectOption: (id: string) => void;
  isChecked: boolean;
  onCheck: () => void;
  onNext: () => void;
}

export function QuizCardView({
  t,
  question,
  selectedOption,
  onSelectOption,
  isChecked,
  onCheck,
  onNext,
}: QuizCardViewProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="min-w-0">
        <QuestionCard
          t={t}
          question={question}
          selectedOption={selectedOption}
          onSelectOption={onSelectOption}
          isChecked={isChecked}
          onCheck={onCheck}
          onNext={onNext}
        />
      </div>
      <div className="hidden xl:block">
        <QuizSidebar t={t} />
      </div>
    </div>
  );
}
