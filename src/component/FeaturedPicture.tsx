"use client"

import type { Picture } from "./types";

function prettyDate(date: string) {
    return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function FeaturedPicture({ picture, loading, error, saved, onToggle, onRetry }: {
  picture: Picture | null;
  loading: boolean;
  error: string;
  saved: boolean;
  onToggle: (item: Picture) => void;
  onRetry: () => void;
}) {
  return (
    <section className="hero" id="today">
      <div className="hero-copy"><p className="eyebrow"><span className="dot" /> NASA ASTRONOMY PICTURE OF THE DAY</p>
        {loading ? <div className="loading">Looking up today’s universe…</div> : picture ? <>
          <p className="kicker">FEATURED ASTRONOMY PICTURE</p><h1>{picture.title}</h1>
          <p className="meta">◷ &nbsp;{prettyDate(picture.date)}{picture.copyright ? `　·　${picture.copyright}` : "　·　NASA APOD"}</p>
          <p className="description">{picture.explanation}</p>
          <div className="hero-actions"><a className="primary-button" href="#archive">Explore the archive <span>→</span></a>
            <button className={`save-button ${saved ? "saved" : ""}`} onClick={() => onToggle(picture)}>{saved ? "♥ Saved" : "♡ Save picture"}</button>
          </div>
        </> : <div className="error-box"><h1>Picture unavailable</h1><p>{error}</p><button className="save-button" onClick={onRetry}>Try again</button></div>}
        <p className="credit">Images and descriptions from NASA’s Astronomy Picture of the Day.</p>
      </div>
      <div className="featured-frame"><div className="frame-label">COSMOS — TODAY’S ASTRONOMY PICTURE</div>
        {loading ? <div className="image-placeholder" /> : picture?.media_type === "image" ? <img className="featured-image" src={picture.url} alt={picture.title} /> : picture?.media_type === "video" ? <iframe className="featured-image" src={picture.url} title={picture.title} allow="fullscreen" /> : <div className="image-placeholder">Your daily window into space</div>}
        {picture && <div className="image-caption"><span className="dot" /> {picture.title} <span>·</span> {picture.date}</div>}
      </div>
    </section>
  );
}
