import { apiClient } from "@/lib/api/client";
import { queryClient } from "@/lib/api/query-client";
import { uploadProblem } from "./validation";

export async function uploadFile(file: File) {
  const problem = uploadProblem(file);
  if (problem) throw new Error(problem);
  await apiClient.api.v1.files.$post({ form: { file } });
  await queryClient.invalidateQueries({ queryKey: ["files"] });
}

export async function deleteFile(id: string) {
  await apiClient.api.v1.files[":id"].$delete({ param: { id } });
  await queryClient.invalidateQueries({ queryKey: ["files"] });
}
