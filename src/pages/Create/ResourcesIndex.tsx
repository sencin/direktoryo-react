import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { ArrowLeft, FileText, SearchX } from "lucide-react";
import { auth } from "../../utils/auth";
import BookDetailPanel from "../../components/Home/BookDetailPanel";



export default function ResourcesIndex() {
  const navigate = useNavigate();
  const currentUser = auth.getUser();

  const [resources, setResources] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ NEW STATE
  const [selectedResource, setSelectedResource] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.get("/resources");
        const data = res?.data?.data ?? res?.data ?? [];
        setResources(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const toggleSave = async (id: number) => {
  const res = await api.post(`/users/resources/${id}/save`, {});

  
  setResources(prev =>
    prev.map(r =>
      r.id === id ? { ...r, is_saved: res.saved } : r
    )
  );

  setSelectedResource((prev: { id: number; }) =>
    prev?.id === id
      ? { ...prev, is_saved: res.saved }
      : prev
  );
};


  const filteredResources = useMemo(() => {
    if (!search.trim()) return resources;

    const q = search.toLowerCase();

    return resources.filter(
      (r) =>
        r.name?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.category_name?.toLowerCase().includes(q)
    );
  }, [search, resources]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] opacity-40 animate-pulse">
          loading resources...
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
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-6 md:mb-10 hover:opacity-100 transition"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* HEADER */}
        <h1 className="text-2xl font-black uppercase mb-6">
          Resources
        </h1>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 bg-nature-nav border border-nature-sage/20 text-sm outline-none focus:border-nature-sage"
          />
        </div>

        {/* LIST */}
        <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
          {filteredResources.length > 0 ? (
            filteredResources.map((res) => {
              const isOwner = currentUser?.id === res.user_id;

              return (
                <button
                  key={res.id}
                  onClick={() => {
                    setSelectedResource(res);   // ✅ PASS DATA
                    setIsSidebarOpen(true);     // ✅ OPEN PANEL
                  }}
                  className="w-full p-5 border border-nature-sage/20 hover:border-nature-sage transition text-left"
                >
                  {/* TOP ROW */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText size={18} />
                      <h2 className="font-black uppercase">
                        {res.name}
                      </h2>
                    </div>

                    {isOwner && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/resources/${res.id}/edit`);
                        }}
                        className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  <p className="text-xs opacity-50">{res.description}</p>

                  <p className="text-[10px] opacity-30 mt-2 uppercase">
                    {res.category_name}
                  </p>
                </button>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center opacity-20">
              <SearchX size={64} className="mb-4" />
              <h2 className="text-xl font-black uppercase tracking-widest">
                No Resources Found
              </h2>
            </div>
          )}
        </div>
      </div>

      {/* ✅ SIDEBAR PANEL */}
      <BookDetailPanel
        book={selectedResource}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onToggleSave={toggleSave}
      />
    </div>
  );
}