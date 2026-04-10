import { X, Download, Bookmark, List } from 'lucide-react';

interface BookDetailPanelProps {
  book: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function BookDetailPanel({ book, isOpen, setIsOpen }: BookDetailPanelProps) {
  return (
    <>
      {/* 1. UNIVERSAL BACKDROP */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* 2. THE PANEL */}
      <aside className={`
        fixed z-[70] bg-light-bg dark:bg-nature-bg shadow-2xl
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        inset-x-0 bottom-0 rounded-t-[32px] border-t border-black/10
        ${isOpen ? 'h-[85vh] translate-y-0' : 'h-0 translate-y-full'}
        xl:top-0 xl:right-0 xl:bottom-0 xl:left-auto xl:h-screen xl:rounded-none xl:border-l
        ${isOpen 
          ? 'xl:w-[450px] xl:translate-y-0 xl:translate-x-0' 
          : 'xl:w-[450px] xl:translate-y-0 xl:translate-x-full'
        }
      `}>
        
        <div className={`
          w-full xl:w-[420px] h-full overflow-y-auto no-scrollbar
          transition-opacity duration-300 delay-150
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="p-6 md:p-10 space-y-8 pb-10">
            {book ? (
              <>
                <div className="w-12 h-1.5 bg-black/10 dark:bg-white/10 rounded-full mx-auto mb-4 xl:hidden" />

                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Resource Details</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <X size={20} className="opacity-40" />
                  </button>
                </div>

                <div className="flex flex-col gap-8">
                   {/* UPDATED IMAGE LOGIC */}
                   <div className="w-full aspect-[4/3] bg-nature-sage/5 border border-black/5 rounded-2xl overflow-hidden flex items-center justify-center relative">
                      {book.image_url ? (
                        <img 
                          src={book.image_url} 
                          alt={book.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Hide broken image icon and show fallback
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-4xl font-black opacity-10 uppercase">{book.title[0]}</span>
                      )}
                      
                      {/* Overlay Tag */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full">
                         <span className="text-[8px] font-black uppercase tracking-widest">{book.tag || 'Resource'}</span>
                      </div>
                   </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black leading-tight uppercase tracking-tighter">{book.title}</h4>
                    <p className="text-sm font-medium opacity-60">Provider: <span className="underline">{book.author}</span></p>
                  </div>
                </div>

                <a 
                  href={book.url || '#'} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full py-5 bg-nature-sage text-nature-cream text-center text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all"
                >
                  Visit Official Website
                </a>

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

                <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-widest opacity-30">About this resource</h5>
                  <p className="text-xs leading-relaxed opacity-70 font-medium italic">
                    {book.description}
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