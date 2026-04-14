import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Loader2, ChevronDown, Trash2, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { api } from "../../../utils/api";

interface Category {
  id: number;
  name: string;
}

export default function EditResource() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageError, setImageError] = useState(false); // Track preview errors

  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    description: "",
    official_url: "",
    creator: "",
    identifier: "",
    media_type: "",
    country_code: "",
    image_url: ""
  });

  useEffect(() => {
    if (!id) {
      navigate("/home");
      return;
    }

    const initData = async () => {
      try {
        const [catRes, itemRes] = await Promise.allSettled([
          api.get("/categories"),
          api.get(`/resources/${id}`)
        ]);

        if (catRes.status === "fulfilled") {
          setCategories(catRes.value?.data || []);
        }

        if (itemRes.status === "fulfilled") {
          const raw = itemRes.value?.data;
          const resource = raw?.data ?? raw;

          if (!resource || Object.keys(resource).length === 0) {
            setNotFound(true);
            return;
          }

          setFormData({
            category_id: resource.category_id?.toString() ?? "",
            name: resource.name ?? "",
            description: resource.description ?? "",
            official_url: resource.official_url ?? "",
            creator: resource.creator ?? "",
            identifier: resource.identifier ?? "",
            media_type: resource.media_type ?? "",
            country_code: resource.country_code ?? "",
            image_url: resource.image_url ?? ""
          });
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Initialization failed:", err);
        setNotFound(true);
      } finally {
        setFetching(false);
      }
    };

    initData();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/resources/${id}`, {
        ...formData,
        category_id: Number(formData.category_id),
        image_url: formData.image_url.trim() // Ensure clean URL
      });

      navigate(-1);
    } catch (error: any) {
      alert(error.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("ARE YOU SURE YOU WANT TO DECOMMISSION THIS RESOURCE?")) return;
    setLoading(true);
    try {
      await api.delete(`/resources/${id}`);
      navigate("/home");
    } catch (error: any) {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 outline-none focus:border-nature-sage transition-colors text-sm rounded-none";
  const labelStyles = "text-[10px] font-black uppercase tracking-widest text-nature-sage";

  if (fetching) {
    return (
      <div className="min-h-screen bg-nature-bg flex items-center justify-center font-mono text-nature-cream">
        <p className="text-[10px] uppercase tracking-[0.3em] animate-pulse opacity-50">Syncing with Registry...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-nature-bg flex flex-col items-center justify-center font-mono text-nature-cream p-6 text-center">
        <p className="text-[12px] uppercase tracking-[0.3em] opacity-60 mb-6">Resource Not Found</p>
        <div className="flex gap-4">
          <button onClick={() => navigate(-1)} className="text-[10px] uppercase tracking-[0.2em] border border-nature-sage px-6 py-3 hover:bg-nature-sage hover:text-nature-bg transition">Go Back</button>
          <button onClick={() => navigate("/home")} className="text-[10px] uppercase tracking-[0.2em] border border-nature-sage px-6 py-3 hover:bg-nature-sage hover:text-nature-bg transition">Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-4 md:p-10 lg:p-16 pb-24 md:pb-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"><ArrowLeft size={14} /> Cancel Edit</button>
          <button onClick={handleDelete} disabled={loading} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500/40 hover:text-red-500 transition-colors disabled:opacity-30"><Trash2 size={14} /> Decommission</button>
        </div>

        <header className="mb-12 border-l-4 border-nature-sage pl-6">
          <h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter italic">Update Asset</h1>
          <p className="text-[9px] md:text-[10px] text-nature-sage font-bold uppercase tracking-widest mt-1">Ref: {formData.identifier || id}</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
          
          {/* IMAGE URL & PREVIEW SECTION */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className={`${labelStyles} flex items-center gap-2`}>
              <LinkIcon size={12} /> Resource Cover Image (URL)
            </label>
            <input 
              type="text" 
              placeholder="https://example.com/image.jpg"
              value={formData.image_url}
              className={inputStyles}
              onChange={(e) => {
                setFormData({...formData, image_url: e.target.value});
                setImageError(false);
              }}
            />
          </div>
          
          <div className="w-full aspect-video bg-nature-nav/30 border-2 border-dashed border-nature-sage/10 flex items-center justify-center overflow-hidden">
            {formData.image_url && !imageError ? (
              <img 
                src={formData.image_url} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={() => setImageError(true)} 
              />
            ) : (
              <div className="flex flex-col items-center gap-3 opacity-20">
                <ImageIcon size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {imageError ? "Invalid URL" : "Asset Preview"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className={labelStyles}>Resource Name</label>
            <input type="text" value={formData.name} className={inputStyles} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>

          <div className="space-y-2">
            <label className={labelStyles}>Category</label>
            <div className="relative">
              <select value={formData.category_id} className={`${inputStyles} appearance-none cursor-pointer uppercase`} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
            </div>
          </div>
        </div>

          <div className="space-y-2">
            <label className={labelStyles}>Description</label>
            <textarea rows={4} value={formData.description} className={`${inputStyles} resize-none`} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className={labelStyles}>Official URL</label>
              <input type="url" value={formData.official_url} className={inputStyles} onChange={(e) => setFormData({ ...formData, official_url: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className={labelStyles}>Creator</label>
              <input type="text" value={formData.creator} className={inputStyles} onChange={(e) => setFormData({ ...formData, creator: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <label className={labelStyles}>Identifier</label>
              <input type="text" value={formData.identifier} className={`${inputStyles} uppercase`} onChange={(e) => setFormData({ ...formData, identifier: e.target.value })} />
            </div>
            <div>
              <label className={labelStyles}>Media Type</label>
              <input type="text" value={formData.media_type} className={inputStyles} onChange={(e) => setFormData({ ...formData, media_type: e.target.value })} />
            </div>
            <div>
              <label className={labelStyles}>Country</label>
              <input type="text" value={formData.country_code} className={`${inputStyles} uppercase`} onChange={(e) => setFormData({ ...formData, country_code: e.target.value })} />
            </div>
          </div>

          <button disabled={loading} className="w-full py-6 bg-nature-sage text-nature-bg font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 disabled:opacity-30">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Commit Update
          </button>
        </form>
      </div>
    </div>
  );
}