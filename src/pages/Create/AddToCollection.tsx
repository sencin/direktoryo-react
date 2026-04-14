import { useEffect, useState, useMemo } from "react";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddToCollection() {
  const navigate = useNavigate();

  const [collections, setCollections] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
  const [selectedResources, setSelectedResources] = useState<number[]>([]);

  const [search, setSearch] = useState(""); // ✅ NEW
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const [colRes, resRes] = await Promise.all([
          api.get("/collections"),
          api.get("/resources")
        ]);

        const colData = colRes?.data?.data ?? colRes?.data ?? [];
        const resData = resRes?.data?.data ?? resRes?.data ?? [];

        setCollections(Array.isArray(colData) ? colData : []);
        setResources(Array.isArray(resData) ? resData : []);
      } catch (err) {
        console.error("Failed loading:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const toggleResource = (id: number) => {
    setSelectedResources((prev) =>
      prev.includes(id)
        ? prev.filter((r) => r !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!selectedCollection || selectedResources.length === 0) return;

    try {
      setSubmitting(true);

      await api.post(`/collections/${selectedCollection}/resources`, {
        resource_ids: selectedResources
      });

      navigate(`/collections/${selectedCollection}`);
    } catch (err) {
      console.error("Failed to add resources:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ FILTERED LIST (memoized for performance)
  const filteredResources = useMemo(() => {
    if (!search.trim()) return resources;

    const query = search.toLowerCase();

    return resources.filter((res) =>
      res.name?.toLowerCase().includes(query) ||
      res.description?.toLowerCase().includes(query)
    );
  }, [search, resources]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] opacity-40 animate-pulse">loading...</p>
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
      <h1 className="text-xl font-black uppercase mb-6">
        Add Resources to Collection
      </h1>

      {/* SEARCH + COLLECTION */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">

        {/* COLLECTION SELECT */}
        <div className="w-full md:w-1/2">
          <p className="text-xs opacity-40 mb-2 uppercase">Select Collection</p>
          <select
            className="w-full p-3 bg-nature-nav border border-nature-sage/20"
            value={selectedCollection ?? ""}
            onChange={(e) => setSelectedCollection(Number(e.target.value))}
          >
            <option value="">Choose...</option>
            {collections.map((col) => (
              <option key={col.id} value={col.id}>
                {col.name}
              </option>
            ))}
          </select>
        </div>

        {/* SEARCH INPUT */}
        <div className="w-full md:w-1/2">
          <p className="text-xs opacity-40 mb-2 uppercase">Search</p>
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 bg-nature-nav border border-nature-sage/20 text-sm outline-none focus:border-nature-sage"
          />
        </div>

      </div>

      {/* RESOURCE LIST */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => {
            const selected = selectedResources.includes(res.id);

            return (
              <button
                key={res.id}
                onClick={() => toggleResource(res.id)}
                className={`w-full p-4 border text-left transition-all
                  ${
                    selected
                      ? "border-nature-sage bg-nature-sage/20"
                      : "border-nature-sage/10 hover:border-nature-sage/40"
                  }
                `}
              >
                <p className="font-bold">{res.name}</p>
                <p className="text-xs opacity-40">{res.description}</p>
              </button>
            );
          })
        ) : (
          <div className="text-center py-12 opacity-30 text-xs uppercase tracking-widest">
            no results found
          </div>
        )}
      </div>

      {/* ACTION */}
      <button
        onClick={handleSubmit}
        disabled={!selectedCollection || selectedResources.length === 0 || submitting}
        className="mt-6 w-full py-5 md:py-6 bg-nature-sage text-nature-bg font-black uppercase tracking-[0.3em] text-[10px] md:text-xs hover:bg-nature-cream transition-colors disabled:opacity-30"
      >
        {submitting
          ? "Adding..."
          : `Add (${selectedResources.length}) to Collection`}
      </button>

    </div>
  </div>
);
}