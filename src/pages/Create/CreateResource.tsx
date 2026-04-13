import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export default function CreateResource() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    description: "",
    official_url: "",
    creator: "",
    identifier: "",
    media_type: "website",
    country_code: "GLOBAL"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Resource:", formData);
  };

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity mb-8"
      >
        <ArrowLeft size={14} /> Back to Hub
      </button>

      <header className="mb-10">
        <h1 className="text-2xl font-black uppercase tracking-tighter">New Resource</h1>
        <p className="text-[10px] text-nature-sage font-bold uppercase tracking-widest mt-1">Register dynamic asset</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Resource Name</label>
            <input 
              type="text" 
              placeholder="E.G. EZGIF TOOLS"
              className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 outline-none focus:border-nature-sage transition-colors"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Category ID</label>
            <input 
              type="number" 
              placeholder="7"
              className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 outline-none focus:border-nature-sage transition-colors"
              onChange={(e) => setFormData({...formData, category_id: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Description</label>
          <textarea 
            rows={4}
            placeholder="Detailed utility summary..."
            className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 outline-none focus:border-nature-sage transition-colors resize-none"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Official URL</label>
            <input type="url" placeholder="https://..." className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 outline-none focus:border-nature-sage transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Creator</label>
            <input type="text" placeholder="Organization/User" className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 outline-none focus:border-nature-sage transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-2 border-nature-sage/10 bg-nature-nav/10">
           <div className="space-y-1">
             <label className="text-[9px] font-black uppercase opacity-40">Identifier</label>
             <input type="text" placeholder="WEB-TOOL-01" className="w-full bg-transparent border-b border-nature-sage/20 py-2 outline-none focus:border-nature-sage text-xs" />
           </div>
           <div className="space-y-1">
             <label className="text-[9px] font-black uppercase opacity-40">Media Type</label>
             <input type="text" placeholder="website" className="w-full bg-transparent border-b border-nature-sage/20 py-2 outline-none focus:border-nature-sage text-xs" />
           </div>
           <div className="space-y-1">
             <label className="text-[9px] font-black uppercase opacity-40">Country</label>
             <input type="text" placeholder="GLOBAL" className="w-full bg-transparent border-b border-nature-sage/20 py-2 outline-none focus:border-nature-sage text-xs" />
           </div>
        </div>

        <button className="w-full py-5 bg-nature-sage text-nature-bg font-black uppercase tracking-[0.3em] text-xs hover:bg-nature-cream transition-colors flex items-center justify-center gap-3">
          <Save size={16} /> Deploy Resource
        </button>
      </form>
    </div>
  );
}