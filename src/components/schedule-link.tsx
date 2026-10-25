import type { Copy } from "@/copy/pt";
import { CALENDAR_URL } from "@/copy/site";

/** The one action of the site: book a demo in the calendar, in a new tab. `placement` names the spot in analytics. */
export function ScheduleLink({
  copy,
  placement,
  children,
  className = "button",
}: {
  copy: Copy;
  placement: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" data-contact={placement}>
      {children}
      <span className="sr-only">{` ${copy.contact.newTab}`}</span>
      <span aria-hidden="true" className="button-arrow">
        ↗
      </span>
    </a>
  );
}
