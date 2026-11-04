const BASE_URL = "/api";

function apiUrl(path: string): string {
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
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
    throw new Error("", { cause: e });
  }

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      // no JSON body, fall back to default message
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;

  return res.json();
}
