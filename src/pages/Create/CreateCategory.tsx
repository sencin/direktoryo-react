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

    } catch (error: any) {
      console.error("Creation failed:", error.message);
      console.log("Failed with status:", error.status);
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-4 md:p-8 lg:p-12">
    <div className="max-w-2xl mx-auto">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-6 md:mb-10 hover:opacity-100 transition-opacity"
      >
        <ArrowLeft size={14} /> Back
      </button>

      {/* HEADER */}
      <header className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
          New Category
        </h1>
        <p className="text-[10px] md:text-xs text-nature-sage font-bold uppercase tracking-widest mt-2">
          Classify the directory
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">

        {/* CATEGORY NAME */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">
            Category Name
          </label>

          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value.toUpperCase()
              })
            }
            placeholder="E.G. WEB UTILITIES"
            className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 md:p-5 outline-none focus:border-nature-sage transition-colors uppercase text-sm md:text-base"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">
            Description
          </label>

          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
            }
            className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 md:p-5 outline-none focus:border-nature-sage transition-colors resize-none text-sm md:text-base"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 md:py-6 bg-nature-sage text-nature-bg font-black uppercase tracking-[0.3em] text-[10px] md:text-xs hover:bg-nature-cream active:bg-nature-cream transition-colors flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Tag size={18} />
          )}
          {loading ? "Creating..." : "Create Category"}
        </button>

      </form>
    </div>
  </div>
);
}