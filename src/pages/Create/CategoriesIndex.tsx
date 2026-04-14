import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { ArrowLeft, Folder, SearchX } from "lucide-react";
import { auth } from "../../utils/auth";

export default function CategoriesIndex() {
  const navigate = useNavigate();
  const currentUser = auth.getUser();

  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/categories");
        const data = res?.data?.data ?? res?.data ?? [];
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return categories;

    const q = search.toLowerCase();

    return categories.filter((c) =>
      c.name?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q)
    );
  }, [search, categories]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] opacity-40 animate-pulse">loading categories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-6 hover:opacity-100"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* HEADER */}
        <h1 className="text-2xl font-black uppercase mb-6">
          Categories
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-6 bg-nature-nav border border-nature-sage/20 text-sm outline-none focus:border-nature-sage"
        />

        {/* LIST */}
        <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
          {filtered.length > 0 ? (
            filtered.map((cat) => {
              const isOwner = currentUser?.id === cat.user_id;

              return (
                <button
                  key={cat.id}
                  className="w-full p-5 border border-nature-sage/20 hover:border-nature-sage transition text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Folder size={18} />
                      <h2 className="font-black uppercase">{cat.name}</h2>
                    </div>

                    {isOwner && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/categories/${cat.id}/edit`);
                        }}
                        className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  <p className="text-xs opacity-50">{cat.description}</p>
                </button>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-32 opacity-20">
              <SearchX size={64} className="mb-4" />
              <h2 className="text-xl font-black uppercase">No Categories Found</h2>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}