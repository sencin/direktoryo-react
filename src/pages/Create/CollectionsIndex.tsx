import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { ArrowLeft, Folder, SearchX } from "lucide-react";

export default function CollectionsIndex() {
  const navigate = useNavigate();

  const [collections, setCollections] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await api.get("/collections");
        const data = res?.data?.data ?? res?.data ?? [];
        setCollections(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const filteredCollections = useMemo(() => {
    if (!search.trim()) return collections;

    const query = search.toLowerCase();

    return collections.filter((col) =>
      col.name?.toLowerCase().includes(query) ||
      col.description?.toLowerCase().includes(query)
    );
  }, [search, collections]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] opacity-40 animate-pulse">
          loading collections...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-6 md:mb-10 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* HEADER */}
        <h1 className="text-2xl font-black uppercase mb-6">
          Collections
        </h1>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 bg-nature-nav border border-nature-sage/20 text-sm outline-none focus:border-nature-sage"
          />
        </div>

        {/* LIST */}
        <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
  {filteredCollections.length > 0 ? (
    filteredCollections.map((col) => (
      <button
        key={col.id}
        onClick={() => navigate(`/collections/${col.id}`)}
        className="w-full p-5 border border-nature-sage/20 hover:border-nature-sage transition text-left"
      >
        {/* TOP ROW: title + edit */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Folder size={18} />
            <h2 className="font-black uppercase">{col.name}</h2>
          </div>

          {/* EDIT BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 👈 prevents opening collection page
              navigate(`/collections/${col.id}/edit`);
            }}
            className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition"
          >
            Edit
          </button>
        </div>

        <p className="text-xs opacity-50">{col.description}</p>
      </button>
    ))
  ) : (
    <div className="flex flex-col items-center justify-center py-32 text-center opacity-20">
      <SearchX size={64} className="mb-4" />
      <h2 className="text-xl font-black uppercase tracking-widest">
        No Collections Found
      </h2>
    </div>
  )}
</div>

      </div>
    </div>
  );
}