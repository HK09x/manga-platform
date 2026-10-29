"use client";

import { useEffect } from "react";

type ProgressEntry = { chapterId: string; scrollRatio: number };
type ProgressMap = Record<string, ProgressEntry>;

const storageKey = "komi:guest-reading-progress:v1";

function readProgress(): ProgressMap {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};

    return Object.fromEntries(
      Object.entries(value).filter(
        (entry): entry is [string, ProgressEntry] =>
          typeof entry[1] === "object" &&
          entry[1] !== null &&
          typeof entry[1].chapterId === "string" &&
          typeof entry[1].scrollRatio === "number" &&
          Number.isFinite(entry[1].scrollRatio) &&
          entry[1].scrollRatio >= 0 &&
          entry[1].scrollRatio <= 1,
      ),
    );
  } catch {
    return {};
  }
}

export function ReadingProgress({
  chapterId,
  mangaSlug,
}: {
  chapterId: string;
  mangaSlug: string;
}) {
  useEffect(() => {
    let ready = false;
    let saveTimer = 0;
    const progress = readProgress()[mangaSlug];
    const restoreFrame = window.requestAnimationFrame(() => {
      if (progress?.chapterId === chapterId && progress.scrollRatio > 0) {
        const scrollRange =
          document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({
          top: progress.scrollRatio * Math.max(0, scrollRange),
          behavior: "instant",
        });
      }
      ready = true;
    });

    const save = () => {
      if (!ready) return;
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollRange > 0 ? window.scrollY / scrollRange : 0;
      const nextProgress = readProgress();

      nextProgress[mangaSlug] = { chapterId, scrollRatio };
      try {
        localStorage.setItem(storageKey, JSON.stringify(nextProgress));
      } catch {
        // Keep the reader usable when browser storage is unavailable.
      }
    };

    const scheduleSave = () => {
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(save, 500);
    };

    window.addEventListener("scroll", scheduleSave, { passive: true });
    window.addEventListener("pagehide", save);

    return () => {
      window.cancelAnimationFrame(restoreFrame);
      window.clearTimeout(saveTimer);
      save();
      window.removeEventListener("scroll", scheduleSave);
      window.removeEventListener("pagehide", save);
    };
  }, [chapterId, mangaSlug]);

  return null;
}
