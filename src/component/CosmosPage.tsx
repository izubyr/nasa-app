"use client"

import { useEffect, useMemo, useState } from "react"
import { FeaturedPicture } from "./FeaturedPicture"
import { PictureGrid } from "./PictureGrid"
import { SiteHeader } from "./SiteHeader"
import { getApod } from "./apod"
import type { PageView, Picture } from "./types"


const savedKey = "cosmos-saved-pictures"

export function CosmosPage({ view }: { view: PageView }) {
    const [picture, setPicture] = useState<Picture | null>(null)
    const [archive, setArchive] = useState<Picture[]>([])
    const [favorites, setFavorites] = useState<Picture[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [currentYear, setCurrentYear] = useState<number | null>(null)

    useEffect(() => {
        setCurrentYear(new Date().getFullYear())
        try { setFavorites(JSON.parse(localStorage.getItem(savedKey) ?? "[]")); } catch { setFavorites([]); }
        void loadPicture ()
        void loadArchive ()
    }, [])

    async function loadPicture(date?: string) {
        setLoading(true); setError("")
        try {
            const items = await getApod(date)
            if (!items[0]) throw new Error("NASA did not return a picture for that date.")
                setPicture(items[0])
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Could not load the picture.")
        } finally { setLoading(false) }
    }

    async function loadArchive() {
        try {
            const data = await getApod(undefined, 8)
            setArchive(data.filter((item) => item.media_type === "image").sort((a, b) => b.date.localeCompare(a.date)))
        } catch {}
    }

     function toggleFavorite(item: Picture) {
    const next = favorites.some((saved) => saved.date === item.date)
      ? favorites.filter((saved) => saved.date !== item.date)
      : [item, ...favorites];
    setFavorites(next);
    localStorage.setItem(savedKey, JSON.stringify(next));
  }

  function openPicture(item: Picture) {
    void loadPicture(item.date);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const shownItems = view === "favorites" ? favorites : archive;
  const savedDates = useMemo(() => new Set(favorites.map((item) => item.date)), [favorites]);
  const heading = view === "favorites" ? "Saved pictures" : view === "explore" ? "Explore the archive" : "From the archive";
  const label = view === "favorites" ? "YOUR COLLECTION" : view === "explore" ? "TAKE A LOOK BACK" : "HISTORICAL LOGS";

  return <main>
    <SiteHeader view={view} onDate={(date) => { if (date) void loadPicture(date); }} />
    <FeaturedPicture picture={picture} loading={loading} error={error} saved={picture ? savedDates.has(picture.date) : false} onToggle={toggleFavorite} onRetry={() => void loadPicture()} />
    <section className="archive-section" id="archive">
      <div className="section-heading"><div><p className="kicker">{label}</p><h2>{heading}</h2></div>
        {view !== "favorites" && <a className="text-button" href="/explore">View the archive <span>→</span></a>}
      </div>
      <PictureGrid items={shownItems} savedDates={savedDates} onToggle={toggleFavorite} onOpen={openPicture}
        emptyMessage={view === "favorites" ? "No saved pictures yet. Tap the heart on a picture to keep it here." : "The archive will appear here once NASA sends back the pictures."} />
    </section>
    <footer>© {currentYear ?? ""} COSMOS <span>·</span> Exploring the universe, one picture at a time.</footer>
  </main>
}