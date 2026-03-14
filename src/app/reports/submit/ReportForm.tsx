"use client";

import { useState } from "react";
import { ChevronLeft, ChevronDown, CheckCircle } from "lucide-react";
import Link from "next/link";
import { lakes } from "@/lib/lakes";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

const speciesOptions = [
  "Largemouth Bass", "Smallmouth Bass", "Spotted Bass",
  "Crappie", "Bluegill", "Catfish", "Walleye",
  "White Bass", "Sand Bass", "Striped Bass", "Other",
];

const techniqueOptions = [
  "Topwater", "Crankbait", "Jig", "Swimbait", "Spinnerbait",
  "Texas Rig", "Drop Shot", "Carolina Rig", "Live Bait", "Cut Bait",
  "Fly Fishing", "Trolling", "Other",
];

const biteLabels = ["", "Slow", "Fair", "Good", "Hot", "On Fire 🔥"];
const biteColors = [
  "",
  "border-slate-600 text-slate-400",
  "border-yellow-700 text-yellow-400",
  "border-green-700 text-green-400",
  "border-orange-600 text-orange-400",
  "border-red-600 text-red-400",
];
const biteActiveColors = [
  "",
  "bg-slate-700 border-slate-500 text-white",
  "bg-yellow-800 border-yellow-600 text-white",
  "bg-green-800 border-green-600 text-white",
  "bg-orange-700 border-orange-500 text-white",
  "bg-red-700 border-red-500 text-white",
];

export default function ReportForm({ defaultLake }: { defaultLake: string }) {
  const { user } = useAuth();
  const lakeList = Object.values(lakes);
  const defaultAuthor = user?.user_metadata?.display_name ?? "";

  const [lake, setLake] = useState(defaultLake);
  const [author, setAuthor] = useState(defaultAuthor);
  const [species, setSpecies] = useState("");
  const [technique, setTechnique] = useState("");
  const [bait, setBait] = useState("");
  const [depth, setDepth] = useState("");
  const [biteLevel, setBiteLevel] = useState(0);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lakeObj = lakeList.find((l) => l.name === lake);
  const isValid = lake && species && technique && bait && biteLevel > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError("");

    const { error: sbError } = await supabase.from("reports").insert({
      lake_id: lakeObj?.id ?? lake,
      lake_name: lake,
      author: author.trim() || "Anonymous",
      species,
      technique,
      bait,
      depth: depth || null,
      water_clarity: null,
      bite_level: biteLevel,
      notes: notes || null,
      user_id: user?.id ?? null,
    });

    setLoading(false);
    if (sbError) {
      console.error("Supabase insert error:", sbError);
      setError(`Error: ${sbError.message}`);
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <CheckCircle size={56} className="text-green-400 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Report Submitted!</h2>
        <p className="text-slate-400 text-sm mb-6">
          Thanks for helping fellow anglers. Your report for <strong className="text-white">{lake}</strong> is live.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link
            href="/reports"
            className="bg-sky-700 text-white text-sm font-semibold rounded-xl py-3 text-center active:bg-sky-600 transition-colors"
          >
            View All Reports
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setAuthor("");
              setSpecies("");
              setTechnique("");
              setBait("");
              setDepth("");
              setBiteLevel(0);
              setNotes("");
              setError("");
            }}
            className="border border-slate-700 text-slate-300 text-sm font-semibold rounded-xl py-3 active:bg-slate-800 transition-colors"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <header className="bg-sky-900 px-4 pt-10 pb-5">
        <div className="flex items-center gap-3">
          <Link href="/reports" className="text-sky-300 active:text-white transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Submit a Report</h1>
            <p className="text-sky-300 text-xs">Help fellow anglers find the bite</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-4 pt-5 flex flex-col gap-5 pb-6">

        {/* Lake */}
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 block">
            Lake *
          </label>
          <div className="relative">
            <select
              value={lake}
              onChange={(e) => setLake(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm appearance-none focus:outline-none focus:border-sky-500"
            >
              <option value="">Select a lake…</option>
              {lakeList.map((l) => (
                <option key={l.id} value={l.name}>{l.name}, {l.state}</option>
              ))}
              <option value="Other">Other / Not Listed</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Author */}
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 block">
            Your Name (optional)
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g. Jason D. or leave blank for Anonymous"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Species */}
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 block">
            Species *
          </label>
          <div className="flex flex-wrap gap-2">
            {speciesOptions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpecies(s)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                  species === s
                    ? "bg-sky-700 border-sky-500 text-white"
                    : "border-slate-700 text-slate-400 active:bg-slate-800"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Technique */}
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 block">
            Technique *
          </label>
          <div className="flex flex-wrap gap-2">
            {techniqueOptions.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTechnique(t)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                  technique === t
                    ? "bg-sky-700 border-sky-500 text-white"
                    : "border-slate-700 text-slate-400 active:bg-slate-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Bait */}
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 block">
            Bait / Lure *
          </label>
          <input
            type="text"
            value={bait}
            onChange={(e) => setBait(e.target.value)}
            placeholder="e.g. Chartreuse 3/8oz jig, Zoom fluke, nightcrawler"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Depth */}
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 block">
            Depth (optional)
          </label>
          <input
            type="text"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            placeholder="e.g. 8–12ft"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Bite Level */}
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 block">
            Bite Level *
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setBiteLevel(level)}
                className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                  biteLevel === level ? biteActiveColors[level] : biteColors[level]
                }`}
              >
                {biteLabels[level]}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 block">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Where on the lake, time of day, water color, anything helpful…"
            rows={3}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500 resize-none"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || loading}
          className={`w-full py-4 rounded-2xl text-sm font-bold transition-colors ${
            isValid && !loading
              ? "bg-sky-600 text-white active:bg-sky-500"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Submitting…" : "Submit Report"}
        </button>

        <p className="text-xs text-slate-600 text-center -mt-2">
          Reports are public and visible to all anglers on LakeReel.
        </p>
      </form>
    </div>
  );
}
