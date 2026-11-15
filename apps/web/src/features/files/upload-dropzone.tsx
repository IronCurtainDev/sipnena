import { CloudUpload, X } from "lucide-react";
import { useId, useRef, useState, type DragEvent, type FormEvent } from "react";
import { Feedback } from "@/components/app/feedback";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAction } from "@/hooks/use-action";
import { formatBytes } from "@/lib/format";
import { cn } from "@/lib/utils";
import { FileIcon } from "./file-icon";
import { uploadFile } from "./mutations";
import { acceptedFileTypes, uploadHint, uploadProblem } from "./validation";

export function UploadDropzone() {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const action = useAction();
  const problem = file ? uploadProblem(file) : null;

  function clear() {
    setFile(null);
    if (input.current) input.current.value = "";
  }
  function drop(event: DragEvent) {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    void action.run(async () => {
      if (!file) throw new Error("Choose a file first.");
      await uploadFile(file);
      clear();
    }, "Your file has been uploaded.");
  }

  return (
    <Card>
      <CardContent>
        <form className="grid gap-4" onSubmit={submit}>
          <label
            htmlFor={id}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={drop}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors hover:border-foreground/25 hover:bg-muted/40 has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
              dragging && "border-brand bg-brand/5",
            )}
          >
            <span className="grid size-11 place-items-center rounded-full bg-muted">
              <CloudUpload className="size-5 text-muted-foreground" />
            </span>
            <span className="grid gap-1">
              <span className="text-sm font-medium">
                Drop a file here, or{" "}
                <span className="text-brand underline underline-offset-4">
                  browse
                </span>
              </span>
              <span className="text-xs text-muted-foreground">
                {uploadHint}
              </span>
            </span>
            <input
              ref={input}
              id={id}
              name="file"
              type="file"
              aria-label="File"
              accept={acceptedFileTypes}
              className="sr-only"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>
          {file && (
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <FileIcon type={file.type} />
              <div className="grid min-w-0 flex-1 gap-0.5">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(file.size)}
                  {file.type ? ` · ${file.type}` : ""}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Remove selected file"
                disabled={action.pending}
                onClick={clear}
              >
                <X />
              </Button>
            </div>
          )}
          <Feedback error={problem || action.error} message={action.message} />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={action.pending || !file || Boolean(problem)}
            >
              {action.pending ? "Uploading…" : "Upload file"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
