export function LogoIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <ellipse cx="12" cy="5.5" rx="2.2" ry="3.2" />
      <ellipse cx="12" cy="18.5" rx="2.2" ry="3.2" />
      <ellipse cx="5.5" cy="12" rx="3.2" ry="2.2" />
      <ellipse cx="18.5" cy="12" rx="3.2" ry="2.2" />
    </svg>
  );
}
