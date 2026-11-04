import type { ErrorResult } from "../constants/types";

const BASE_URL = "/api";

function apiUrl(path: string): string {
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const { headers, body, ...rest } = options;
  let res: Response;
  try {
    res = await fetch(apiUrl(path), {
      ...rest,
      body,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
    });
  } catch (e) {
    throw new ApiError(500, e instanceof Error ? e.message : "Network error");
  }

  if (!res.ok) {
    let status = res.status;
    let message = `Request failed with status ${res.status}`;
    try {
      const errorBody = (await res.json()) as ErrorResult;
      if (errorBody?.status) status = errorBody.status;
      if (errorBody?.message) message = errorBody.message;
    } catch {
      // no JSON body, fall back to default message
    }
    throw new ApiError(status, message);
  }

  if (res.status === 204) return undefined as T;

  return res.json();
}
