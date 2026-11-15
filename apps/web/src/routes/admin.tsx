import {
  Activity,
  BookOpen,
  ExternalLink,
  FileJson,
  Files,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react";
import { EmptyState } from "@/components/app/empty-state";
import { Feedback } from "@/components/app/feedback";
import { PageHeader } from "@/components/app/page-header";
import { PagePending } from "@/components/layout/status-pages";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RolesManagement } from "@/features/access/roles-management";
import { useAccess } from "@/features/access/use-access";
import { FileManagement } from "@/features/admin/file-management";
import { UserManagement } from "@/features/admin/user-management";
import { authClient } from "@/lib/auth/client";

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

export function AdminPage() {
  const session = authClient.useSession();
  const access = useAccess();
  if (session.isPending || access.pending) return <PagePending />;
  const error = session.error?.message ?? access.error?.message;
  if (error) return <Feedback error={error} />;
  const tabs = [
    {
      value: "users",
      label: "Users",
      icon: Users,
      visible: access.can("user:list"),
      content: <UserManagement currentUserId={session.data?.user.id ?? ""} />,
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
  ].filter((tab) => tab.visible);
  if (!tabs[0]) {
    return (
      <section>
        <PageHeader title="Admin dashboard" />
        <EmptyState
          icon={ShieldAlert}
          title="You do not have access to the admin dashboard."
          description="Ask an administrator to give your account a role with admin permissions."
        />
      </section>
    );
  }
  return (
    <section>
      <PageHeader
        title="Admin dashboard"
        description="Manage users, files, roles, and operational API tools."
        actions={
          access.can("api-docs:view") &&
          apiTools.map(({ href, label, icon: Icon }) => (
            <Button key={href} variant="outline" asChild>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon />
                {label}
                <ExternalLink className="text-muted-foreground" />
              </a>
            </Button>
          ))
        }
      />
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
  );
}
