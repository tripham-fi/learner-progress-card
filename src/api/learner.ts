import type { Learner, LearnerProgress, Result } from "../constants/types";
import { ApiError, apiFetch } from "./server";

export async function getLearners() {
  const data = await apiFetch<Result<Learner[]>>("/learners");
  return data;
}

export async function getLearnerProgress(
  username: string | undefined,
  programId: string | null,
) {
  if (!username || !programId) {
    throw new ApiError(404, "Invalidate Query");
  }
  const data = await apiFetch<Result<LearnerProgress>>(
    `/learners/${encodeURIComponent(username)}?programId=${encodeURIComponent(programId)}`,
  );
  return data;
}
