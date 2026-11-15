import { useState } from "react";
import { Feedback } from "@/components/app/feedback";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { initials } from "@/lib/format";
import { MemberActions } from "./member-actions";
import { useMembers } from "./queries";

const pageSize = 20;

export function Members({
  organizationId,
  currentRole,
}: {
  organizationId: string;
  currentRole: string;
}) {
  const [offset, setOffset] = useState(0);
  const members = useMembers(organizationId, offset);
  const total = members.data?.total ?? 0;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Members</h2>
        </CardTitle>
        <CardDescription>
          {members.data
            ? `${total} ${total === 1 ? "person" : "people"} in this organization.`
            : "People in this organization."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Feedback error={members.error} />
        {members.isPending ? (
          <div
            role="status"
            aria-label="Loading members"
            className="grid grid-cols-1 gap-3"
          >
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <ul className="divide-y">
            {members.data?.members.map((member) => (
              <li
                key={member.id}
                className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="text-xs">
                      {initials(member.user.name, member.user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid min-w-0 gap-0.5">
                    <p className="flex flex-wrap items-center gap-2 font-medium">
                      <span className="truncate">{member.user.name}</span>
                      {member.role.split(",").map((role) => (
                        <Badge
                          key={role}
                          variant="outline"
                          className="capitalize"
                        >
                          {role.trim()}
                        </Badge>
                      ))}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {member.user.email}
                    </p>
                  </div>
                </div>
                <MemberActions
                  key={`${member.id}:${member.role}`}
                  member={member}
                  currentRole={currentRole}
                />
              </li>
            ))}
            {members.data?.members.length === 0 && (
              <li className="py-6 text-center text-sm text-muted-foreground">
                No members on this page.
              </li>
            )}
          </ul>
        )}
      </CardContent>
      {total > pageSize && (
        <CardFooter className="justify-between gap-2">
          <span className="text-xs text-muted-foreground">
            {offset + 1}–{Math.min(offset + pageSize, total)} of {total}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={offset === 0}
              onClick={() => setOffset(Math.max(0, offset - pageSize))}
            >
              Previous members
            </Button>
            <Button
              variant="outline"
              disabled={offset + pageSize >= total}
              onClick={() => setOffset(offset + pageSize)}
            >
              Next members
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
