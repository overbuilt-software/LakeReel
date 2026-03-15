"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Fish, Heart, FileText, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/profile";
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Check your email to confirm your account, then sign in.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push(redirectTo);
      }
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-sky-900 px-4 pt-10 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Fish size={22} className="text-sky-300" />
          <h1 className="text-xl font-bold text-white">LakeReel</h1>
        </div>
        <p className="text-sky-300 text-sm">
          {mode === "login" ? "Sign in to your account" : "Create your angler profile"}
        </p>
      </header>

      <div className="px-4 pt-6 flex flex-col gap-4">
        <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
          <button
            onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
              mode === "login" ? "bg-sky-700 text-white" : "text-slate-400"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode("signup"); setError(""); setSuccess(""); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
              mode === "signup" ? "bg-sky-700 text-white" : "text-slate-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        {mode === "signup" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle size={15} className="text-green-400 shrink-0" />
              <p className="text-sm font-semibold text-white">Free — always</p>
            </div>
            <div className="flex items-start gap-2">
              <FileText size={15} className="text-sky-400 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300">Submit fishing reports and share what's biting with other anglers</p>
            </div>
            <div className="flex items-start gap-2">
              <Heart size={15} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300">Save favorite lakes to your profile for quick access</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 block">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. LakeBoss_MO"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              required
              minLength={6}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {success && <p className="text-green-400 text-sm text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl text-sm font-bold bg-sky-600 text-white active:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 transition-colors"
          >
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
