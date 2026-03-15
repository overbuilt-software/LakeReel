import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import HomeClient from "@/components/HomeClient";
import NearbyReports from "@/components/NearbyReports";
import FavoriteLakes from "@/components/FavoriteLakes";

export const revalidate = 0;

export default async function HomePage() {
  const { data: reports } = await supabase
    .from("reports")
    .select("id, lake_id, lake_name, author, species, technique, bait, bite_level")
    .order("created_at", { ascending: false })
    .limit(30);

  return (
    <div className="flex flex-col">
      {/* Header + conditions strip (client — needs geolocation) */}
      <HomeClient />

      {/* Favorite Lakes (only shown when logged in with favorites) */}
      <FavoriteLakes />

      {/* Recent Reports */}
      <section className="px-4 pt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-white">Recent Reports</h2>
          <Link href="/reports" className="text-sky-400 text-sm flex items-center gap-0.5">
            See all <ChevronRight size={14} />
          </Link>
        </div>

        <NearbyReports reports={reports ?? []} />
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
