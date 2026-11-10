const PATHS = {
  arrowRight: 'M3 8h10M9 4l4 4-4 4',
  arrowLeft: 'M13 8H3M7 4L3 8l4 4',
  check: 'M3 8.4l3.2 3.2L13 4.6',
  close: 'M3.5 3.5l9 9M12.5 3.5l-9 9',
  menu: 'M2 4.5h12M2 8h12M2 11.5h12',
  calendar: 'M2.5 4.5a1.5 1.5 0 0 1 1.5-1.5h8a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5zM2.5 6.5h11M5.5 1.5v3M10.5 1.5v3',
} as const;

export type IconName = keyof typeof PATHS;

/** 16×16 stroke icons. Always decorative: the control carries the name. */
export function Icon({ name, size = 16, strokeWidth = 1.8 }: { name: IconName; size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

const TRUST_PATHS = {
  person: 'M14 14.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM5 24a9 9 0 0 1 18 0',
  calendar: 'M7.5 5.5h13A3.5 3.5 0 0 1 24 9v11a3.5 3.5 0 0 1-3.5 3.5h-13A3.5 3.5 0 0 1 4 20V9a3.5 3.5 0 0 1 3.5-3.5zM4 11.5h20M9.5 3v5M18.5 3v5',
  message: 'M5 6.5h18v13H13l-5 4v-4H5zM9.5 11h9M9.5 15h6',
  phone: 'M11 3h6a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM12 21h4M11.5 11l2 2 3.5-4',
} as const;

export type TrustIconName = keyof typeof TRUST_PATHS;

export function TrustIcon({ name }: { name: TrustIconName }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={TRUST_PATHS[name]} />
    </svg>
  );
}

/** Brand symbol: the dental arch with a point of light. */
export function LuminaMark({ size = 40, tone = 'light' }: { size?: number; tone?: 'light' | 'dark' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M6 30V20a14 14 0 0 1 28 0v10" stroke={tone === 'dark' ? '#F6F3EC' : '#123D3A'} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="20" cy="21" r="3.2" fill={tone === 'dark' ? '#3DD9C5' : '#2F55D4'} />
    </svg>
  );
}

/** Small dashed arch used inside the summary ticket and strip. */
export function ArchMark({ className }: { className?: string }) {
  return (
    <svg className={className} width="64" height="44" viewBox="0 0 64 44" fill="none" aria-hidden="true">
      <path d="M6 42V30a26 26 0 0 1 52 0v12" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 5" strokeLinecap="round" />
      <circle cx="32" cy="30" r="3" fill="currentColor" />
    </svg>
  );
}
