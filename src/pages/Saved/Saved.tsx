import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { SearchX, SquarePen, Search, Settings2 } from "lucide-react";
import { ResourceCard } from "../../components/Saved/ResourceCard";

export default function Saved() {
  const [savedResources, setSavedResources] = useState<any[]>([]);
  const [filteredResources, setFilteredResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  
  useEffect(() => {
    const q = query.toLowerCase().trim();

    const filtered = savedResources.filter((item) => {
      return (
        item.name?.toLowerCase().includes(q) ||
        item.creator?.toLowerCase().includes(q) ||
        item.category_name?.toLowerCase().includes(q)
      );
    });

    setFilteredResources(filtered);
  }, [query, savedResources]);

  useEffect(() => {
    let isMounted = true;

    const initializePage = async () => {
      try {
        const res = await api.get("/users/me");
        if (!isMounted) return;

        const userData = res?.user ?? res?.data?.user;

        if (userData?.id) {

          const libraryRes = await api.get("/users/library");

          const libraryData =
            libraryRes?.data?.data ?? libraryRes?.data ?? libraryRes ?? [];

          const safe = Array.isArray(libraryData) ? libraryData : [];

          setSavedResources(safe);
          setFilteredResources(safe);
        } 
      } catch {
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initializePage();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleSave = async (id: number) => {
    try {
      const res = await api.post(`/users/resources/${id}/save`, {});
      if (!res?.saved) {
        setSavedResources((prev) =>
          prev.filter((item) => item.id !== id)
        );
      }
    } catch (err) {
      console.error("Toggle save failed:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-6">

        {/* header skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-32 bg-nature-cream/10 rounded animate-pulse" />
          <div className="h-10 w-10 bg-nature-cream/10 rounded-xl animate-pulse" />
        </div>

        {/* search skeleton */}
        <div className="h-14 w-full bg-nature-cream/10 rounded-xl animate-pulse mb-8" />

        {/* grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="p-4 border border-nature-cream/10 rounded-xl space-y-3"
            >
              <div className="h-32 w-full bg-nature-cream/10 rounded-lg animate-pulse" />
              <div className="h-4 w-3/4 bg-nature-cream/10 rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-nature-cream/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-nature-bg text-nature-bg dark:text-nature-cream font-mono">
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-nature-sage/10">
        <h1 className="text-xl font-black uppercase tracking-tighter">
          Saved
        </h1>

        <button className="p-2 border-2 border-nature-sage/30 rounded-xl hover:bg-nature-sage hover:text-nature-bg transition-all">
          <SquarePen size={22} />
        </button>
      </header>

      {/* SEARCH */}
      <section className="bg-nature-sage/5 dark:bg-nature-nav/40 p-6 border-b border-nature-sage/10">
        <div className="flex gap-2">
          
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search saved..."
              className="w-full bg-light-bg dark:bg-nature-bg border-2 border-nature-sage/20 py-4 px-12 text-xs font-bold uppercase tracking-tight outline-none focus:border-nature-sage transition-colors"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
              size={18}
            />
          </div>

          <button className="bg-light-bg dark:bg-nature-bg border-2 border-nature-sage/20 p-4 hover:border-nature-sage transition-colors">
            <Settings2 size={18} />
          </button>
        </div>
      </section>

      {/* CONTENT */}
      <main className="p-6 pb-24">
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {filteredResources.map((item) => (
              <ResourceCard
                key={item.id}
                item={item}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center opacity-20">
            <SearchX size={64} className="mb-4" />
            <h2 className="text-xl font-black uppercase tracking-widest">
              {query ? `No results for "${query}"` : "Library Empty"}
            </h2>
          </div>
        )}
      </main>
    </div>
  );
}