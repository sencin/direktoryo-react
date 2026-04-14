import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { ArrowLeft, Folder, SearchX } from "lucide-react";
import { ResourceCard } from "../../components/Saved/ResourceCard";

export default function CollectionView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [collection, setCollection] = useState<any>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [colRes, resRes] = await Promise.all([
          api.get(`/collections/${id}`),
          api.get(`/collections/${id}/resources`)
        ]);

        const colData =
          colRes?.data?.data ?? colRes?.data ?? colRes;

        const resData =
          resRes?.data?.data ?? resRes?.data ?? [];

        setCollection(colData);
        setResources(Array.isArray(resData) ? resData : []);
      } catch (err) {
        console.error("Failed to fetch collection:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] opacity-40 animate-pulse">
          loading collection...
        </p>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] opacity-40">
          collection not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-6 hover:opacity-100 transition"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* HEADER */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Folder size={20} />
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              {collection.name}
            </h1>
          </div>

          {collection.description && (
            <p className="text-xs md:text-sm opacity-50 max-w-xl">
              {collection.description}
            </p>
          )}
        </header>

        {/* RESOURCE GRID */}
        {resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((item) => (
              <ResourceCard
                key={item.id}
                item={item}
                onToggleSave={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center opacity-20">
            <SearchX size={64} className="mb-4" />
            <h2 className="text-xl font-black uppercase tracking-widest">
              No Resources Yet
            </h2>
          </div>
        )}

      </div>
    </div>
  );
}