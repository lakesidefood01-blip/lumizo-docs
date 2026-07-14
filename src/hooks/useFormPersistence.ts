"use client";

import { useCallback } from "react";

interface UseFormPersistenceOptions<T> {
  key: string;
  setValue: (name: any, value: any) => void;
  reset: (values: T) => void;
}

export function useFormPersistence<T extends Record<string, unknown>>({
  key,
  setValue,
  reset,
}: UseFormPersistenceOptions<T>) {
  const saveToStorage = useCallback(
    (data: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch {
        // Silently fail if localStorage is full or unavailable
      }
    },
    [key]
  );

  const loadFromStorage = useCallback((): T | null => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored) as T;
      }
    } catch {
      // Silently fail if JSON parsing fails
    }
    return null;
  }, [key]);

  const clearStorage = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail
    }
  }, [key]);

  const restoreForm = useCallback(() => {
    const stored = loadFromStorage();
    if (stored) {
      // Use reset to properly populate all fields including nested ones
      reset(stored);
      return true;
    }
    return false;
  }, [loadFromStorage, reset]);

  return {
    saveToStorage,
    loadFromStorage,
    clearStorage,
    restoreForm,
  };
}
