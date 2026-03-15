import { Thermometer, Wind, Droplets, ChevronLeft, Plus, Star, ShoppingBag, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { lakes } from "@/lib/lakes";
import { getLiveConditions } from "@/lib/getConditions";
import { supabase } from "@/lib/supabase";
import FavoriteButton from "@/components/FavoriteButton";

export const revalidate = 0;

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const biteColors = ["", "bg-slate-700", "bg-yellow-800", "bg-green-800", "bg-orange-700", "bg-red-700"];
const biteLabels = ["", "Slow", "Fair", "Good", "Hot", "On Fire"];

export default async function LakeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lake = lakes[id];

  if (!lake) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <p className="text-white text-lg font-semibold">Lake not found</p>
        <Link href="/lakes" className="text-sky-400 mt-2 text-sm">← Back to lakes</Link>
      </div>
    );
  }

  const [live, { data: reports }] = await Promise.all([
    getLiveConditions(lake.lat, lake.lon, lake.usgsSiteId),
    supabase.from("reports").select("*").eq("lake_id", lake.id).order("created_at", { ascending: false }).limit(20),
  ]);

  const dynamicBite = reports && reports.length > 0
    ? Math.round(reports.reduce((sum, r) => sum + r.bite_level, 0) / reports.length)
    : null;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="bg-sky-900 px-4 pt-10 pb-5">
        <div className="flex items-center gap-3 mb-3">
          <Link href="/lakes" className="text-sky-300 active:text-white transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">{lake.name}</h1>
            <p className="text-sky-300 text-xs">{lake.state} · {lake.acres} acres · {lake.county} Co.</p>
          </div>
          <FavoriteButton lakeId={lake.id} />
          {dynamicBite && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${biteColors[dynamicBite]} text-white`}>
              {biteLabels[dynamicBite]}
            </span>
          )}
        </div>

        {/* Species tags */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {lake.species.map((s) => (
            <span key={s} className="bg-sky-800/60 border border-sky-700/40 text-sky-200 text-xs rounded-full px-3 py-1 whitespace-nowrap">
              {s}
            </span>
          ))}
        </div>
      </header>

      {/* Live Conditions Grid */}
      <section className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Live Conditions</h2>
          <span className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Live
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex flex-col items-center gap-1">
            <Thermometer size={16} className="text-blue-400" />
            <p className="text-xs text-slate-400">Water</p>
            <p className="text-sm font-bold text-white">{live.waterTemp}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex flex-col items-center gap-1">
            <Thermometer size={16} className="text-orange-400" />
            <p className="text-xs text-slate-400">Air</p>
            <p className="text-sm font-bold text-white">{live.airTemp}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex flex-col items-center gap-1">
            <Wind size={16} className="text-slate-400" />
            <p className="text-xs text-slate-400">Wind</p>
            <p className="text-sm font-bold text-white text-center leading-tight">{live.wind}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex flex-col items-center gap-1">
            <Droplets size={16} className="text-cyan-400" />
            <p className="text-xs text-slate-400">Clarity</p>
            <p className="text-sm font-bold text-white">—</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex flex-col items-center gap-1">
            <TrendingUp size={16} className="text-green-400" />
            <p className="text-xs text-slate-400">Level</p>
            <p className="text-sm font-bold text-white text-center leading-tight">{live.gageHeight}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex flex-col items-center gap-1">
            <Clock size={16} className="text-yellow-400" />
            <p className="text-xs text-slate-400">Max Depth</p>
            <p className="text-sm font-bold text-white">{lake.maxDepth}</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-1.5">Weather via Open-Meteo · Water data via USGS</p>
      </section>

      {/* Tackle Recommendations */}
      <section className="px-4 pt-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Recommended Tackle</h2>
          <Link href="/tackle" className="text-sky-400 text-xs">See all</Link>
        </div>
        <div className="flex flex-col gap-2">
          {lake.tackle.map((p) => (
            <a key={p.id} href={p.affiliateUrl} target="_blank" rel="noopener noreferrer">
              <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center gap-3 active:scale-[0.98] transition-transform">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                  <p className="text-xs text-sky-400 truncate">Because: {p.reason}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={10} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-slate-400">{p.rating} ({p.reviews.toLocaleString()})</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-sm font-bold text-white">{p.price}</span>
                  <div className="flex items-center gap-1 bg-orange-600 rounded-lg px-2.5 py-1">
                    <ShoppingBag size={12} className="text-white" />
                    <span className="text-xs font-semibold text-white">Buy</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Reports */}
      <section className="px-4 pt-5 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Fishing Reports</h2>
          <Link
            href={`/reports/submit?lake=${encodeURIComponent(lake.name)}`}
            className="flex items-center gap-1 bg-sky-700 rounded-lg px-3 py-1.5 text-xs font-semibold text-white active:bg-sky-600 transition-colors"
          >
            <Plus size={13} />
            Add Report
          </Link>
        </div>

        {!reports || reports.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-center">
            <p className="text-slate-400 text-sm">No reports yet for this lake.</p>
            <p className="text-slate-500 text-xs mt-1">Be the first to report!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {reports.map((r) => (
              <div key={r.id} className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{r.species}</p>
                    <p className="text-xs text-slate-400">{r.author} · {timeAgo(r.created_at)}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${biteColors[r.bite_level] ?? "bg-slate-700"} text-white`}>
                    {biteLabels[r.bite_level] ?? "—"}
                  </span>
                </div>
                {r.notes && <p className="text-xs text-slate-300 leading-relaxed mb-3">{r.notes}</p>}
                <div className="flex gap-2 flex-wrap text-xs">
                  <span className="bg-slate-800 text-slate-300 rounded-lg px-2 py-1">{r.technique}</span>
                  {r.bait && <span className="bg-slate-800 text-slate-300 rounded-lg px-2 py-1">{r.bait}</span>}
                  {r.depth && <span className="bg-slate-800 text-slate-300 rounded-lg px-2 py-1">Depth: {r.depth}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
