export async function fetchBackend<T>(
  path: string,
  options: {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: unknown;
  } = {}
): Promise<T> {
  const url = `${process.env.BACKEND_URL}${path}`;

  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      // "Content-Type": "application/json",
      // "Accept": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const errorBody =
      contentType?.includes("application/json")
        ? JSON.stringify(await res.json())
        : await res.text();

    throw new Error(
      `Backend error ${res.status} at ${url}\n${errorBody.slice(0, 500)}`
    );
  }

  if (!contentType?.includes("application/json")) {
    throw new Error(
      `Expected JSON from backend, got ${contentType} at ${url}`
    );
  }

  return res.json();
}
