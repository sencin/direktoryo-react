import { useEffect, useState, memo } from "react";
import { api } from "../../utils/api";
import {
  Download,
  ListPlus,
  SearchX,
  Bookmark,
  Search,
  Settings2,
  SquarePen
} from "lucide-react";

// --- Sub-components ---

const TabButton = ({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 border-2 text-[10px] font-black uppercase tracking-widest transition-all
      ${
        active
          ? "bg-nature-sage border-nature-sage text-nature-cream"
          : "border-nature-sage/30 opacity-60 hover:opacity-100 dark:text-nature-cream"
      }`}
  >
    {label}
  </button>
);

const ResourceCard = memo(
  ({
    item,
    onToggleSave
  }: {
    item: any;
    onToggleSave: (id: number) => void;
  }) => {
    const isSaved = item.is_saved === 1 || item.is_saved === true;

    return (
      <div className="flex flex-col space-y-5 group animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="flex gap-5">
          {/* IMAGE */}
          <div className="w-1/3 shrink-0">
            <div className="border-2 border-nature-sage/30 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] aspect-[3/4] bg-nature-nav overflow-hidden">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-2xl font-black opacity-10">
                  {item.name?.[0]}
                </div>
              )}
            </div>
          </div>

          {/* INFO */}
          <div className="flex-1 min-w-0 relative">
            <button
              onClick={() => onToggleSave(item.id)}
              className="absolute right-0 top-0 p-1 text-nature-sage/40 hover:text-nature-sage transition-colors"
            >
              <Bookmark
                size={22}
                className={
                  isSaved ? "fill-nature-sage text-nature-sage" : ""
                }
              />
            </button>

            <h2 className="text-lg font-black uppercase tracking-tight pr-8 leading-tight truncate">
              {item.name}
            </h2>

            <p className="text-[10px] font-bold text-nature-sage uppercase tracking-widest mt-1">
              {item.creator || "Unknown Creator"}
            </p>

            <p className="text-[11px] leading-relaxed opacity-60 line-clamp-4 mt-2">
              {item.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="space-y-3">
          <a
            href={item.official_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-nature-sage text-nature-bg text-center text-[11px] font-black uppercase tracking-[0.2em] shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            Visit Official Website
          </a>

          <div className="flex justify-between px-2 pt-2 border-t border-nature-sage/10">
            <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
              <Download size={14} /> Download
            </button>

            <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
              <ListPlus size={14} /> Add to List
            </button>
          </div>
        </div>
      </div>
    );
  }
);

// --- Main Component ---

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
        // 🔐 Check auth
        const res = await api.get("/users/me");

        if (!isMounted) return;

        // Extracting from your specific JSON structure: { "user": { "id": 1 ... } }
        // We check for res?.user?.id or res?.data?.user?.id depending on your axios wrapper
        const userData = res?.user ?? res?.data?.user;

        if (userData?.id) {
          setIsAuthenticated(true);

          // 📚 Fetch saved resources
          const libraryRes = await api.get("/users/library");
          const libraryData = libraryRes?.data?.data ?? libraryRes?.data ?? libraryRes ?? [];

          setSavedResources(Array.isArray(libraryData) ? libraryData : []);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Session verification failed:", err);
        if (isMounted) setIsAuthenticated(false);
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
      const isSaved = res?.saved;

      if (!isSaved) {
        setSavedResources((prev) =>
          prev.filter((item) => item.id !== id)
        );
      }
    } catch (err) {
      console.error("Toggle save failed:", err);
    }
  };

  // --- HARD AUTH GUARD ---

  if (isLoading || isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 animate-pulse">
          loading session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 text-center">
          only for logged user
        </p>
      </div>
    );
  }

  // --- MAIN UI ---

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

      {/* FILTER BAR */}
      <section className="bg-nature-sage/5 dark:bg-nature-nav/40 p-6 space-y-4 border-b border-nature-sage/10">

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((tab) => (
            <TabButton
              key={tab}
              label={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
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
        {savedResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {savedResources.map((item) => (
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
              Library Empty
            </h2>
          </div>
        )}
      </main>
    </div>
  );
}