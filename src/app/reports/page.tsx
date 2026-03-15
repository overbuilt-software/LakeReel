import { Clock, Fish } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

const biteColors = ["", "bg-slate-700", "bg-yellow-800", "bg-green-800", "bg-orange-700", "bg-red-700"];
const biteLabels = ["", "Slow", "Fair", "Good", "Hot", "On Fire"];

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default async function ReportsPage() {
  const { data: reports, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div>
      <header className="bg-sky-900 px-4 pt-10 pb-5">
        <h1 className="text-xl font-bold text-white">Fishing Reports</h1>
        <p className="text-sky-300 text-sm mt-1">Latest from anglers on the water</p>
      </header>

      <div className="px-4 pt-4 flex flex-col gap-4 pb-6">
        {error && (
          <p className="text-red-400 text-sm text-center py-8">Failed to load reports.</p>
        )}

        {!error && reports?.length === 0 && (
          <p className="text-slate-400 text-sm text-center py-8">No reports yet — be the first!</p>
        )}

        {reports?.map((r) => (
          <div key={r.id} className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-white text-sm">{r.lake_name}</p>
                <p className="text-xs text-slate-400">reported by {r.author}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${biteColors[r.bite_level] ?? "bg-slate-700"} text-white`}>
                {biteLabels[r.bite_level] ?? "—"}
              </span>
            </div>

            {r.notes && (
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">{r.notes}</p>
            )}

            <div className="flex gap-2 flex-wrap text-xs">
              <span className="bg-slate-800 text-slate-300 rounded-lg px-2 py-1 flex items-center gap-1">
                <Fish size={11} className="text-sky-400" />
                {r.species}
              </span>
              <span className="bg-slate-800 text-slate-300 rounded-lg px-2 py-1">{r.technique}</span>
              {r.bait && (
                <span className="bg-slate-800 text-slate-300 rounded-lg px-2 py-1">{r.bait}</span>
              )}
              {r.depth && (
                <span className="bg-slate-800 text-slate-300 rounded-lg px-2 py-1">{r.depth}</span>
              )}
              <span className="bg-slate-800 text-slate-300 rounded-lg px-2 py-1 flex items-center gap-1">
                <Clock size={11} className="text-slate-400" />
                {timeAgo(r.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
