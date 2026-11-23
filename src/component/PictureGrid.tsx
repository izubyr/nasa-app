"use client";

import { PictureCard } from "./PictureCard";
import type { Picture } from "./types";

export function PictureGrid({ items, savedDates, onToggle, onOpen, emptyMessage }: {
  items: Picture[];
  savedDates: Set<string>;
  onToggle: (item: Picture) => void;
  onOpen: (item: Picture) => void;
  emptyMessage: string;
}) {
  if (!items.length) return <div className="empty-state">{emptyMessage}</div>;
  return <div className="card-grid">{items.map((item) => <PictureCard key={item.date} item={item} saved={savedDates.has(item.date)} onToggle={onToggle} onOpen={onOpen} />)}</div>;
}
