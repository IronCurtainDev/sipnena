import { Building2, ChevronRight } from "lucide-react";
import { EmptyState } from "@/components/app/empty-state";
import { Feedback } from "@/components/app/feedback";
import { PageHeader } from "@/components/app/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateOrganizationDialog } from "@/features/organizations/create-organization";
import { useOrganizations } from "@/features/organizations/queries";
import { initials } from "@/lib/format";

export function OrganizationsPage() {
  const organizations = useOrganizations();
  return (
    <section>
      <PageHeader
        title="Your organizations"
        description="An optional space for people working together. Your files stay personal."
        actions={
          organizations.data?.length ? <CreateOrganizationDialog /> : undefined
        }
      />
      <Feedback error={organizations.error} className="mb-6" />
      {organizations.isPending ? (
        <div
          role="status"
          aria-label="Loading organizations"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[0, 1, 2].map((card) => (
            <Skeleton key={card} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : organizations.data?.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.data.map((organization) => (
            <li key={organization.id}>
              <a
                href={`/organizations/${encodeURIComponent(organization.id)}`}
                className="group flex items-center gap-3 rounded-xl bg-card p-4 no-underline ring-1 ring-foreground/10 transition hover:ring-foreground/25 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand/10 font-semibold text-brand">
                  {initials(organization.name)}
                </span>
                <span className="grid min-w-0 flex-1 gap-0.5">
                  <span className="truncate font-medium">
                    {organization.name}
                  </span>
                  <span className="truncate text-sm text-muted-foreground">
                    {organization.slug}
                  </span>
                </span>
                <ChevronRight className="size-4 text-muted-foreground transition group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        !organizations.error && (
          <EmptyState
            icon={Building2}
            title="You are not a member of any organizations yet."
            description="Create one to invite teammates, or accept an invitation from your email."
            action={<CreateOrganizationDialog />}
          />
        )
      )}
    </section>
  );
}
