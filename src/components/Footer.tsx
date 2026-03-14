import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 border-t border-slate-800 px-4 py-6 text-center">
      <p className="text-xs text-slate-500 mb-2">
        © {year} Overbuilt Software LLC. All rights reserved.
      </p>
      <p className="text-xs text-slate-600 mb-3">
        LakeReel is a product of Overbuilt Software LLC.
      </p>
      <div className="flex justify-center gap-4 text-xs text-slate-500">
        <Link href="/legal/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
        <Link href="/legal/terms" className="hover:text-slate-300 transition-colors">Terms of Use</Link>
        <Link href="/legal/affiliate" className="hover:text-slate-300 transition-colors">Affiliate Disclosure</Link>
      </div>
    </footer>
  );
}
