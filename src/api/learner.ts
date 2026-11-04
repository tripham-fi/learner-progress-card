import type { Learner, Result } from "../constants/types";
import { apiFetch } from "./server";

export async function getLearners() {
  const data = await apiFetch<Result<Learner[]>>("/learners");
  return data;
}
