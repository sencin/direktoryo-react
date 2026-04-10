import { ChevronRight, ChevronLeft, X, Search, Bookmark } from 'lucide-react';

interface BookDetailPanelProps {
  book: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function BookDetailPanel({ book, isOpen, setIsOpen }: BookDetailPanelProps) {
  return (
    <aside className={`relative hidden xl:flex flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border-l border-black/10 dark:border-white/10 ${isOpen ? 'w-[420px]' : 'w-0'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-4 top-10 bg-nature-sage text-nature-cream w-8 h-8 flex items-center justify-center rounded-full border border-black/10 z-50 hover:scale-110 shadow-md"
      >
        {isOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      <div className={`w-[420px] h-full p-10 overflow-y-auto no-scrollbar transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {book ? (
          <div className="space-y-8">
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-black/5 rounded-full"><X size={20} className="opacity-40" /></button>
            </div>
            <div className="flex gap-6">
              <div className="w-32 h-48 bg-nature-sage/20 border border-black/10 shadow-lg" />
              <div className="pt-2">
                <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">{book.title}</h4>
                <p className="text-sm font-medium opacity-60">By: {book.author}</p>
              </div>
            </div>
            <button className="w-full py-4 bg-[#FF6B35] text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-md">▶ Play Sample</button>
            <p className="text-xs leading-relaxed opacity-70 font-medium">{book.desc}</p>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center opacity-30 uppercase text-[10px] tracking-[0.3em]">Select a title</div>
        )}
      </div>
    </aside>
  );
}