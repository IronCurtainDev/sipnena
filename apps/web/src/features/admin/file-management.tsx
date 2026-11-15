import { useInfiniteQuery } from "@tanstack/react-query";
import { Download, FolderOpen, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/app/confirm-dialog";
import { EmptyState } from "@/components/app/empty-state";
import { Feedback } from "@/components/app/feedback";
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
import { FileIcon } from "@/features/files/file-icon";
import { downloadApiFile } from "@/lib/api/download";
import { formatBytes, formatDate } from "@/lib/format";
import { deleteAdminFile, listAdminFiles } from "./api";
import { useAccess } from "@/features/access/use-access";
import { useRowAction } from "./use-row-action";

export function FileManagement() {
  const files = useInfiniteQuery({
    queryKey: ["admin", "files"],
    queryFn: ({ pageParam }) => listAdminFiles(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (page) => page.meta.nextCursor,
  });
  const rows = files.data?.pages.flatMap((page) => page.data) ?? [];
  const action = useRowAction();
  const { can } = useAccess();
  return (
    <section className="grid grid-cols-1 gap-4">
      <div className="grid gap-0.5">
        <h2 className="text-base font-semibold">Files</h2>
        <p className="text-sm text-muted-foreground">
          Every uploaded file, newest first.
        </p>
      </div>
      <Feedback error={action.error} message={action.message} />
      {files.isPending ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : files.isError ? (
        <Feedback error={files.error} />
      ) : !rows.length ? (
        <EmptyState icon={FolderOpen} title="No uploaded files." />
      ) : (
        <div className="rounded-xl bg-card ring-1 ring-foreground/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">File</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="hidden sm:table-cell">Size</TableHead>
                <TableHead className="hidden md:table-cell">Uploaded</TableHead>
                <TableHead className="w-24 pr-4">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-3">
                      <FileIcon type={file.contentType} className="size-8" />
                      <span className="max-w-56 truncate font-medium">
                        {file.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="grid gap-0.5">
                      <span>{file.ownerName}</span>
                      <span className="text-xs text-muted-foreground">
                        {file.ownerEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {formatBytes(file.size)}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {formatDate(file.createdAt)}
                  </TableCell>
                  <TableCell className="pr-4">
                    <div className="flex justify-end gap-1">
                      {can("file:download-any") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Download ${file.name}`}
                          disabled={action.busy(file.id)}
                          onClick={() =>
                            void action.run(
                              file.id,
                              () =>
                                downloadApiFile(
                                  `/api/v1/admin/files/${encodeURIComponent(file.id)}/content`,
                                  file.name,
                                ),
                              "Download started.",
                            )
                          }
                        >
                          <Download />
                        </Button>
                      )}
                      {can("file:delete-any") && (
                        <ConfirmDialog
                          title="Delete this file?"
                          description={`“${file.name}” from ${file.ownerEmail} will be permanently deleted.`}
                          confirmLabel="Delete file"
                          pendingLabel="Deleting…"
                          destructive
                          pending={action.busy(file.id)}
                          error={action.error}
                          onConfirm={() =>
                            action.run(
                              file.id,
                              () => deleteAdminFile(file.id),
                              "File deleted.",
                            )
                          }
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Delete ${file.name}`}
                              disabled={action.busy(file.id)}
                              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 />
                            </Button>
                          }
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {files.hasNextPage && (
        <Button
          variant="outline"
          className="justify-self-center"
          disabled={files.isFetchingNextPage}
          onClick={() => void files.fetchNextPage()}
        >
          {files.isFetchingNextPage ? "Loading…" : "Load more"}
        </Button>
      )}
    </section>
  );
}
