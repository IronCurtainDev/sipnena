import type { FileRecord } from "@repo/contracts";
import { Download, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/app/confirm-dialog";
import { Feedback } from "@/components/app/feedback";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { downloadApiFile } from "@/lib/api/download";
import { formatBytes, formatDate } from "@/lib/format";
import { FileIcon } from "./file-icon";
import { deleteFile } from "./mutations";

export function FileList({ files }: { files: FileRecord[] }) {
  const action = useAction();
  return (
    <div className="grid grid-cols-1 gap-4">
      <Feedback error={action.error} message={action.message} />
      <ul className="divide-y rounded-xl bg-card ring-1 ring-foreground/10">
        {files.map((file) => (
          <li key={file.id} className="flex items-center gap-3 p-3 sm:px-4">
            <FileIcon type={file.contentType} />
            <div className="grid min-w-0 flex-1 gap-0.5">
              <p className="truncate text-sm font-medium" title={file.name}>
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatBytes(file.size)} · {formatDate(file.createdAt)}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Download ${file.name}`}
                disabled={action.pending}
                onClick={() =>
                  void action.run(
                    () =>
                      downloadApiFile(
                        `/api/v1/files/${encodeURIComponent(file.id)}/content`,
                        file.name,
                      ),
                    "Download started.",
                  )
                }
              >
                <Download />
              </Button>
              <ConfirmDialog
                title="Delete this file?"
                description={`“${file.name}” will be permanently deleted. This cannot be undone.`}
                confirmLabel="Delete file"
                pendingLabel="Deleting…"
                destructive
                pending={action.pending}
                error={action.error}
                onConfirm={() =>
                  action.run(() => deleteFile(file.id), "File deleted.")
                }
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${file.name}`}
                    disabled={action.pending}
                    className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 />
                  </Button>
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
