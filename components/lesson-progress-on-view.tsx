"use client";

import { useEffect } from "react";

/** On navigating to a new lesson, scroll back to the top of the page.
 *  (Next.js can preserve scroll position across client transitions.) */
export function LessonProgressOnView({ slug }: { slug: string }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  return null;
}
