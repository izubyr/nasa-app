"use client"

import type { Picture } from "./types"

function prettyDate(date: string) {
    return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function PictureCard({ item, saved, onToggle, onOpen }: {
  item: Picture;
  saved: boolean;
  onToggle: (item: Picture) => void;
  onOpen: (item: Picture) => void;
}) {
  return (
    <article className="picture-card">
      <div className="card-image-wrap"><img src={item.url} alt={item.title} loading="lazy" />
        <button className="heart-button" aria-label={saved ? "Remove from favorites" : "Save to favorites"} onClick={() => onToggle(item)}>{saved ? "♥" : "♡"}</button>
      </div>
      <div className="card-copy"><p className="card-date">{prettyDate(item.date)}</p><h3>{item.title}</h3>
        <p className="card-explanation">{item.explanation}</p>
        <button className="card-link" onClick={() => onOpen(item)}>View picture <span>↗</span></button>
      </div>
    </article>
  );
}