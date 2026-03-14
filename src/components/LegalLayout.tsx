import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <header className="bg-sky-900 px-4 pt-10 pb-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sky-300 active:text-white transition-colors">
            <ChevronLeft size={22} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">{title}</h1>
            <p className="text-sky-300 text-xs">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </header>
      <div className="px-4 py-5 prose prose-invert prose-sm max-w-none">
        {children}
      </div>
    </div>
  );
}
