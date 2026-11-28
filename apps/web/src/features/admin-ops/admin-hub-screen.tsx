import {
  Activity,
  BookOpen,
  ExternalLink,
  FileJson,
  Files,
  FolderTree,
  GraduationCap,
  LogIn,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { EmptyState } from "@/components/app/empty-state";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCoursesStore } from "@/data/courses";
import { RolesManagement } from "@/features/access/roles-management";
import { useAccess } from "@/features/access/use-access";
import { FileManagement } from "@/features/admin/file-management";
import { UserManagement } from "@/features/admin/user-management";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { authClient } from "@/lib/auth/client";
import { usePrototypeState } from "@/lib/prototype-state";
import { ADMIN_HUB_COPY } from "./admin-hub-strings";

const apiTools = [
  { href: "/api/docs", label: "Swagger API docs", icon: BookOpen },
  {
    href: "/api/auth/open-api/generate-schema",
    label: "Raw Auth OpenAPI",
    icon: FileJson,
  },
  ...(import.meta.env.DEV
    ? [{ href: "/api/telescope", label: "Telescope", icon: Activity }]
    : []),
];

export function AdminHubScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state } = usePrototypeState();
  const { store } = useCoursesStore();
  const session = authClient.useSession();
  const access = useAccess();
  const copy = ADMIN_HUB_COPY[lang];
  const pendingSlips = state.bankSlips.filter(
    (s) => s.status === "pending",
  ).length;
  const teacherCount = store.teachers.length;

  const isSignedIn = Boolean(session.data?.user);
  const accessReady = isSignedIn && !access.pending && !access.error;
  const tabs = accessReady
    ? [
        {
          value: "users",
          label: "Users",
          icon: Users,
          visible: access.can("user:list"),
          content: (
            <UserManagement currentUserId={session.data?.user.id ?? ""} />
          ),
        },
        {
          value: "files",
          label: "Files",
          icon: Files,
          visible: access.can("file:list-any"),
          content: <FileManagement />,
        },
        {
          value: "roles",
          label: "Roles",
          icon: ShieldCheck,
          visible: access.can("role:list"),
          content: <RolesManagement />,
        },
      ].filter((tab) => tab.visible)
    : [];

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.pageTitle}
      roleOverride="admin"
    >
      <section className="rounded-3xl bg-[#111827] p-5 text-white shadow-sm sm:p-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{copy.heroBadge}</span>
        </span>
        <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
          {copy.heroTitle}
        </h2>
        <p className="mt-1 text-sm text-slate-300">{copy.heroSub}</p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Link
          to="/admin/payments"
          className="group flex flex-col justify-between rounded-3xl border border-slate-300 bg-white p-6 shadow-xs transition hover:border-amber-500"
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-900">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900">
                {pendingSlips} {copy.pendingCountLabel}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-extrabold text-[var(--sn-text-main)]">
              {copy.paymentsTitle}
            </h3>
            <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
              {copy.paymentsDesc}
            </p>
          </div>
          <span className="mt-5 inline-flex min-h-[44px] items-center text-sm font-bold text-amber-900 group-hover:underline">
            {copy.paymentsCta} →
          </span>
        </Link>

        <Link
          to="/admin/syllabus"
          className="group flex flex-col justify-between rounded-3xl border border-slate-300 bg-white p-6 shadow-xs transition hover:border-amber-500"
        >
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-amber-300">
              <FolderTree className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-[var(--sn-text-main)]">
              {copy.syllabusTitle}
            </h3>
            <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
              {copy.syllabusDesc}
            </p>
          </div>
          <span className="mt-5 inline-flex min-h-[44px] items-center text-sm font-bold text-[var(--sn-primary)] group-hover:underline">
            {copy.syllabusCta} →
          </span>
        </Link>

        <Link
          to="/admin/teachers"
          className="group flex flex-col justify-between rounded-3xl border border-slate-300 bg-white p-6 shadow-xs transition hover:border-amber-500"
          data-testid="admin-hub-teachers"
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-900">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-900">
                {teacherCount} {copy.teacherCountLabel}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-extrabold text-[var(--sn-text-main)]">
              {copy.teachersTitle}
            </h3>
            <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
              {copy.teachersDesc}
            </p>
          </div>
          <span className="mt-5 inline-flex min-h-[44px] items-center text-sm font-bold text-emerald-900 group-hover:underline">
            {copy.teachersCta} →
          </span>
        </Link>
      </section>

      {isSignedIn && accessReady && tabs[0] ? (
        <section className="space-y-4 rounded-3xl border border-slate-300 bg-white p-5 shadow-xs sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-extrabold text-[var(--sn-text-main)]">
              Admin dashboard
            </h2>
            {access.can("api-docs:view") ? (
              <div className="flex flex-wrap gap-2">
                {apiTools.map(({ href, label, icon: Icon }) => (
                  <Button key={href} variant="outline" asChild>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon />
                      {label}
                      <ExternalLink className="text-muted-foreground" />
                    </a>
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
          <Tabs defaultValue={tabs[0].value} className="gap-6">
            <TabsList>
              {tabs.map(({ value, label, icon: Icon }) => (
                <TabsTrigger key={value} value={value} className="px-3">
                  <Icon />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map(({ value, content }) => (
              <TabsContent key={value} value={value}>
                {content}
              </TabsContent>
            ))}
          </Tabs>
        </section>
      ) : isSignedIn && accessReady ? (
        <section className="rounded-3xl border border-slate-300 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-extrabold text-[var(--sn-text-main)]">
            Admin dashboard
          </h2>
          <EmptyState
            icon={ShieldAlert}
            title={copy.noAccessTitle}
            description={copy.noAccessDesc}
          />
        </section>
      ) : (
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-300 bg-white p-5 shadow-xs sm:p-6">
          <div>
            <h2 className="text-base font-extrabold text-[var(--sn-text-main)]">
              {copy.accountHeading}
            </h2>
            <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
              {copy.accountDesc}
            </p>
          </div>
          <Link
            to="/login"
            search={{ redirect: "/admin" }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#111827] px-4 text-sm font-bold text-amber-300 hover:bg-slate-800"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            <span>{copy.signInLink}</span>
          </Link>
        </section>
      )}
    </SipNenaPortalShell>
  );
}
