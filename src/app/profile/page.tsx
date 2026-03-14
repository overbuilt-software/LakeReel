import { MapPin, Fish, FileText, Bell, ChevronRight, Settings } from "lucide-react";

const savedLakes = [
  { name: "Lake Tenkiller", state: "OK" },
  { name: "Grand Lake", state: "OK" },
];

const menuItems = [
  { icon: Bell, label: "Bite Alerts", desc: "Get notified when fish are biting" },
  { icon: MapPin, label: "Saved Lakes", desc: "2 lakes saved" },
  { icon: Fish, label: "My Catches", desc: "Log and track your catches" },
  { icon: FileText, label: "My Reports", desc: "Reports you've submitted" },
  { icon: Settings, label: "Settings", desc: "Notifications, location, account" },
];

export default function ProfilePage() {
  return (
    <div>
      <header className="bg-sky-900 px-4 pt-10 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-sky-700 flex items-center justify-center text-2xl font-bold text-white">
            A
          </div>
          <div>
            <p className="font-bold text-white text-lg">Angler</p>
            <p className="text-sky-300 text-sm">Sign in to save lakes & get alerts</p>
          </div>
        </div>
      </header>

      {/* Saved Lakes */}
      <section className="px-4 pt-5">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Saved Lakes</h2>
        <div className="flex gap-2 flex-wrap">
          {savedLakes.map((l) => (
            <div key={l.name} className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
              <MapPin size={13} className="text-sky-400" />
              <span className="text-sm text-white">{l.name}</span>
              <span className="text-xs text-slate-500">{l.state}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="px-4 pt-5">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 divide-y divide-slate-800">
          {menuItems.map(({ icon: Icon, label, desc }) => (
            <button key={label} className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-slate-800 transition-colors">
              <Icon size={18} className="text-sky-400 shrink-0" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
              <ChevronRight size={16} className="text-slate-600" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
