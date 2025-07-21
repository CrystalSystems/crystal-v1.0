import { API_BASE_URL } from '../../shared/constants';

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Cache-Control": "no-store"
};

// processing response from server
const handleResponse = async (response) => {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = typeof data === "object" ? data : { message: data };
    throw error;
  }

  return data;
};
// /processing response from server

// constructing URL with query parameters
const buildUrlWithParams = (url, params = {}) => {
  const searchParams = new URLSearchParams(params).toString();
  return searchParams ? `${url}?${searchParams}` : url;
};
// /constructing URL with query parameters

// main function for sending request
const makeRequest = async (method, url, body = null, customHeaders = {}, queryParams = null) => {
  const finalUrl = queryParams ? buildUrlWithParams(url, queryParams) : url;

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
    const response = await fetch(API_BASE_URL + finalUrl, options);
    return await handleResponse(response);
  } catch (err) {
    console.error(`Request error: ${method} ${finalUrl}`, err);
    throw err;
  }
};
// /main function for sending request

// exported object for use throughout the project
export const httpClient = {
  get: (url, queryParams = null, headers = {}) =>
    makeRequest("GET", url, null, headers, queryParams),
  post: (url, body, headers) =>
    makeRequest("POST", url, body, headers),
  patch: (url, body, headers) =>
    makeRequest("PATCH", url, body, headers),
  delete: (url, headers) =>
    makeRequest("DELETE", url, null, headers)
};
