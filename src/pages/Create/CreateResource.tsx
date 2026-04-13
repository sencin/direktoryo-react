import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Loader2, ChevronDown } from "lucide-react";
import { api } from "../../utils/api";

interface Category {
  id: number;
  name: string;
}

export default function CreateResource() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    description: "",
    official_url: "",
    creator: "",
    identifier: "",
    media_type: "",
    country_code: ""
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setFetchingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category_id) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        category_id: Number(formData.category_id),
      };
      await api.post("/resources", payload);
      navigate(-1);
    } catch (error: any) {
      alert(error.message || "Failed to deploy resource");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 outline-none focus:border-nature-sage transition-colors text-sm rounded-none";
  const labelStyles = "text-[10px] font-black uppercase tracking-widest text-nature-sage";

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-4 md:p-10 lg:p-16 pb-24 md:pb-10">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity mb-6 md:mb-10"
        >
          <ArrowLeft size={14} /> Back to Hub
        </button>

        <header className="mb-8 md:mb-12">
          <h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter">New Resource</h1>
          <p className="text-[9px] md:text-[10px] text-nature-sage font-bold uppercase tracking-widest mt-1">Register dynamic asset</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            <div className="space-y-2">
              <label className={labelStyles}>Resource Name</label>
              <input 
                required
                type="text" 
                placeholder="E.G. PIXEL ART GENERATOR"
                value={formData.name}
                className={inputStyles}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className={labelStyles}>Category</label>
              <div className="relative">
                <select 
                  required
                  value={formData.category_id}
                  className={`${inputStyles} appearance-none cursor-pointer uppercase`}
                  onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                >
                  <option value="" disabled className="bg-nature-bg text-nature-cream/30">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-nature-bg text-nature-cream text-xs">
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  {fetchingCategories ? <Loader2 size={14} className="animate-spin" /> : <ChevronDown size={14} />}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelStyles}>Description</label>
            <textarea 
              rows={4}
              placeholder="Describe the utility and primary use case..."
              value={formData.description}
              className={`${inputStyles} resize-none`}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            <div className="space-y-2">
              <label className={labelStyles}>Official URL</label>
              <input 
                type="url" 
                placeholder="https://example.com" 
                value={formData.official_url}
                className={inputStyles}
                onChange={(e) => setFormData({...formData, official_url: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className={labelStyles}>Creator</label>
              <input 
                type="text" 
                placeholder="Name or Organization" 
                value={formData.creator}
                className={inputStyles}
                onChange={(e) => setFormData({...formData, creator: e.target.value})}
              />
            </div>
          </div>

          {/* Metadata Section - Standardized style & placeholders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
             <div className="space-y-2">
               <label className={labelStyles}>Identifier</label>
               <input 
                type="text" 
                value={formData.identifier} 
                onChange={(e) => setFormData({...formData, identifier: e.target.value})} 
                placeholder="E.G. TOOLS-001" 
                className={`${inputStyles} uppercase`} 
               />
             </div>
             <div className="space-y-2">
               <label className={labelStyles}>Media Type</label>
               <input 
                type="text" 
                value={formData.media_type} 
                onChange={(e) => setFormData({...formData, media_type: e.target.value})} 
                placeholder="E.G. WEBSITE, PDF, APP" 
                className={inputStyles} 
               />
             </div>
             <div className="space-y-2">
               <label className={labelStyles}>Country</label>
               <input 
                type="text" 
                value={formData.country_code} 
                onChange={(e) => setFormData({...formData, country_code: e.target.value})} 
                placeholder="E.G. US, PH, GLOBAL" 
                className={`${inputStyles} uppercase`} 
               />
             </div>
          </div>

          <button 
            disabled={loading || !formData.name || !formData.category_id}
            className="w-full py-6 md:py-5 bg-nature-sage text-nature-bg font-black uppercase tracking-[0.3em] text-xs hover:bg-nature-cream transition-colors flex items-center justify-center gap-3 disabled:opacity-30 rounded-none shadow-xl"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? "Processing..." : "Deploy Resource"}
          </button>
        </form>
      </div>
    </div>
  );
}