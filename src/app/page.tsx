import { MapPin, TrendingUp, Wind, Thermometer, ChevronRight } from "lucide-react";
import Link from "next/link";

const recentReports = [
  {
    id: 1,
    lake: "Lake Tenkiller",
    state: "OK",
    species: "Bass",
    technique: "Topwater frogs",
    rating: 4,
    ago: "2h ago",
    temp: "68°F",
  },
  {
    id: 2,
    lake: "Grand Lake",
    state: "OK",
    species: "Crappie",
    technique: "1/8oz jigs, 15ft",
    rating: 5,
    ago: "4h ago",
    temp: "64°F",
  },
  {
    id: 3,
    lake: "Keystone Lake",
    state: "OK",
    species: "Catfish",
    technique: "Cut bait, bottom",
    rating: 3,
    ago: "6h ago",
    temp: "66°F",
  },
];

function BiteBadge({ rating }: { rating: number }) {
  const labels = ["", "Slow", "Fair", "Good", "Hot", "On Fire"];
  const colors = [
    "",
    "bg-slate-700",
    "bg-yellow-800",
    "bg-green-800",
    "bg-orange-700",
    "bg-red-700",
  ];
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[rating]} text-white`}>
      {labels[rating]}
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="bg-sky-900 px-4 pt-10 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">LakeReel</h1>
            <p className="text-sky-300 text-sm">Find your next bite</p>
          </div>
          <div className="flex items-center gap-1 text-sky-300 text-sm">
            <MapPin size={14} />
            <span>Oklahoma</span>
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

      {/* Conditions Strip */}
      <div className="flex gap-3 px-4 py-3 bg-slate-900 border-b border-slate-800 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 text-xs text-slate-300 whitespace-nowrap">
          <Thermometer size={14} className="text-orange-400" />
          Air: 72°F
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-300 whitespace-nowrap">
          <Wind size={14} className="text-blue-400" />
          Wind: 8 mph SW
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-300 whitespace-nowrap">
          <TrendingUp size={14} className="text-green-400" />
          Solunar: Major 6–8am
        </div>
      </div>

      {/* Recent Reports */}
      <section className="px-4 pt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-white">Recent Reports</h2>
          <Link href="/reports" className="text-sky-400 text-sm flex items-center gap-0.5">
            See all <ChevronRight size={14} />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {recentReports.map((r) => (
            <Link key={r.id} href={`/lakes/${r.id}`}>
              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 active:scale-[0.98] transition-transform">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-white text-sm">{r.lake}</p>
                    <p className="text-xs text-slate-400">{r.state} · {r.ago}</p>
                  </div>
                  <BiteBadge rating={r.rating} />
                </div>
                <div className="flex items-center gap-2 flex-wrap text-xs text-slate-300">
                  <span className="bg-slate-800 rounded-lg px-2 py-1">{r.species}</span>
                  <span className="bg-slate-800 rounded-lg px-2 py-1">{r.technique}</span>
                  <span className="bg-slate-800 rounded-lg px-2 py-1 flex items-center gap-1">
                    <Thermometer size={11} className="text-blue-400" />
                    {r.temp}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tackle CTA */}
      <section className="px-4 pt-5 pb-4">
        <Link href="/tackle">
          <div className="bg-gradient-to-r from-orange-700 to-orange-600 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-white text-sm">Bass are hitting topwater</p>
              <p className="text-orange-200 text-xs mt-0.5">Shop recommended tackle →</p>
            </div>
            <span className="text-2xl">🎣</span>
          </div>
        </Link>
      </section>
    </div>
  );
}
