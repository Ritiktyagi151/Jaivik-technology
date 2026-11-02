const FALLBACK_POSTER = "/assets/optimized/logo-1.webp";

const IMAGE_EXTENSION_PATTERN = /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i;
const VIDEO_EXTENSION_PATTERN = /\.(m3u8|mov|mp4|webm)(\?.*)?$/i;

export const safePosterUrl = (url?: string | null) => {
  if (!url) return FALLBACK_POSTER;
  if (VIDEO_EXTENSION_PATTERN.test(url)) return FALLBACK_POSTER;
  if (IMAGE_EXTENSION_PATTERN.test(url)) return url;
  return FALLBACK_POSTER;
};
