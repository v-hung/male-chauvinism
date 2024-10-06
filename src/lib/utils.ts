import { z } from "zod";
import { ZodError } from "../types/utils";

export const debounce = (callback: (args?: unknown) => void, wait: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: unknown[]) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export const errorToZodError = (error: unknown) => {
  if (error instanceof z.ZodError) {
    const errors = error.errors.reduce<ZodError>((acc, curr) => {
      acc[curr.path[0]] = curr.message;
      return acc;
    }, {})
    
    return errors
  }

  return undefined
}