import { networkById, type NetworkId } from "./networks-data";

// Instagram's own tile: its gradient and the camera drawn in outline, which stays crisp at small sizes.
const INSTAGRAM_TILE = "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)";

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
    </svg>
  );
}

/** A network's mark on a tile in the network's colour. `label` names it for screen readers when no text is beside it. */
export function NetworkIcon({ id, size = "md", label = false }: { id: NetworkId; size?: "xs" | "sm" | "md" | "lg"; label?: boolean }) {
  const network = networkById(id);
  const a11y = label ? { role: "img", "aria-label": network.name } : { "aria-hidden": true };
  const instagram = id === "instagram";
  return (
    <span
      {...a11y}
      className={`net net-${size}${instagram ? " net-instagram" : ""}`}
      style={{ background: instagram ? INSTAGRAM_TILE : network.color, color: network.ink }}
    >
      {instagram ? (
        <InstagramGlyph />
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d={network.path} fill="currentColor" />
        </svg>
      )}
    </span>
  );
}
