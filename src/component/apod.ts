import type { Picture } from "./types";

const nasaFeed = "https://science.nasa.gov/wp-json/wp/v2/apod-basic";

type NasaPicture = Picture & {
  hdurl?: string;
  basic_html?: string;
  credit?: string;
};

function nasaDateCode(date: string) {
  return date.slice(2).replaceAll("-", "");
}

function mediaUrl(html = "") {
  return html.match(/<(?:img|iframe)\b[^>]*\bsrc=["']([^"']+)["']/i)?.[1] ?? "";
}

function plainText(html = "") {
  return html
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, value: string) => String.fromCodePoint(Number(value)))
    .replace(/&#x([\da-f]+);/gi, (_, value: string) => String.fromCodePoint(parseInt(value, 16)))
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(item: NasaPicture): Picture {
  return {
    ...item,
    explanation: plainText(item.explanation),
    url: item.hdurl || mediaUrl(item.basic_html) || item.url,
    copyright: plainText(item.copyright || item.credit),
    media_type: item.media_type || "image",
  };
}

export async function getApod(date?: string, count?: number): Promise<Picture[]> {
  const directUrl = date
    ? `${nasaFeed}/${nasaDateCode(date)}`
    : `${nasaFeed}?page=1&per_page=${count ?? 1}`;

  try {
    const response = await fetch(directUrl);
    if (!response.ok) throw new Error("NASA's picture feed is unavailable.");
    const data: NasaPicture | NasaPicture[] = await response.json();
    return (Array.isArray(data) ? data : [data]).map(normalize);
  } catch {
    // Some hosts block browser requests to NASA; use the same-origin server route there.
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (count) params.set("count", String(count));
    const response = await fetch(`/api/apod${params.size ? `?${params}` : ""}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "Could not connect to NASA right now.");
    return Array.isArray(data) ? data : [data];
  }
}
