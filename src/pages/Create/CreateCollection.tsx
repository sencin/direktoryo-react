import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Layers, Loader2, Lock } from "lucide-react"; // Swapped Upload for Lock
import { api } from "../../utils/api";


/// swap this tsx for the create collection final when backend supports uploading
export default function CreateCollection() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    try {
      // Reverted to simple object since we aren't sending files yet
      const payload = {
        name: formData.name.toUpperCase(),
        description: formData.description,
      };

      await api.post("/collections", payload);
      navigate(-1);
    } catch (err: any) {
      console.error("Status:", err.status);
      alert(err.message || "Failed to create collection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-4 md:p-8 lg:p-12">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-6 md:mb-10 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <header className="mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">New Collection</h1>
          <p className="text-[10px] md:text-xs text-nature-sage font-bold uppercase tracking-widest mt-2">Curate a resource set</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
          {/* Disabled Image Upload Area */}
          <div className="space-y-3 opacity-30 grayscale cursor-not-allowed">
            <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Cover Image</label>
                <span className="text-[9px] bg-nature-sage/20 text-nature-sage px-2 py-0.5 font-bold uppercase tracking-tighter">Disabled</span>
            </div>
            
            <div className="w-full aspect-video bg-nature-nav/30 border-2 border-dashed border-nature-sage/20 flex flex-col items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center gap-3 p-4 text-center">
                  <Lock size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Upload Module Offline</span>
                </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Collection Title</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="E.G. IMAGE & VIDEO UTILITIES" 
                className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 md:p-5 outline-none focus:border-nature-sage transition-colors uppercase text-sm md:text-base" 
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Curator Notes</label>
              <textarea 
                rows={4} 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe this set..." 
                className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 md:p-5 outline-none focus:border-nature-sage transition-colors resize-none text-sm md:text-base" 
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading || !formData.name}
            className="w-full py-5 md:py-6 bg-nature-sage text-nature-bg font-black uppercase tracking-[0.3em] text-[10px] md:text-xs hover:bg-nature-cream active:bg-nature-cream transition-colors flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Layers size={18} />} 
            {loading ? "Processing..." : "Finalize Collection"}
          </button>
        </form>
      </div>
    </div>
  );
}