import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Layers, Loader2, Upload, X } from "lucide-react";
import { api } from "../../utils/api";

export default function CreateCollection() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setFormData({ ...formData, image: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name.toUpperCase());
      data.append("description", formData.description);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await api.post("/collections", data);
      navigate(-1);
    } catch (err: any) {
      console.error("Status:", err.status);
      alert(err.message || "Failed to create collection");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Responsive padding: p-4 on mobile, p-8 on tablet/desktop
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-4 md:p-8 lg:p-12">
      {/* Centered container for better desktop readability */}
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
          {/* Image Upload Area */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Cover Image (Optional)</label>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group relative cursor-pointer w-full aspect-video bg-nature-nav/30 border-2 border-dashed border-nature-sage/20 flex flex-col items-center justify-center overflow-hidden hover:border-nature-sage transition-all active:scale-[0.99]"
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 md:top-4 md:right-4 z-10 bg-nature-bg/90 p-2 hover:bg-nature-sage hover:text-nature-bg transition-colors"
                  >
                    <X size={16} />
                  </button>
                  <div className="absolute inset-0 bg-nature-bg/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity hidden md:flex">
                     <p className="text-[10px] font-black uppercase tracking-widest bg-nature-bg px-4 py-2">Change Image</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity p-4 text-center">
                  <Upload size={28} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Tap to Upload Cover</span>
                </div>
              )}
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          {/* Text Inputs */}
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