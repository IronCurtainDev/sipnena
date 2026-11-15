import { Building2 } from "lucide-react";
import type { PropsWithChildren } from "react";
import { EmptyState } from "@/components/app/empty-state";
import { Feedback } from "@/components/app/feedback";
import { PageHeader } from "@/components/app/page-header";
import { PagePending } from "@/components/layout/status-pages";
import { useAppConfig } from "@/lib/api/config";

export function OrganizationGate({ children }: PropsWithChildren) {
  const config = useAppConfig();
  if (config.isPending) return <PagePending />;
  if (config.error) return <Feedback error={config.error} />;
  if (!config.data?.organizationsEnabled)
    return (
      <section>
        <PageHeader title="Organizations" />
        <EmptyState
          icon={Building2}
          title="Organizations are not enabled for this app."
          description="Set ENABLE_ORGANIZATIONS=true to let people create shared spaces."
        />
      </section>
    );
  return children;
}
