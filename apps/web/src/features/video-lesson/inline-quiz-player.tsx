import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { SAMPLE_QUIZ_QUESTIONS } from "../quiz/mock-data";
import type { QuizQuestion } from "../quiz/types";
import { scorePlayableQuiz } from "./course-lesson-model";
import { QuestionBreakdown } from "../quiz/question-breakdown";
import { QuestionCard } from "../quiz/question-card";
import { MOCK_FAIL_RESULT, MOCK_PASS_RESULT } from "../quiz/result-mock-data";
import { QUIZ_RESULT_STRINGS } from "../quiz/result-strings";
import type { QuizResultSummary } from "../quiz/result-types";
import { ScoreMeter } from "../quiz/score-meter";
import { QUIZ_STRINGS } from "../quiz/strings";

interface InlineQuizPlayerProps {
  quizId: string;
  lang: AppLanguage;
  onNextLesson: () => void;
  onToast: (msg: string) => void;
  onQuizCompleted?: (
    result: QuizResultSummary,
    answers: Record<number, string>,
  ) => void;
  questions?: QuizQuestion[];
  introTitle?: string;
  scoreLabel?: string;
}

export function InlineQuizPlayer({
  quizId,
  lang,
  onNextLesson,
  onToast,
  onQuizCompleted,
  questions,
  introTitle,
  scoreLabel = "Correct",
}: InlineQuizPlayerProps) {
  const bank = questions ?? SAMPLE_QUIZ_QUESTIONS;
  const [step, setStep] = useState<"intro" | "questions" | "result">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scoredResult, setScoredResult] = useState<QuizResultSummary | null>(
    null,
  );
  const [filter, setFilter] = useState<"all" | "review" | "correct">("all");

  const tQuiz = QUIZ_STRINGS[lang];
  const tResult = QUIZ_RESULT_STRINGS[lang];
  const question = bank[currentQuestionIndex] ?? bank[0];
  if (!question) {
    return (
      <p className="text-base text-[var(--sn-text-secondary)]">{introTitle}</p>
    );
  }
  const result: QuizResultSummary =
    scoredResult ?? (isPassed ? MOCK_PASS_RESULT : MOCK_FAIL_RESULT);

  const handleSelectOption = (id: string) => {
    if (!isChecked) setSelectedOption(id);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    setIsChecked(true);
    const correct = question.options.find((o) => o.isCorrect)?.id;
    onToast(
      selectedOption === correct
        ? "Correct — well done."
        : "Check the explanation.",
    );
  };

  const handleNext = () => {
    const nextAnswers = {
      ...answers,
      [question.id]: selectedOption ?? "",
    };
    setAnswers(nextAnswers);
    if (currentQuestionIndex + 1 < bank.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsChecked(false);
      return;
    }
    if (questions) {
      const scored = scorePlayableQuiz(bank, nextAnswers);
      setScoredResult(scored);
      onQuizCompleted?.(scored, nextAnswers);
    }
    setStep("result");
    onToast("Quiz finished.");
  };

  const handleTryAgain = () => {
    if (!questions) setIsPassed(!isPassed);
    setScoredResult(null);
    setAnswers({});
    setStep("questions");
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
  };

  if (step === "intro") {
    return (
      <div className="space-y-5 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 sm:p-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[var(--sn-primary)]">
            {questions
              ? `${bank.length}`
              : "Short section quiz · 10 questions · about 15 minutes"}
          </p>
          <h2 className="text-2xl font-bold text-[var(--sn-text-main)]">
            {introTitle ??
              (quizId === "quiz-sec1"
                ? "Section 1: Plane mirrors & rays"
                : "Section 2: Curved mirrors & focus")}
          </h2>
          {questions ? null : (
            <p className="text-base leading-relaxed text-[var(--sn-text-secondary)]">
              Check what you learned before the next videos. Pass with 6 out of
              10. You can try again anytime.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setStep("questions")}
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-8 text-sm font-bold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] sm:w-auto"
        >
          <span>Start quiz</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (step === "result") {
    return (
      <div className="space-y-6">
        <div className="space-y-6 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <ScoreMeter
              score={result.score}
              total={result.totalQuestions}
              isPassed={result.isPassed}
              passMark={result.passScore}
            />
            <div className="min-w-0 flex-1 space-y-2 text-center sm:text-left">
              <p className="text-sm font-semibold text-[var(--sn-primary)]">
                {result.isPassed ? "Passed" : "Needs more practice"}
              </p>
              <h2 className="text-2xl font-bold text-[var(--sn-text-main)]">
                {scoredResult
                  ? (introTitle ?? "")
                  : result.isPassed
                    ? tResult.wellDoneTitle
                    : tResult.almostThereTitle}
              </h2>
              <p className="text-base text-[var(--sn-text-secondary)]">
                {scoredResult
                  ? `${scoreLabel} ${scoredResult.score} / ${scoredResult.totalQuestions}`
                  : result.isPassed
                    ? tResult.wellDoneSub
                    : tResult.almostThereSub}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--sn-border)] pt-5">
            <button
              type="button"
              onClick={handleTryAgain}
              className="flex min-h-[48px] items-center gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-5 text-sm font-bold text-[var(--sn-text-main)]"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Try again</span>
            </button>

            <button
              type="button"
              onClick={onNextLesson}
              className="flex min-h-[48px] items-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-6 text-sm font-bold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)]"
            >
              <span>
                {questions
                  ? "Continue"
                  : quizId === "quiz-sec2"
                    ? "Finish course"
                    : "Continue to next section"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {scoredResult ? (
          <ul className="space-y-3">
            {scoredResult.questions.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4"
              >
                <p className="text-base font-bold text-[var(--sn-text-main)]">
                  {item.questionNumber}. {item.title}
                </p>
                <p className="mt-1 text-base text-[var(--sn-text-secondary)]">
                  {item.isCorrect ? item.userAnswer : item.correctAnswer}
                </p>
                {item.teacherTip ? (
                  <p className="mt-1 text-base text-[var(--sn-text-main)]">
                    {item.teacherTip}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <QuestionBreakdown
            t={tResult}
            questions={result.questions}
            filter={filter}
            onFilterChange={setFilter}
            onReviewLesson={() => onToast("Open lesson notes")}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm font-bold">
        <button
          type="button"
          onClick={() => setStep("intro")}
          className="flex min-h-[44px] items-center gap-1.5 text-[var(--sn-text-secondary)] hover:text-[var(--sn-text-main)]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
        <span className="text-[var(--sn-primary)]">
          Question {question.questionNumber} of {question.totalQuestions}
        </span>
      </div>

      <QuestionCard
        t={tQuiz}
        question={question}
        selectedOption={selectedOption}
        onSelectOption={handleSelectOption}
        isChecked={isChecked}
        onCheck={handleCheck}
        onNext={handleNext}
      />
    </div>
  );
}
