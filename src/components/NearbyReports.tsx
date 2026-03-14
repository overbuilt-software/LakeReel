"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lakes } from "@/lib/lakes";

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

type Report = {
  id: string;
  lake_id: string;
  lake_name: string;
  author: string;
  species: string;
  technique: string;
  bait: string | null;
  bite_level: number;
};

export default function NearbyReports({ reports }: { reports: Report[] }) {
  const [sorted, setSorted] = useState(reports.slice(0, 5));
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude: lat, longitude: lon } = pos.coords;

      const withDistance = reports
        .map((r) => {
          const lake = lakes[r.lake_id];
          const miles = lake ? distanceMiles(lat, lon, lake.lat, lake.lon) : Infinity;
          return { ...r, miles };
        })
        .sort((a, b) => a.miles - b.miles);

      setSorted(withDistance.slice(0, 5));
      setIsNearby(true);
    });
  }, [reports]);

  return (
    <div className="flex flex-col gap-3">
      {sorted.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-6">No reports yet — be the first!</p>
      ) : (
        sorted.map((r) => (
          <Link key={r.id} href={`/lakes/${r.lake_id}`}>
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 active:scale-[0.98] transition-transform">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-white text-sm">{r.lake_name}</p>
                  <p className="text-xs text-slate-400">{r.author}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${biteColors[r.bite_level] ?? "bg-slate-700"} text-white`}>
                  {biteLabels[r.bite_level] ?? "—"}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-xs text-slate-300">
                <span className="bg-slate-800 rounded-lg px-2 py-1">{r.species}</span>
                <span className="bg-slate-800 rounded-lg px-2 py-1">{r.technique}</span>
                {r.bait && <span className="bg-slate-800 rounded-lg px-2 py-1">{r.bait}</span>}
              </div>
            </div>
          </Link>
        ))
      )}
      {isNearby && (
        <p className="text-xs text-sky-400 text-center -mt-1">Sorted by nearest lake to you</p>
      )}
    </div>
  );
}
