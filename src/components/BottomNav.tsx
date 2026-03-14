"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, FileText, ShoppingBag, User } from "lucide-react";

const navItems = [
  { href: "/",        label: "Home",    icon: Home },
  { href: "/lakes",   label: "Lakes",   icon: MapPin },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/tackle",  label: "Tackle",  icon: ShoppingBag },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                active ? "text-sky-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
