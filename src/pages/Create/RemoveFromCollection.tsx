import { useEffect, useState, useMemo } from "react";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CollectionService } from "../../services/collectionService";

export default function RemoveFromCollection() {
  const navigate = useNavigate();

  const [collections, setCollections] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [collectionResources, setCollectionResources] = useState<number[]>([]);

  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
  const [selectedResources, setSelectedResources] = useState<number[]>([]);

  const [search, setSearch] = useState("");
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // load resources inside selected collection
  useEffect(() => {
    // 1. Guard clause: if no collection is selected, reset everything and stop
    if (!selectedCollection) {
      setCollectionResources([]);
      setSelectedResources([]);
      return;
    }

    let isMounted = true;

    const loadData = async () => {
      // 2. Reset UI instantly (Wipe previous data to avoid ghosting)
      setCollectionResources([]); 
      setSelectedResources([]);

      try {
        // Using your CollectionService pattern
        const books = await CollectionService.getCollectionBooks(selectedCollection.toString());
  
        if (isMounted) {
          // Map to IDs if the service returns objects, 
          // or just set if it returns an ID array
          const ids = Array.isArray(books) ? books.map((b: any) => b.id || b) : [];
          setCollectionResources(ids);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };
  
    loadData();
  
    // 3. THE CLEANUP: Prevents race conditions and wipes memory on unmount/change
    return () => {
      isMounted = false;
      setCollectionResources([]); 
      setSelectedResources([]);
    };
  }, [selectedCollection]); // Changed from activeCollection to selectedCollection
  

  const toggleResource = (id: number) => {
    setSelectedResources((prev) =>
      prev.includes(id)
        ? prev.filter((r) => r !== id)
        : [...prev, id]
    );
  };

  const handleRemove = async () => {
    if (!selectedCollection || selectedResources.length === 0) return;

    try {
      setSubmitting(true);

      await api.delete(`/collections/${selectedCollection}/resources/${selectedResources}`)

      // refresh view
      setCollectionResources((prev) =>
        prev.filter((id) => !selectedResources.includes(id))
      );

      setSelectedResources([]);
    } catch (err) {
      console.error("Failed to remove:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredResources = useMemo(() => {
    return resources.filter((res) =>
      collectionResources.includes(res.id) && (
        res.name?.toLowerCase().includes(search.toLowerCase()) ||
        res.description?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [resources, collectionResources, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] opacity-40 animate-pulse">
          loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-6 md:mb-10 hover:opacity-100"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* HEADER */}
        <h1 className="text-xl font-black uppercase mb-6">
          Remove Resources from Collection
        </h1>

       {/* TOP CONTROLS: SELECT + SEARCH */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 md:items-end">
        
        {/* COLLECTION SELECT */}
        <div className="flex-1">
            <p className="text-xs opacity-40 mb-2 uppercase">
            Select Collection
            </p>
            <select
            className="w-full p-3 bg-nature-nav border border-nature-sage/20 outline-none"
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

        {/* SEARCH */}
        <div className="flex-1">
            {/* This keeps the inputs aligned horizontally on desktop */}
            <p className="hidden md:block text-xs opacity-0 mb-2 uppercase">
            Search Spacer
            </p>
            <input
            type="text"
            placeholder="Search resources in collection..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 bg-nature-nav border border-nature-sage/20 text-sm outline-none"
            />
        </div>

        </div>

        {/* LIST */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {filteredResources.length > 0 ? (
            filteredResources.map((res) => {
              const selected = selectedResources.includes(res.id);

              return (
                <button
                  key={res.id}
                  onClick={() => toggleResource(res.id)}
                  className={`w-full p-4 border text-left transition
                    ${
                      selected
                        ? "border-red-500 bg-red-500/10"
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
            <div className="text-center py-12 opacity-30 text-xs uppercase">
              no linked resources found
            </div>
          )}
        </div>

        {/* ACTION */}
        <button
          onClick={handleRemove}
          disabled={
            !selectedCollection ||
            selectedResources.length === 0 ||
            submitting
          }
          className="mt-6 w-full py-5 bg-red-500 text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs disabled:opacity-30"
        >
          {submitting
            ? "Removing..."
            : `Remove (${selectedResources.length}) from Collection`}
        </button>

      </div>
    </div>
  );
}