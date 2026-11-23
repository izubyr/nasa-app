import { NextRequest, NextResponse } from "next/server";
const nasaUrl = "https://science.nasa.gov/wp-json/wp/v2/apod-basic"

type NasaApod = {
    date: string
    title: string
    explanation?: string
    url?: string
    hdurl?: string
    basic_html?: string
    media_type?: string
    copyright?: string
    credit?: string
}

function dateCode(date: string) {
    return date.slice(2).replaceAll("-", "")
}

function imageFromHtml(html = "") {
    return html.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i)?.[1]
        ?? html.match(/<iframe\b[^>]*\bsrc=["']([^"']+)["']/i)?.[1]
        ?? "";
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

function normalize(item: NasaApod) {
    return {
        ...item,
        explanation: plainText(item.explanation),
        media_type: item.media_type ?? "image",
        copyright: plainText(item.copyright ?? item.credit),
        url: item.hdurl || imageFromHtml(item.basic_html) || item.url || ""
    }
}

export async function GET(request: NextRequest) {
    const date = request.nextUrl.searchParams.get("date")
    const count = request.nextUrl.searchParams.get("count")
    let url = nasaUrl
    if (date) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
            return NextResponse.json({ error: "Choose a valid date." }, { status: 400 });
        }
        url += `/${dateCode(date)}`;
    } else if (count) {
        const safeCount = Math.min(Math.max(Number(count) || 1, 1), 12);
        url += `?page=1&per_page=${safeCount}`;
    } else {
        url += "?page=1&per_page=1";
    }

    try {
        const response = await fetch(url, { next: { revalidate: 3600 } })
        const data = await response.json()
        if (!response.ok) {
            return NextResponse.json(
                { error: data.message ?? data.error?.message ?? "NASA could not load that picture."},
                { status: response.status },
            )
        }
        return NextResponse.json(Array.isArray(data) ? data.map(normalize) : normalize(data))
    } catch {
        return NextResponse.json({ error: "Could not connect to NASA right now"}, { status: 502 })
    }
}
