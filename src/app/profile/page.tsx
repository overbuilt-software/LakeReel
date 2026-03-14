"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

type Report = {
  id: string;
  lake_name: string;
  lake_id: string;
  species: string;
  technique: string;
  bait: string | null;
  bite_level: number;
  notes: string | null;
  created_at: string;
};

const biteColors = ["", "bg-slate-700", "bg-yellow-800", "bg-green-800", "bg-orange-700", "bg-red-700"];
const biteLabels = ["", "Slow", "Fair", "Good", "Hot", "On Fire"];

function timeAgo(ts: string) {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const displayName = user?.user_metadata?.display_name ?? user?.email?.split("@")[0] ?? "Angler";

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    setReportsLoading(true);
    supabase
      .from("reports")
      .select("id, lake_name, lake_id, species, technique, bait, bite_level, notes, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setReports(data ?? []);
        setReportsLoading(false);
      });
  }, [user]);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400 text-sm">Loading…</p>
      </div>
    );
  }

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col pb-6">
      <header className="bg-sky-900 px-4 pt-10 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-sky-700 flex items-center justify-center text-2xl font-bold text-white">
              {initial}
            </div>
            <div>
              <p className="font-bold text-white text-lg">{displayName}</p>
              <p className="text-sky-300 text-xs">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-sky-300 text-sm active:text-white transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </header>

      {/* My Reports */}
      <section className="px-4 pt-5">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={16} className="text-sky-400" />
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">My Reports</h2>
        </div>

        {reportsLoading ? (
          <p className="text-slate-500 text-sm text-center py-6">Loading reports…</p>
        ) : reports.length === 0 ? (
          <div className="text-center py-8">
            <User size={36} className="text-slate-700 mx-auto mb-3" />
            <p className="text-slate-400 text-sm mb-1">No reports yet</p>
            <p className="text-slate-600 text-xs mb-4">Submit a report to see it here</p>
            <Link
              href="/reports/submit"
              className="bg-sky-700 text-white text-sm font-semibold rounded-xl px-5 py-2.5 inline-block active:bg-sky-600 transition-colors"
            >
              Submit a Report
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {reports.map((r) => (
              <Link key={r.id} href={`/lakes/${r.lake_id}`}>
                <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 active:scale-[0.98] transition-transform">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-white text-sm">{r.lake_name}</p>
                      <p className="text-xs text-slate-500">{timeAgo(r.created_at)}</p>
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
                  {r.notes && <p className="text-xs text-slate-500 mt-2 line-clamp-2">{r.notes}</p>}
                </div>
              </Link>
            ))}
            <Link
              href="/reports/submit"
              className="bg-sky-700 text-white text-sm font-semibold rounded-xl py-3 text-center active:bg-sky-600 transition-colors block mt-1"
            >
              Submit Another Report
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
