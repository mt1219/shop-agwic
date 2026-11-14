/**
 * Build a public URL for a Supabase Storage object.
 * Path is relative to the bucket root, e.g. `the-original-cork/hero.webp`.
 *
 * Before Supabase is configured, returns an inline SVG placeholder so the
 * site doesn't break — the placeholder says "NO IMAGE" so it's obvious
 * during development.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const BUCKET = "product-images";

export function productImageUrl(path: string | undefined | null): string {
  if (!path) return placeholderSvg("No image");

  if (!SUPABASE_URL) {
    return placeholderSvg(path);
  }

  const clean = path.replace(/^\/+/, "");
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${clean}`;
}

function placeholderSvg(label: string): string {
  const safe = label.replace(/[<>&"]/g, "").slice(0, 40);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="#f2f1ee"/>
    <text x="200" y="190" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" fill="#6b6b6b">NO IMAGE</text>
    <text x="200" y="215" text-anchor="middle" font-family="monospace" font-size="10" fill="#9b9691">${safe}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** Price in cents → "$29.99" */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
