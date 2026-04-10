import { X, Download, Bookmark, List } from 'lucide-react';

interface BookDetailPanelProps {
  book: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function BookDetailPanel({ book, isOpen, setIsOpen }: BookDetailPanelProps) {
  return (
    <>
      {/* 1. UNIVERSAL BACKDROP (Now covers desktop too) */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* 2. THE PANEL */}
      <aside className={`
        /* BASE POSITIONING */
        fixed z-[70] bg-light-bg dark:bg-nature-bg shadow-2xl
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        
        /* --- MOBILE: BOTTOM SLIDE --- */
        inset-x-0 bottom-0 rounded-t-[32px] border-t border-black/10
        ${isOpen ? 'h-[85vh] translate-y-0' : 'h-0 translate-y-full'}
        
        /* --- DESKTOP: RIGHT SLIDE --- */
        xl:top-0 xl:right-0 xl:bottom-0 xl:left-auto xl:h-screen xl:rounded-none xl:border-l
        /* Reset mobile height/translate and apply horizontal slide */
        ${isOpen 
          ? 'xl:w-[450px] xl:translate-y-0 xl:translate-x-0' 
          : 'xl:w-[450px] xl:translate-y-0 xl:translate-x-full'
        }
      `}>
        
        {/* 3. INTERNAL CONTENT */}
        <div className={`
          w-full xl:w-[420px] h-full overflow-y-auto no-scrollbar
          transition-opacity duration-300 delay-150
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="p-6 md:p-10 space-y-8 pb-10">
            {book ? (
              <>
                {/* Mobile Handle */}
                <div className="w-12 h-1.5 bg-black/10 dark:bg-white/10 rounded-full mx-auto mb-4 xl:hidden" />

                {/* Header with Close Button */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20">Resource Details</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <X size={20} className="opacity-40" />
                  </button>
                </div>

                {/* Content: Image & Info */}
                <div className="flex flex-col gap-8">
                   <div className="w-full aspect-[4/3] bg-nature-sage/10 border border-black/5 rounded-2xl flex items-center justify-center">
                      {/* Replace with your image logic */}
                      <span className="text-[10px] font-black uppercase opacity-20">Preview Image</span>
                   </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black leading-tight uppercase tracking-tighter">{book.title}</h4>
                    <p className="text-sm font-medium opacity-60">Provider: <span className="underline">{book.author}</span></p>
                  </div>
                </div>

                {/* Primary Action */}
                <a 
                  href={book.official_url || '#'} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full py-5 bg-nature-sage text-nature-cream text-center text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all"
                >
                  Visit Official Website
                </a>

                {/* Action Grid */}
                <div className="grid grid-cols-3 border border-black/10 dark:border-white/10 divide-x divide-black/10 dark:divide-white/10 rounded-xl overflow-hidden">
                   <button className="flex flex-col items-center gap-2 py-4 hover:bg-black/5 transition-colors group">
                      <Download size={18} className="opacity-40 group-hover:opacity-100" />
                      <span className="text-[9px] font-bold uppercase tracking-tighter">Download</span>
                   </button>
                   <button className="flex flex-col items-center gap-2 py-4 hover:bg-black/5 transition-colors group">
                      <Bookmark size={18} className="opacity-40 group-hover:opacity-100" />
                      <span className="text-[9px] font-bold uppercase tracking-tighter">Save</span>
                   </button>
                   <button className="flex flex-col items-center gap-2 py-4 hover:bg-black/5 transition-colors group">
                      <List size={18} className="opacity-40 group-hover:opacity-100" />
                      <span className="text-[9px] font-bold uppercase tracking-tighter">Add List</span>
                   </button>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-widest opacity-30">About this resource</h5>
                  <p className="text-xs leading-relaxed opacity-70 font-medium italic">
                    {book.description || book.desc}
                  </p>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-center opacity-20 uppercase text-[10px] tracking-[0.3em] font-black">
                Select a title
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}