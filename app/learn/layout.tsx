import { AppShell } from "@/components/app-shell";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
