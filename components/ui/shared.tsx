import Link from "next/link";

export function SectionHeader({
  title,
  action = "See All",
}: {
  title: string;
  action?: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="section-title">{title}</h2>
      <button type="button" className="see-all-btn">
        {action}
      </button>
    </div>
  );
}

export function SourceBadge({
  source,
  date,
}: {
  source: string;
  date: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[11px] text-gwd-label">
      <span className="font-bold tracking-[0.08em] text-white">{source}</span>
      <span>{date}</span>
    </div>
  );
}

export function PlatformBadge({ platform }: { platform: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#182238] px-2 py-[3px] text-[10px] font-semibold uppercase tracking-wide text-gwd-accent ring-1 ring-[#243352]">
      {platform === "PC" && <WindowsIcon className="h-3 w-3" />}
      {platform !== "PC" && (
        <span className="flex h-3 w-3 items-center justify-center rounded-[2px] bg-gwd-accent/30 text-[8px]">
          {platform.charAt(0)}
        </span>
      )}
      {platform}
    </span>
  );
}

export function SourceMeta({
  source,
  timeAgo,
  color = "#ff6600",
}: {
  source: string;
  timeAgo: string;
  color?: string;
}) {
  return (
    <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-gwd-label">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {source.charAt(0)}
      </span>
      <span>{source}</span>
      <span className="text-gwd-muted">·</span>
      <span>{timeAgo}</span>
    </div>
  );
}

export function WindowsIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 5.5L10.5 4.2v7.1H3V5.5zm0 8.4h7.5v7.3L3 19.5v-5.6zm9-9.3L21 3v7.5h-9V4.6zm0 8.9H21V21l-9-1.8v-8.7z" />
    </svg>
  );
}

export function PlatformFilterIcons() {
  const icons = [
    { label: "PC", icon: <WindowsIcon className="h-3.5 w-3.5" /> },
    {
      label: "Switch",
      icon: (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <rect x="4" y="4" width="16" height="16" rx="3" />
        </svg>
      ),
    },
    {
      label: "PlayStation",
      icon: (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M8.5 17c3.5-1 5.5-2.5 5.5-5.5S12 7 8.5 6V17zm7 1.5c2.5-.5 4.5-2 4.5-4.5s-2-4-4.5-4.5v9z" />
        </svg>
      ),
    },
    {
      label: "Xbox",
      icon: (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M4 4l8 8 8-8v16l-8-8-8 8V4z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {icons.map((item) => (
        <button
          key={item.label}
          type="button"
          title={item.label}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gwd-label transition hover:bg-gwd-panel hover:text-white"
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}

export function FlameIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-orange-400" fill="currentColor" aria-hidden>
      <path d="M8 1s2 2.5 2 4.5c0 1.5-.8 2.5-2 3 1.2-.5 2-1.5 2-3C10 3.5 8 1 8 1zm0 14a5 5 0 01-5-5c0-2 1.5-3.5 3-5 0 2 1.5 3 2.5 3s2.5-1.5 2.5-3c1.5 1.5 3 3 3 5a5 5 0 01-5 5z" />
    </svg>
  );
}
