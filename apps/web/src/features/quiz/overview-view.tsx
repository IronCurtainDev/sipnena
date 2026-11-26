import { QuizOverviewCard } from "./overview-card";
import { QuizSidebar } from "./sidebar";
import type { QuizStrings } from "./strings";

interface OverviewViewProps {
  t: QuizStrings;
  onStart: () => void;
  onReviewNotes: () => void;
}

export function OverviewView({ t, onStart, onReviewNotes }: OverviewViewProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="min-w-0">
        <QuizOverviewCard
          t={t}
          onStart={onStart}
          onReviewNotes={onReviewNotes}
        />
      </div>
      <div className="hidden xl:block">
        <QuizSidebar t={t} />
      </div>
    </div>
  );
}
