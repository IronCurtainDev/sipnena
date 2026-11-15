import { SUPER_ADMIN_ROLE } from "@repo/contracts";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "@/components/app/empty-state";
import { Feedback } from "@/components/app/feedback";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAccess } from "@/features/access/use-access";
import { formatDate, initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ADMIN_USER_PAGE_SIZE, listAdminUsers } from "./api";
import { CreateUserDialog } from "./create-user-dialog";
import { useRowAction } from "./use-row-action";
import { UserRowActions } from "./user-row-actions";
import { userRoles } from "./user-roles-dialog";

function RoleBadges({
  roles,
  className,
}: {
  roles: string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {roles.map((role) => (
        <Badge
          key={role}
          variant={role === SUPER_ADMIN_ROLE ? "default" : "outline"}
        >
          {role}
        </Badge>
      ))}
    </div>
  );
}

export function UserManagement({ currentUserId }: { currentUserId: string }) {
  const [offset, setOffset] = useState(0);
  const users = useQuery({
    queryKey: ["admin", "users", offset],
    queryFn: () => listAdminUsers(offset),
    placeholderData: (previous) => previous,
  });
  const action = useRowAction();
  const { can, isSuperAdmin } = useAccess();
  return (
    <section className="grid grid-cols-1 gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-0.5">
          <h2 className="text-base font-semibold">Users</h2>
          <p className="text-sm text-muted-foreground">
            {users.data
              ? `${users.data.total} ${users.data.total === 1 ? "account" : "accounts"}`
              : "Accounts that can sign in to this app."}
          </p>
        </div>
        {can("user:create") && <CreateUserDialog action={action} />}
      </div>
      <Feedback error={action.error} message={action.message} />
      {users.isPending ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : users.isError ? (
        <Feedback error={users.error} />
      ) : !users.data.users.length && offset === 0 ? (
        <EmptyState icon={Users} title="No users yet." />
      ) : (
        <div className="rounded-xl bg-card ring-1 ring-foreground/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">User</TableHead>
                <TableHead className="hidden sm:table-cell">Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Joined</TableHead>
                <TableHead className="w-12 pr-4">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.users.map((user) => {
                const self = user.id === currentUserId;
                return (
                  <TableRow key={user.id}>
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="text-xs">
                            {initials(user.name, user.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid min-w-0 gap-0.5">
                          <span className="font-medium">
                            {user.name}
                            {self && (
                              <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                                (you)
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <RoleBadges roles={userRoles(user)} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        <RoleBadges
                          roles={userRoles(user)}
                          className="sm:hidden"
                        />
                        {user.banned ? (
                          <Badge variant="destructive">Banned</Badge>
                        ) : user.emailVerified ? (
                          <Badge variant="secondary">Active</Badge>
                        ) : (
                          <Badge variant="outline">Unverified</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <UserRowActions
                        user={user}
                        self={self}
                        action={action}
                        can={can}
                        canManageTarget={
                          isSuperAdmin ||
                          !userRoles(user).includes(SUPER_ADMIN_ROLE)
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t p-3">
            <Button
              variant="outline"
              size="sm"
              disabled={offset === 0 || users.isFetching}
              onClick={() =>
                setOffset(Math.max(0, offset - ADMIN_USER_PAGE_SIZE))
              }
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              {users.data.users.length ? (
                <>
                  {offset + 1}&ndash;
                  {offset + users.data.users.length}
                </>
              ) : (
                "No users on this page"
              )}{" "}
              of {users.data.total}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={
                offset + ADMIN_USER_PAGE_SIZE >= users.data.total ||
                users.isFetching
              }
              onClick={() => setOffset(offset + ADMIN_USER_PAGE_SIZE)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
