const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function getProducts({ signal } = {}) {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
    signal
  });

  let payload;

  try {
    payload = await response.json();
  } catch {
    const error = new Error(
      "The product service returned an unreadable response."
    );

    error.statusCode = response.status;
    error.requestId = response.headers.get("X-Request-ID");
    throw error;
  }

  if (!response.ok) {
    const error = new Error(
      payload?.error?.message || "Products could not be retrieved."
    );

    error.statusCode = response.status;
    error.requestId =
      payload?.error?.requestId ||
      response.headers.get("X-Request-ID");

    throw error;
  }

  if (!Array.isArray(payload.data)) {
    const error = new Error(
      "The product service returned an unexpected response."
    );

    error.statusCode = response.status;
    error.requestId = response.headers.get("X-Request-ID");
    throw error;
  }

  return payload.data;
}