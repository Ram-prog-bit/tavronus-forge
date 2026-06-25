"use client";

import { useState, useRef, useCallback } from "react";
import { getContent } from "@/lib/mockFiles";
import { Vfs, loadVfs, saveVfsToStorage } from "@/lib/vfs";

export function useVfs() {
  // Hydrate synchronously on the client (workspace is client-rendered under
  // Suspense, so this initializer runs client-side only — no flash, no SSR read).
  const [vfs, setVfs] = useState<Vfs>(() => (typeof window === "undefined" ? {} : loadVfs()));

  // Keep a ref to the latest VFS so readFile stays referentially stable.
  const vfsRef = useRef(vfs);
  vfsRef.current = vfs;

  const readFile = useCallback((path: string): string => {
    const f = vfsRef.current[path];
    if (f) return f.content;
    // Defensive fallback for paths not in the VFS (e.g. demo "recent" projects).
    const name = path.split("/").pop() ?? path;
    return getContent(path, name);
  }, []);

  const writeFile = useCallback((path: string, content: string) => {
    setVfs((prev) => {
      const next = { ...prev, [path]: { content, original: content } };
      saveVfsToStorage(next);
      return next;
    });
  }, []);

  return { vfs, readFile, writeFile };
}
