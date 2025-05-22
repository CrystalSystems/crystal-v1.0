import { BASE_URL } from "./baseURL";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Cache-Control": "no-store"
};

const handleResponse = async (response) => {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = typeof data === "object" ? data : { message: data };

    // Unauthorized access
    if (response.status === 401) {
      console.warn("Unauthorized access");
      ///...
    }
    // /Unauthorized access

    throw error;
  }

  return data;
};

const makeRequest = async (method, url, body = null, customHeaders = {}) => {
  const options = {
    method,
    credentials: "include",
    headers: {
      ...defaultHeaders,
      ...customHeaders
    }
  };

  if (body) {
    if (body instanceof FormData) {
      delete options.headers["Content-Type"];
      options.body = body;
    } else {
      options.body = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch(BASE_URL + url, options);
    return await handleResponse(response);
  } catch (err) {
    console.error(`Request error: ${method} ${url}`, err);
    throw err;
  }
};

export const requestManager = {
  get: (url, headers) => makeRequest("GET", url, null, headers),
  post: (url, body, headers) => makeRequest("POST", url, body, headers),
  patch: (url, body, headers) => makeRequest("PATCH", url, body, headers),
  delete: (url, headers) => makeRequest("DELETE", url, null, headers)
};
