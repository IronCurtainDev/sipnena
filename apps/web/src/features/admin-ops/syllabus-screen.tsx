import { useState } from "react";
import { ChevronDown, ChevronRight, FolderTree, Plus } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { formatGrade, TERM_NAME_MAP } from "@/lib/i18n-common";
import { ADMIN_OPS_COPY } from "./strings";
import { INITIAL_SYLLABUS_TREE, type SyllabusGradeNode } from "./syllabus-data";

export function AdminSyllabusScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { toast, showToast } = useToastMessage();
  const copy = ADMIN_OPS_COPY[lang];

  const [tree, setTree] = useState<SyllabusGradeNode[]>(INITIAL_SYLLABUS_TREE);
  const [openGrades, setOpenGrades] = useState<number[]>([8, 11]);
  const [openSubjects, setOpenSubjects] = useState<string[]>([
    "g8-sci",
    "g11-math",
  ]);
  const [newUnitTitle, setNewUnitTitle] = useState("");

  const toggleUnitPublished = (
    grade: number,
    subjectId: string,
    termName: string,
    unitId: string,
  ) => {
    setTree((prev) =>
      prev.map((g) =>
        g.grade !== grade
          ? g
          : {
              ...g,
              subjects: g.subjects.map((s) =>
                s.id !== subjectId
                  ? s
                  : {
                      ...s,
                      terms: s.terms.map((t) =>
                        t.term !== termName
                          ? t
                          : {
                              ...t,
                              units: t.units.map((u) =>
                                u.id === unitId
                                  ? { ...u, published: !u.published }
                                  : u,
                              ),
                            },
                      ),
                    },
              ),
            },
      ),
    );
    showToast(copy.unitStatusToast);
  };

  const handleQuickAddUnit = () => {
    if (!newUnitTitle.trim()) return;
    const raw = newUnitTitle.trim();
    setTree((prev) =>
      prev.map((g) =>
        g.grade !== 8
          ? g
          : {
              ...g,
              subjects: g.subjects.map((s) =>
                s.id !== "g8-sci"
                  ? s
                  : {
                      ...s,
                      terms: s.terms.map((t) =>
                        t.term !== "Term 2"
                          ? t
                          : {
                              ...t,
                              units: [
                                ...t.units,
                                {
                                  id: `u-${Date.now()}`,
                                  localizedTitle: { en: raw, si: raw, ta: raw },
                                  published: true,
                                },
                              ],
                            },
                      ),
                    },
              ),
            },
      ),
    );
    setNewUnitTitle("");
    showToast(copy.unitAddedToast);
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.syllabusPageTitle}
      roleOverride="admin"
      toastMessage={toast}
    >
      <section className="rounded-3xl border border-slate-300 bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#111827] p-5 text-white">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300">
              <FolderTree className="h-3.5 w-3.5" />
              <span>{copy.treeBadge}</span>
            </span>
            <h2 className="mt-2 text-lg font-extrabold text-white">
              {copy.syllabusHeading}
            </h2>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newUnitTitle}
              onChange={(e) => setNewUnitTitle(e.target.value)}
              placeholder={copy.newUnitPlaceholder}
              className="rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-xs text-white placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={handleQuickAddUnit}
              className="inline-flex items-center gap-1 rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-extrabold text-slate-950 hover:bg-amber-300"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{copy.addUnitBtn}</span>
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {tree.map((gNode) => {
            const gOpen = openGrades.includes(gNode.grade);
            return (
              <div
                key={gNode.grade}
                className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-page-bg)]/40 p-3.5"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenGrades((prev) =>
                      gOpen
                        ? prev.filter((x) => x !== gNode.grade)
                        : [...prev, gNode.grade],
                    )
                  }
                  className="flex w-full items-center gap-2 text-left text-sm font-extrabold text-[var(--sn-text-main)]"
                >
                  {gOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <span>
                    {formatGrade(lang, gNode.grade)}
                    {gNode.grade >= 10 ? copy.olSuffix : ""}
                  </span>
                </button>

                {gOpen && (
                  <div className="mt-3 space-y-2.5 pl-4">
                    {gNode.subjects.map((sub) => {
                      const sOpen = openSubjects.includes(sub.id);
                      return (
                        <div
                          key={sub.id}
                          className="rounded-2xl border border-slate-200 bg-white p-3"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenSubjects((prev) =>
                                sOpen
                                  ? prev.filter((x) => x !== sub.id)
                                  : [...prev, sub.id],
                              )
                            }
                            className="flex w-full items-center gap-2 text-left text-xs font-extrabold text-[var(--sn-primary)]"
                          >
                            {sOpen ? (
                              <ChevronDown className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5" />
                            )}
                            <span>{sub.localizedName[lang]}</span>
                          </button>

                          {sOpen && (
                            <div className="mt-2 space-y-2 pl-4">
                              {sub.terms.map((tNode) => (
                                <div key={tNode.term} className="space-y-1.5">
                                  <p className="text-[11px] font-bold uppercase text-[var(--sn-text-muted)]">
                                    {TERM_NAME_MAP[tNode.term][lang]}
                                  </p>
                                  {tNode.units.map((u) => (
                                    <div
                                      key={u.id}
                                      className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs"
                                    >
                                      <span className="font-semibold text-[var(--sn-text-main)]">
                                        {u.localizedTitle[lang]}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          toggleUnitPublished(
                                            gNode.grade,
                                            sub.id,
                                            tNode.term,
                                            u.id,
                                          )
                                        }
                                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                          u.published
                                            ? "bg-emerald-100 text-emerald-800"
                                            : "bg-slate-200 text-slate-600"
                                        }`}
                                      >
                                        {u.published
                                          ? copy.publishedBadge
                                          : copy.draftBadge}
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </SipNenaPortalShell>
  );
}
