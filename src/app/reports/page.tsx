import { Thermometer, Clock } from "lucide-react";

const reports = [
  { id: 1, lake: "Lake Tenkiller", state: "OK", species: "Bass", technique: "Topwater frogs, early morning", depth: "2–4ft", waterTemp: "68°F", rating: 4, user: "TroublinTrout", ago: "2h ago", notes: "Schooling on the north end near the bluffs. Top frogs working great at first light." },
  { id: 2, lake: "Grand Lake", state: "OK", species: "Crappie", technique: "1/8oz tube jigs", depth: "12–18ft", waterTemp: "64°F", rating: 5, user: "OkieFisher", ago: "4h ago", notes: "Limits in 2 hours drifting the main channel near the bridge." },
  { id: 3, lake: "Keystone Lake", state: "OK", species: "Catfish", technique: "Cut shad, bottom rig", depth: "20ft", waterTemp: "66°F", rating: 3, user: "CatDaddy99", ago: "6h ago", notes: "Slow but steady. 3 fish over 8lbs in the evening bite." },
];

const biteColors = ["", "bg-slate-700", "bg-yellow-800", "bg-green-800", "bg-orange-700", "bg-red-700"];
const biteLabels = ["", "Slow", "Fair", "Good", "Hot", "On Fire"];

export default function ReportsPage() {
  return (
    <div>
      <header className="bg-sky-900 px-4 pt-10 pb-5">
        <h1 className="text-xl font-bold text-white">Fishing Reports</h1>
        <p className="text-sky-300 text-sm mt-1">Latest from anglers on the water</p>
      </header>

      <div className="px-4 pt-4 flex flex-col gap-4">
        {reports.map((r) => (
          <div key={r.id} className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-white text-sm">{r.lake}</p>
                <p className="text-xs text-slate-400">{r.state} · reported by {r.user}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${biteColors[r.rating]} text-white`}>
                {biteLabels[r.rating]}
              </span>
            </div>

            <p className="text-xs text-slate-300 mb-3 leading-relaxed">{r.notes}</p>

            <div className="flex gap-2 flex-wrap text-xs">
              <span className="bg-slate-800 text-slate-300 rounded-lg px-2 py-1">{r.species}</span>
              <span className="bg-slate-800 text-slate-300 rounded-lg px-2 py-1">{r.technique}</span>
              <span className="bg-slate-800 text-slate-300 rounded-lg px-2 py-1 flex items-center gap-1">
                <Thermometer size={11} className="text-blue-400" />
                {r.waterTemp}
              </span>
              <span className="bg-slate-800 text-slate-300 rounded-lg px-2 py-1 flex items-center gap-1">
                <Clock size={11} className="text-slate-400" />
                {r.ago}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
