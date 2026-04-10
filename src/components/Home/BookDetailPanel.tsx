import { ChevronRight, ChevronLeft, X, Download, Bookmark, List } from 'lucide-react';

interface BookDetailPanelProps {
  book: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function BookDetailPanel({ book, isOpen, setIsOpen }: BookDetailPanelProps) {
  // If no book is selected, we keep the sidebar in the DOM but hidden 
  // to preserve the "sliding" animation when a book is finally picked.
  
  return (
    <>
      {/* MOBILE OVERLAY BACKDROP */}
      {/* We use opacity transition here to match the sliding speed */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] xl:hidden backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`
        /* 1. POSITIONING STRATEGY */
        fixed inset-x-0 bottom-0 z-[70]             /* Mobile: Slides from bottom */
        xl:relative xl:inset-auto xl:z-0           /* Desktop: Acts as a column */
        
        /* 2. THE ANIMATION ENGINE */
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        bg-light-bg dark:bg-nature-bg
        border-t xl:border-t-0 xl:border-l border-black/10 dark:border-white/10
        
        /* 3. RESPONSIVE SCALE */
        /* Mobile: Height and Translation */
        ${isOpen ? 'h-[90vh] translate-y-0' : 'h-0 translate-y-full'}
        
        /* Desktop: Width (Overriding mobile height/translate) */
        ${isOpen ? 'xl:w-[420px] xl:h-full xl:translate-y-0' : 'xl:w-0 xl:h-full xl:translate-y-0'}
        
        rounded-t-[32px] xl:rounded-none
      `}>
        
        {/* DESKTOP TOGGLE TAB (The small circle button) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="hidden xl:flex absolute -left-4 top-10 bg-nature-sage text-nature-cream w-8 h-8 items-center justify-center rounded-full border border-black/10 z-50 hover:scale-110 shadow-md transition-transform"
        >
          {isOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* 4. INTERNAL CONTENT WRAPPER */}
        {/* This div is exactly 420px. When the parent 'aside' grows, it reveals this. */}
        <div className={`
          w-full xl:w-[420px] h-full overflow-y-auto no-scrollbar 
          transition-opacity duration-300 delay-100
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}>
          <div className="p-6 md:p-10 space-y-8 pb-10">
            {book ? (
              <>
                {/* Mobile Drag Handle Indicator */}
                <div className="w-12 h-1.5 bg-black/10 dark:bg-white/10 rounded-full mx-auto mb-4 xl:hidden" />

                {/* Close Button Header */}
                <div className="flex justify-end">
                  <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                    <X size={20} className="opacity-40" />
                  </button>
                </div>

                {/* Book Visual & Info */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-32 aspect-[2/3] sm:h-48 bg-nature-sage/20 border border-black/10 shadow-lg" />
                  <div className="flex-1">
                    <h4 className="text-2xl font-black leading-tight uppercase tracking-tighter mb-2">{book.title}</h4>
                    <p className="text-sm font-medium opacity-60">By: <span className="underline">{book.author}</span></p>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="space-y-3">
                  <button className="w-full py-4 border-2 border-black/20 dark:border-white/20 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black/5 transition-colors">
                    Read Free For 30 Days
                  </button>
                  <button className="w-full py-4 bg-[#FF6B35] text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-md hover:brightness-110 transition-all">
                    ▶ Play Sample
                  </button>
                </div>

                {/* Reference Grid (Icons from your image) */}
                <div className="grid grid-cols-3 border border-black/10 dark:border-white/10 divide-x divide-black/10 dark:divide-white/10">
                   <button className="flex flex-col items-center gap-2 py-4 hover:bg-black/5 transition-colors group">
                      <Download size={20} className="opacity-60 group-hover:opacity-100" />
                      <span className="text-[9px] font-bold uppercase tracking-tighter">Download</span>
                   </button>
                   <button className="flex flex-col items-center gap-2 py-4 hover:bg-black/5 transition-colors group">
                      <Bookmark size={20} className="opacity-60 group-hover:opacity-100" />
                      <span className="text-[9px] font-bold uppercase tracking-tighter">Save</span>
                   </button>
                   <button className="flex flex-col items-center gap-2 py-4 hover:bg-black/5 transition-colors group">
                      <List size={20} className="opacity-60 group-hover:opacity-100" />
                      <span className="text-[9px] font-bold uppercase tracking-tighter">Add List</span>
                   </button>
                </div>

                {/* Description Text */}
                <p className="text-xs leading-relaxed opacity-70 font-medium">
                  {book.desc}
                </p>
              </>
            ) : (
              /* Empty State */
              <div className="h-full flex items-center justify-center text-center opacity-30 uppercase text-[10px] tracking-[0.3em] font-black">
                Select a title
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}