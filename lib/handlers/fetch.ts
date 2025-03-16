import { ActionResponse } from "@/types/global";

import logger from "../logger";
import { handleError } from "./error";
import { RequestError } from "../http-errors";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 5000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const headers: HeadersInit = {
    ...defaultHeaders,
    ...customHeaders,
  };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new RequestError(
        response.status,
        `HTTP error: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (err) {
    const error = isError(err)
      ? err
      : new Error("An error occurred");

    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out`);
    } else {
      logger.error(
        `Error fetching data from ${url}: ${error.message}`
      );
    }

    return handleError(
      error
    ) as ActionResponse<T>;
  }
}
