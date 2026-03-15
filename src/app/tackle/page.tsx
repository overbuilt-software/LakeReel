import { ShoppingCart, Star } from "lucide-react";
import { amazonUrl } from "@/lib/lakes";

const products = [
  {
    id: 1,
    name: "BOOYAH Pad Crasher Frog",
    brand: "BOOYAH",
    price: "$8.99",
    rating: 4.7,
    reviews: 1243,
    reason: "Bass hitting topwater on Tenkiller",
    tag: "Trending",
    asin: null, bassproUrl: null,
  },
  {
    id: 2,
    name: "Strike King KVD 1.5 Crankbait",
    brand: "Strike King",
    price: "$11.49",
    rating: 4.8,
    reviews: 876,
    reason: "Pre-spawn bass on Grand Lake",
    tag: "Top Pick",
    asin: null, bassproUrl: null,
  },
  {
    id: 3,
    name: "Bobby Garland Crappie Baby",
    brand: "Bobby Garland",
    price: "$4.99",
    rating: 4.6,
    reviews: 2104,
    reason: "Crappie on jigs reported at Grand Lake",
    tag: "Best Seller",
    asin: null, bassproUrl: null,
  },
  {
    id: 4,
    name: "Berkley Gulp! Catfish Dough",
    brand: "Berkley",
    price: "$6.99",
    rating: 4.4,
    reviews: 543,
    reason: "Catfish biting on Keystone",
    tag: null,
    asin: null, bassproUrl: null,
  },
];

const tagColors: Record<string, string> = {
  Trending: "bg-orange-700",
  "Top Pick": "bg-sky-700",
  "Best Seller": "bg-green-800",
};

export default function TacklePage() {
  return (
    <div>
      <header className="bg-sky-900 px-4 pt-10 pb-5">
        <h1 className="text-xl font-bold text-white">Tackle Shop</h1>
        <p className="text-sky-300 text-sm mt-1">Recommended based on what&apos;s biting now</p>
      </header>

      <div className="px-4 pt-4 flex flex-col gap-3">
        {products.map((p) => (
          <div key={p.id} className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1 pr-2">
                <p className="font-semibold text-white text-sm">{p.name}</p>
                <p className="text-xs text-slate-400">{p.brand}</p>
              </div>
              {p.tag && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColors[p.tag]} text-white whitespace-nowrap`}>
                  {p.tag}
                </span>
              )}
            </div>

            <p className="text-xs text-sky-400 mb-2">Because: {p.reason}</p>

            <div className="flex items-center gap-1.5 mb-3">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-white font-medium">{p.rating}</span>
              <span className="text-xs text-slate-500">({p.reviews.toLocaleString()})</span>
              <span className="text-xs text-white font-bold ml-auto">{p.price}</span>
            </div>

            {(p.asin || p.bassproUrl) && (
              <div className="flex gap-2">
                {p.asin && (
                  <a
                    href={amazonUrl(p.asin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#FF9900] rounded-xl py-2.5 active:opacity-80 transition-opacity"
                  >
                    <ShoppingCart size={13} className="text-black" />
                    <span className="text-xs font-bold text-black">Amazon</span>
                  </a>
                )}
                {p.bassproUrl && (
                  <a
                    href={p.bassproUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-orange-700 rounded-xl py-2.5 active:opacity-80 transition-opacity"
                  >
                    <ShoppingCart size={13} className="text-white" />
                    <span className="text-xs font-bold text-white">Bass Pro</span>
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-slate-600 px-4 pt-4 pb-2">
        LakeReel earns a commission on purchases. Prices from Bass Pro Shops.
      </p>
    </div>
  );
}
