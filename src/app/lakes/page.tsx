import { MapPin, Search } from "lucide-react";
import Link from "next/link";

const lakes = [
  { id: 1, name: "Lake Tenkiller", state: "OK", acres: "12,900", species: ["Bass", "Crappie", "Catfish"], biteLevel: 4 },
  { id: 2, name: "Grand Lake", state: "OK", acres: "46,500", species: ["Bass", "Walleye", "Crappie"], biteLevel: 5 },
  { id: 3, name: "Keystone Lake", state: "OK", acres: "26,000", species: ["Catfish", "Bass", "Sand Bass"], biteLevel: 3 },
  { id: 4, name: "Lake Eufaula", state: "OK", acres: "102,000", species: ["Bass", "Crappie", "Catfish"], biteLevel: 3 },
  { id: 5, name: "Fort Gibson Lake", state: "OK", acres: "19,200", species: ["Bass", "Crappie"], biteLevel: 2 },
];

const biteColors = ["", "bg-slate-700", "bg-yellow-800", "bg-green-800", "bg-orange-700", "bg-red-700"];
const biteLabels = ["", "Slow", "Fair", "Good", "Hot", "On Fire"];

export default function LakesPage() {
  return (
    <div>
      <header className="bg-sky-900 px-4 pt-10 pb-5">
        <h1 className="text-xl font-bold text-white mb-4">Find a Lake</h1>
        <div className="flex items-center gap-3 bg-sky-800/60 rounded-xl px-4 py-3 border border-sky-700/50">
          <Search size={18} className="text-sky-400" />
          <span className="text-sky-300 text-sm">Search by lake or city…</span>
        </div>
      </header>

      <div className="px-4 pt-4 flex flex-col gap-3">
        {lakes.map((lake) => (
          <Link key={lake.id} href={`/lakes/${lake.id}`}>
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 active:scale-[0.98] transition-transform">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-sky-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white text-sm">{lake.name}</p>
                    <p className="text-xs text-slate-400">{lake.state} · {lake.acres} acres</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${biteColors[lake.biteLevel]} text-white`}>
                  {biteLabels[lake.biteLevel]}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {lake.species.map((s) => (
                  <span key={s} className="bg-slate-800 text-slate-300 text-xs rounded-lg px-2 py-1">{s}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
