import { FolderOpen } from "lucide-react";
import { EmptyState } from "@/components/app/empty-state";
import { Feedback } from "@/components/app/feedback";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileList } from "@/features/files/file-list";
import { useFiles } from "@/features/files/queries";
import { UploadDropzone } from "@/features/files/upload-dropzone";

function FileListSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading files"
      className="divide-y rounded-xl ring-1 ring-foreground/10"
    >
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex items-center gap-3 p-3 sm:px-4">
          <Skeleton className="size-10 rounded-lg" />
          <div className="grid flex-1 gap-2">
            <Skeleton className="h-4 w-48 max-w-full" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FilesPage() {
  const files = useFiles();
  const records = files.data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <section className="max-w-4xl">
      <PageHeader
        title="Your files"
        description="Private files available only to your account."
      />
      <div className="grid grid-cols-1 gap-8">
        <UploadDropzone />
        <div className="grid grid-cols-1 gap-4">
          <h2 className="text-base font-semibold">Uploaded files</h2>
          {files.isPending ? (
            <FileListSkeleton />
          ) : files.isError ? (
            <div className="grid justify-items-start gap-3">
              <Feedback error={files.error} />
              <Button variant="outline" onClick={() => void files.refetch()}>
                Try again
              </Button>
            </div>
          ) : records.length ? (
            <FileList files={records} />
          ) : (
            <EmptyState
              icon={FolderOpen}
              title="No files yet."
              description="Upload your first file above. Only you can see and download it."
            />
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
        </div>
      </div>
    </section>
  );
}
