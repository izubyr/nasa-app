"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PageView } from "./types";

export function SiteHeader({ view, onDate }: { view: PageView; onDate: (date: string) => void }) {
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    setMaxDate(today.toISOString().slice(0, 10));
  }, []);

  return (
    <header className="topbar">
      <Link className="brand" href="/"><span className="brand-mark">✦</span><span>COSMOS</span></Link>
      <nav aria-label="Main navigation">
        <Link className={`nav-link ${view === "today" ? "active" : ""}`} href="/">Today</Link>
        <Link className={`nav-link ${view === "explore" ? "active" : ""}`} href="/explore">Explore</Link>
        <Link className={`nav-link ${view === "favorites" ? "active" : ""}`} href="/favorites">Favorites</Link>
      </nav>
      <label className="date-picker"><span>▦</span><span className="date-label">Select date</span>
        <input aria-label="Select a picture date" type="date" max={maxDate} onChange={(event) => onDate(event.target.value)} />
      </label>
    </header>
  );
}
