import { lakes } from "@/lib/lakes";
import LakesList from "@/components/LakesList";

export default function LakesPage() {
  const lakeList = Object.values(lakes);

  return (
    <div>
      <header className="bg-sky-900 px-4 pt-10 pb-5">
        <h1 className="text-xl font-bold text-white">Find a Lake</h1>
      </header>

      <LakesList lakes={lakeList} />
    </div>
  );
}
