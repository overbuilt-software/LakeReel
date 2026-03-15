"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

export default function FavoriteButton({ lakeId }: { lakeId: string }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [favorited, setFavorited] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setChecking(false); return; }

    supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("lake_id", lakeId)
      .maybeSingle()
      .then(({ data }) => {
        setFavorited(!!data);
        setChecking(false);
      });
  }, [user, authLoading, lakeId]);

  async function toggle() {
    if (!user) {
      router.push("/login");
      return;
    }

    if (favorited) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("lake_id", lakeId);
      setFavorited(false);
    } else {
      await supabase.from("favorites").insert({ user_id: user.id, lake_id: lakeId });
      setFavorited(true);
    }
  }

  if (checking) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={toggle}
      className="p-1.5 rounded-full transition-colors active:scale-90"
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        size={22}
        className={favorited ? "fill-red-500 text-red-500" : "text-sky-300"}
        strokeWidth={favorited ? 0 : 1.8}
      />
    </button>
  );
}
