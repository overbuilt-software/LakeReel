import { Search } from "lucide-react";
import { lakes } from "@/lib/lakes";
import LakesList from "@/components/LakesList";

export default function LakesPage() {
  const lakeList = Object.values(lakes);

  return (
    <div>
      <header className="bg-sky-900 px-4 pt-10 pb-5">
        <h1 className="text-xl font-bold text-white mb-4">Find a Lake</h1>
        <div className="flex items-center gap-3 bg-sky-800/60 rounded-xl px-4 py-3 border border-sky-700/50">
          <Search size={18} className="text-sky-400" />
          <span className="text-sky-300 text-sm">Search by lake or city…</span>
        </div>
      </header>

      <LakesList lakes={lakeList} />
    </div>
  );
}
