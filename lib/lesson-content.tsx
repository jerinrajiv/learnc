import type { ReactNode } from "react";
import { CH0 } from "@/content/ch0";
import { CH1 } from "@/content/ch1";
import { CH2 } from "@/content/ch2";
import { CH3TO16 } from "@/content/ch3plus";

type LessonFn = () => ReactNode;

const REGISTRY: Record<string, LessonFn> = {
  ...CH0,
  ...CH1,
  ...CH2,
  ...CH3TO16,
};

export function getLessonBody(slug: string): LessonFn | undefined {
  return REGISTRY[slug];
}

export function hasLessonBody(slug: string): boolean {
  return slug in REGISTRY;
}
