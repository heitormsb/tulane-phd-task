/** Small line icons drawn for the page (social actions, check, clock). All decorative. */
const PATHS = {
  check: "M4 12.5 9.5 18 20 6.5",
  heart: "M12 20s-7.5-4.6-7.5-10.1A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.3C19.5 15.4 12 20 12 20Z",
  comment: "M20 11.5a7.5 7.5 0 0 1-11 6.6L4.5 19.5l1.4-4.2A7.5 7.5 0 1 1 20 11.5Z",
  send: "M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5 21 3Z",
  bookmark: "M6.5 3.5h11v17l-5.5-4-5.5 4v-17Z",
  share: "M14 4.5 20.5 11 14 17.5v-4c-5 0-8 1.5-10.5 5 .9-5.5 3.6-9.5 10.5-10.5v-3.5Z",
  repost: "M7 7h10l-3-3m3 3-3 3M17 17H7l3 3m-3-3 3-3",
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  sparkle: "M12 3c.6 4.3 2.7 6.4 7 7-4.3.6-6.4 2.7-7 7-.6-4.3-2.7-6.4-7-7 4.3-.6 6.4-2.7 7-7Z",
  more: "M5 12h.01M12 12h.01M19 12h.01",
  undo: "M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11",
  layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5",
  frames: "M4 8h16M4 16h16M8 4v16M16 4v16",
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={`icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
