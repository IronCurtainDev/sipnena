import { BadgeCheck, CircleAlert } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Feedback } from "@/components/app/feedback";
import { Field } from "@/components/app/field";
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
import { useAction } from "@/hooks/use-action";
import { authClient, checkAuth } from "@/lib/auth/client";
import { initials } from "@/lib/format";

export function ProfileCard({
  name: savedName,
  email,
  verified,
  onSaved,
}: {
  name: string;
  email: string;
  verified: boolean;
  onSaved: () => void;
}) {
  const [name, setName] = useState(savedName);
  const action = useAction();
  const unchanged = name.trim() === savedName;
  function submit(event: FormEvent) {
    event.preventDefault();
    void action.run(async () => {
      if (!name.trim()) throw new Error("Please enter your name.");
      checkAuth(await authClient.updateUser({ name: name.trim() }));
      onSaved();
    }, "Your profile has been updated.");
  }
  return (
    <Card>
      <form onSubmit={submit} className="contents">
        <CardHeader>
          <CardTitle>
            <h2>Profile</h2>
          </CardTitle>
          <CardDescription>Your name and sign-in email.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarFallback className="text-lg font-medium">
                {initials(name || savedName, email)}
              </AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 gap-1">
              <p className="truncate font-medium">{savedName}</p>
              <p className="truncate text-sm text-muted-foreground">{email}</p>
            </div>
          </div>
          <Field
            label="Name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={100}
            required
          />
          <div className="grid gap-2">
            <p className="text-sm font-medium">Email</p>
            <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm">
              <span className="min-w-0 flex-1 truncate">{email}</span>
              {verified ? (
                <Badge variant="secondary">
                  <BadgeCheck />
                  Verified
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <CircleAlert />
                  Not verified
                </Badge>
              )}
            </div>
            {!verified && (
              <a
                className="text-sm font-medium underline-offset-4 hover:underline"
                href={`/verify-email?email=${encodeURIComponent(email)}&redirect=%2Faccount`}
              >
                Verify your email
              </a>
            )}
          </div>
          <Feedback error={action.error} message={action.message} />
        </CardContent>
        <CardFooter className="justify-end gap-2">
          {!unchanged && (
            <Button
              type="button"
              variant="ghost"
              disabled={action.pending}
              onClick={() => setName(savedName)}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={action.pending || unchanged}>
            {action.pending ? "Saving…" : "Save profile"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
