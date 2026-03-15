import { ChevronLeft, Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { lakes } from "@/lib/lakes";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lakeId: string; productId: string }>;
}) {
  const { lakeId, productId } = await params;
  const lake = lakes[lakeId];
  const product = lake?.tackle.find((t) => t.id === Number(productId));

  if (!lake || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <p className="text-white text-lg font-semibold">Product not found</p>
        <Link href="/tackle" className="text-sky-400 mt-2 text-sm">← Back to tackle</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <header className="bg-sky-900 px-4 pt-10 pb-5">
        <div className="flex items-center gap-3">
          <Link href={`/lakes/${lakeId}`} className="text-sky-300 active:text-white transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">{product.name}</h1>
            <p className="text-sky-300 text-xs">{product.brand} · Recommended for {lake.name}</p>
          </div>
        </div>
      </header>

      <div className="px-4 pt-5 flex flex-col gap-4">
        {/* Product card */}
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-white font-medium">{product.rating}</span>
              <span className="text-xs text-slate-500">({product.reviews.toLocaleString()} reviews)</span>
            </div>
            <span className="text-lg font-bold text-white">{product.price}</span>
          </div>
          <p className="text-sm text-sky-400">Why we recommend it:</p>
          <p className="text-sm text-slate-300 mt-1">{product.reason}</p>
        </div>

        {/* Buy buttons */}
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Choose where to buy</p>

        <a
          href={product.affiliateUrls.amazon}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-[#FF9900] rounded-2xl px-5 py-4 active:opacity-80 transition-opacity"
        >
          <div>
            <p className="text-black font-bold text-sm">Amazon</p>
            <p className="text-black/70 text-xs mt-0.5">Fast shipping · Prime eligible</p>
          </div>
          <ShoppingCart size={22} className="text-black" />
        </a>

        <a
          href={product.affiliateUrls.basspro}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-orange-700 rounded-2xl px-5 py-4 active:opacity-80 transition-opacity"
        >
          <div>
            <p className="text-white font-bold text-sm">Bass Pro Shops</p>
            <p className="text-orange-200 text-xs mt-0.5">In-store pickup available</p>
          </div>
          <ShoppingCart size={22} className="text-white" />
        </a>

        <p className="text-xs text-slate-600 text-center pb-2">
          LakeReel earns a commission on purchases at no extra cost to you.
        </p>
      </div>
    </div>
  );
}
