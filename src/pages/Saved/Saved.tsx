import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { SearchX, SquarePen } from "lucide-react";
import { FilterBar } from "../../components/Saved/SavedUI";
import { ResourceCard } from "../../components/Saved/ResourceCard";


export default function Saved() {
  const [savedResources, setSavedResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("Titles");

  const tabs = ["Titles", "Following", "Lists", "Notebook", "History"];

  useEffect(() => {
    let isMounted = true;
    const initializePage = async () => {
      try {
        const res = await api.get("/users/me");
        if (!isMounted) return;

        const userData = res?.user ?? res?.data?.user;
        if (userData?.id) {
          setIsAuthenticated(true);
          const libraryRes = await api.get("/users/library");
          const libraryData = libraryRes?.data?.data ?? libraryRes?.data ?? libraryRes ?? [];
          setSavedResources(Array.isArray(libraryData) ? libraryData : []);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        if (isMounted) setIsAuthenticated(false);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    initializePage();
    return () => { isMounted = false; };
  }, []);

  const handleToggleSave = async (id: number) => {
    try {
      const res = await api.post(`/users/resources/${id}/save`, {});
      if (!res?.saved) {
        setSavedResources((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Toggle save failed:", err);
    }
  };

  if (isLoading || isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 animate-pulse">loading session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 text-center">only for logged user</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-nature-bg text-nature-bg dark:text-nature-cream font-mono">
      <header className="flex justify-between items-center px-6 py-4 border-b border-nature-sage/10">
        <h1 className="text-xl font-black uppercase tracking-tighter">Saved</h1>
        <button className="p-2 border-2 border-nature-sage/30 rounded-xl hover:bg-nature-sage hover:text-nature-bg transition-all">
          <SquarePen size={22} />
        </button>
      </header>

      <FilterBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="p-6 pb-24">
        {savedResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {savedResources.map((item) => (
              <ResourceCard key={item.id} item={item} onToggleSave={handleToggleSave} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center opacity-20">
            <SearchX size={64} className="mb-4" />
            <h2 className="text-xl font-black uppercase tracking-widest">Library Empty</h2>
          </div>
        )}
      </main>
    </div>
  );
}