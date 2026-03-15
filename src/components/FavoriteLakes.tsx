"use client";

import { useEffect, useState } from "react";
import { Heart, MapPin } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { lakes } from "@/lib/lakes";

const biteColors = ["", "bg-slate-700", "bg-yellow-800", "bg-green-800", "bg-orange-700", "bg-red-700"];
const biteLabels = ["", "Slow", "Fair", "Good", "Hot", "On Fire"];

export default function FavoriteLakes() {
  const { user, loading: authLoading } = useAuth();
  const [lakeIds, setLakeIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setLoaded(true); return; }

    supabase
      .from("favorites")
      .select("lake_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setLakeIds((data ?? []).map((f: { lake_id: string }) => f.lake_id));
        setLoaded(true);
      });
  }, [user, authLoading]);

  if (!loaded || lakeIds.length === 0) return null;

  const favLakes = lakeIds.map((id) => lakes[id]).filter(Boolean);
  if (favLakes.length === 0) return null;

  return (
    <section className="px-4 pt-5">
      <div className="flex items-center gap-2 mb-3">
        <Heart size={15} className="text-red-500 fill-red-500" />
        <h2 className="text-base font-semibold text-white">Your Lakes</h2>
      </div>
      <div className="flex flex-col gap-3">
        {favLakes.map((lake) => (
          <Link key={lake.id} href={`/lakes/${lake.id}`}>
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 active:scale-[0.98] transition-transform">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-sky-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm">{lake.name}</p>
                    <p className="text-xs text-slate-400">{lake.state} · {lake.acres} acres</p>
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
        ))}
      </div>
    </section>
  );
}
