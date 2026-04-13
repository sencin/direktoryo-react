import { useNavigate } from "react-router-dom";
import { ArrowLeft, Layers } from "lucide-react";

export default function CreateCollection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-8">
        <ArrowLeft size={14} /> Back
      </button>

      <header className="mb-10">
        <h1 className="text-2xl font-black uppercase tracking-tighter">New Collection</h1>
        <p className="text-[10px] text-nature-sage font-bold uppercase tracking-widest mt-1">Curate a resource set</p>
      </header>

      <div className="space-y-8 max-w-xl">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Collection Title</label>
          <input type="text" placeholder="E.G. IMAGE & VIDEO UTILITIES" className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 outline-none focus:border-nature-sage transition-colors" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-nature-sage">Curator Notes / Description</label>
          <textarea rows={5} placeholder="Purpose of this collection..." className="w-full bg-nature-nav/30 border-2 border-nature-sage/20 p-4 outline-none focus:border-nature-sage transition-colors resize-none" />
        </div>

        <button className="w-full py-5 bg-nature-sage text-nature-bg font-black uppercase tracking-[0.3em] text-xs hover:bg-nature-cream transition-colors flex items-center justify-center gap-3">
          <Layers size={16} /> Finalize Collection
        </button>
      </div>
    </div>
  );
}