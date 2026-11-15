import { CircleAlert, CircleCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

function errorText(error: unknown) {
  if (!error) return "";
  if (error instanceof Error) return error.message;
  return typeof error === "string" ? error : "Something went wrong.";
}

export function Feedback({
  error,
  message,
  className,
}: {
  error?: unknown;
  message?: string;
  className?: string;
}) {
  const text = errorText(error);
  return (
    <>
      {text ? (
        <Alert variant="destructive" className={cn("break-words", className)}>
          <CircleAlert />
          <AlertDescription>{text}</AlertDescription>
        </Alert>
      ) : null}
      {message ? (
        <Alert
          role="status"
          className={cn(
            "border-success/25 bg-success/5 break-words *:[svg]:text-success",
            className,
          )}
        >
          <CircleCheck />
          <AlertDescription className="text-foreground">
            {message}
          </AlertDescription>
        </Alert>
      ) : null}
    </>
  );
}
