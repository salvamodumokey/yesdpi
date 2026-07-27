"use client";

import { createContext, useContext, useMemo, useRef, type ReactNode } from "react";

interface PendingFileApi {
  /** Stashes a file for the next page to pick up (e.g. hero drop -> DPI Checker). */
  setPendingFile: (file: File) => void;
  /** Reads and clears the stashed file, if any. Safe to call more than once. */
  takePendingFile: () => File | null;
}

const PendingFileContext = createContext<PendingFileApi | null>(null);

/**
 * Holds a File in memory across a client-side route change. Next.js App
 * Router keeps the root layout mounted during navigation, so a plain ref
 * here survives from the homepage drop to the destination tool page —
 * no sessionStorage, no re-selecting the file, and the file is never
 * serialized or sent anywhere.
 */
export function PendingFileProvider({ children }: { children: ReactNode }) {
  const fileRef = useRef<File | null>(null);

  const api = useMemo<PendingFileApi>(
    () => ({
      setPendingFile: (file) => {
        fileRef.current = file;
      },
      takePendingFile: () => {
        const file = fileRef.current;
        fileRef.current = null;
        return file;
      },
    }),
    []
  );

  return <PendingFileContext.Provider value={api}>{children}</PendingFileContext.Provider>;
}

export function usePendingFile(): PendingFileApi {
  const ctx = useContext(PendingFileContext);
  if (!ctx) throw new Error("usePendingFile must be used within PendingFileProvider");
  return ctx;
}
