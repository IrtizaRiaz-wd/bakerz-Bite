import { cn } from "@/lib/utils";

export function Placeholder({ label, tone = "rose", className }: { label: string; tone?: "rose" | "dark" | "lav"; className?: string }) {
  return (
    <div className={cn("ph", tone === "dark" && "ph-dark", tone === "lav" && "ph-lav", className)} role="img" aria-label={label}>
      <div className="ph-zoom absolute inset-0" aria-hidden />
      <span className="ph-label relative">[{label}]</span>
    </div>
  );
}
