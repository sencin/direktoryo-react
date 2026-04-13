import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Tag } from "lucide-react";
import { api } from "../../utils/api";

export default function CreateCategory() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon_label: "" 
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    try {
      await api.post("/categories", formData);

      await navigate(-1);
      
      // add toast here after you finished creating all three

    } catch (error) {
      console.error("Creation failed:", error.message);
      console.log("Failed with status:", error.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-8">
        <ArrowLeft size={14} /> Back
      </button>

      <header className="mb-10">
        <h1 className="text-2xl font-black uppercase tracking-tighter">New Category</h1>
        <p className="text-[10px] text-nature-sage font-bold uppercase tracking-widest mt-1">Classify the directory</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Category Name</label>
          <input 
            required
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
            placeholder="E.G. WEB UTILITIES" 
            className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 outline-none focus:border-nature-sage transition-colors" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Description</label>
          <textarea 
            rows={3} 
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 outline-none focus:border-nature-sage transition-colors resize-none" 
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-nature-sage text-nature-cream font-black uppercase tracking-[0.3em] text-xs hover:bg-nature-cream disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Tag size={16} />} 
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}