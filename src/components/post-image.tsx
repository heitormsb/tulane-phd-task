import type { Copy } from "@/copy/pt";
import { BRAND_NAMES, type Format, type Post } from "@/content/library";

// The exported files' sizes (scripts in the landing page's README).
const SIZE: Record<Format, [number, number]> = { "4x5": [400, 500], "9x16": [360, 640], "1x1": [400, 400] };

/** "Post de Grão da Rua: convite para…", from the post's brand and subject. */
export function postAlt(copy: Copy, post: Post) {
  return copy.postAlt.replace("{brand}", BRAND_NAMES[post.brand]).replace("{subject}", copy.subjects[post.brand]);
}

export function PostImage({
  id,
  format = "4x5",
  alt,
  eager = false,
  className,
  lang,
}: {
  id: string;
  format?: Format;
  alt: string;
  eager?: boolean;
  className?: string;
  /** For posts exported in both languages: the version in the page's language. */
  lang?: "pt" | "en";
}) {
  const [width, height] = SIZE[format];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP files; no image service needed
    <img
      className={className}
      src={`/posts/${id}-${format}${lang ? `-${lang}` : ""}.webp`}
      width={width}
      height={height}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
