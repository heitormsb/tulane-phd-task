import type { Copy } from "@/copy/pt";
import { CALENDAR_URL } from "@/copy/site";

/** The one action of the site: book a demo in the calendar, in a new tab. */
export function ScheduleLink({ copy, children, className = "button" }: { copy: Copy; children: React.ReactNode; className?: string }) {
  return (
    <a className={className} href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only">{` ${copy.contact.newTab}`}</span>
      <span aria-hidden="true" className="button-arrow">
        ↗
      </span>
    </a>
  );
}
