"use client";

import { useEffect, useState } from "react";
import { MapPin, Navigation, Search } from "lucide-react";
import Link from "next/link";
import { type Lake } from "@/lib/lakes";

const biteColors = ["", "bg-slate-700", "bg-yellow-800", "bg-green-800", "bg-orange-700", "bg-red-700"];
const biteLabels = ["", "Slow", "Fair", "Good", "Hot", "On Fire"];

function distanceMiles(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function LakesList({ lakes }: { lakes: Lake[] }) {
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLon, setUserLon] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLon(pos.coords.longitude);
      },
      () => {} // silently ignore if denied
    );
  }, []);

  const lat = userLat;
  const lon = userLon;

  const filtered = query.trim()
    ? lakes.filter((l) =>
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.state.toLowerCase().includes(query.toLowerCase()) ||
        l.county.toLowerCase().includes(query.toLowerCase())
      )
    : lakes;

  const sorted = lat !== null && lon !== null
    ? [...filtered].sort((a, b) =>
        distanceMiles(lat, lon, a.lat, a.lon) -
        distanceMiles(lat, lon, b.lat, b.lon)
      )
    : filtered;

  return (
    <div className="px-4 pt-4 flex flex-col gap-3 pb-6">
      <div className="flex items-center gap-3 bg-slate-900 rounded-xl px-4 py-3 border border-slate-800">
        <Search size={16} className="text-slate-500 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by lake, state, or county…"
          className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-600 focus:outline-none"
        />
      </div>
      {lat !== null && (
        <div className="flex items-center gap-1.5 text-xs text-sky-400 mb-1">
          <Navigation size={12} />
          Sorted by distance from you
        </div>
      )}

      {sorted.length === 0 && (
        <p className="text-slate-500 text-sm text-center py-8">No lakes found for "{query}"</p>
      )}

      {sorted.map((lake) => {
        const miles = lat !== null && lon !== null
          ? Math.round(distanceMiles(lat, lon, lake.lat, lake.lon))
          : null;

        return (
          <Link key={lake.id} href={`/lakes/${lake.id}`}>
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 active:scale-[0.98] transition-transform">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-sky-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm">{lake.name}</p>
                    <p className="text-xs text-slate-400">
                      {lake.state} · {lake.acres} acres
                      {miles !== null ? ` · ${miles} mi away` : ""}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${biteColors[lake.biteLevel]} text-white shrink-0`}>
                  {biteLabels[lake.biteLevel]}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {lake.species.slice(0, 3).map((s) => (
                  <span key={s} className="bg-slate-800 text-slate-300 text-xs rounded-lg px-2 py-1">{s}</span>
                ))}
                {lake.species.length > 3 && (
                  <span className="bg-slate-800 text-slate-500 text-xs rounded-lg px-2 py-1">+{lake.species.length - 3} more</span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
