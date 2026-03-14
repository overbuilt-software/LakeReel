"use client";

import { useEffect, useState } from "react";
import { MapPin, Thermometer, Wind, TrendingUp } from "lucide-react";
import Link from "next/link";

function getStateName(lat: number, lon: number): string {
  if (lat >= 36.0 && lat <= 40.6 && lon >= -95.8 && lon <= -89.1) return "Missouri";
  if (lat >= 33.6 && lat <= 37.1 && lon >= -103.0 && lon <= -94.4) return "Oklahoma";
  if (lat >= 35.0 && lat <= 36.5 && lon >= -90.3 && lon <= -81.6) return "Tennessee";
  if (lat >= 30.2 && lat <= 35.0 && lon >= -94.0 && lon <= -88.1) return "Arkansas";
  if (lat >= 33.0 && lat <= 35.0 && lon >= -88.5 && lon <= -84.9) return "Alabama";
  return "Nearby";
}

export default function HomeClient() {
  const [location, setLocation] = useState("Locating…");
  const [airTemp, setAirTemp] = useState<string | null>(null);
  const [wind, setWind] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Unknown");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        setLocation(getStateName(lat, lon));
        try {
          const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
          if (res.ok) {
            const data = await res.json();
            setAirTemp(data.airTemp ?? null);
            setWind(data.wind ?? null);
          }
        } catch {
          // silently ignore
        }
      },
      () => setLocation("Unknown")
    );
  }, []);

  return (
    <>
      {/* Header */}
      <header className="bg-sky-900 px-4 pt-10 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">LakeReel</h1>
            <p className="text-sky-300 text-sm">Find your next bite</p>
          </div>
          <div className="flex items-center gap-1 text-sky-300 text-sm">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
        </div>

        {/* Search */}
        <Link href="/lakes">
          <div className="flex items-center gap-3 bg-sky-800/60 rounded-xl px-4 py-3 border border-sky-700/50">
            <MapPin size={18} className="text-sky-400" />
            <span className="text-sky-300 text-sm">Search lakes near you…</span>
          </div>
        </Link>
      </header>

      {/* Conditions strip */}
      <div className="flex gap-3 px-4 py-3 bg-slate-900 border-b border-slate-800 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 text-xs text-slate-300 whitespace-nowrap">
          <Thermometer size={14} className="text-orange-400" />
          Air: {airTemp ?? "—"}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-300 whitespace-nowrap">
          <Wind size={14} className="text-blue-400" />
          Wind: {wind ?? "—"}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-300 whitespace-nowrap">
          <TrendingUp size={14} className="text-green-400" />
          Solunar: Major 6–8am
        </div>
      </div>
    </>
  );
}
