import { X, Download, Bookmark, List } from 'lucide-react';
import { useEffect } from 'react';

export default function BookDetailDesktop({ book, isOpen, setIsOpen }: any) {
      useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
        // Cleanup to ensure scroll is restored if component unmounts
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, [isOpen]);
      
  return (
    <aside className={`
      fixed z-[70] bg-light-bg dark:bg-nature-bg shadow-2xl top-0 right-0 bottom-0 border-l border-black/10
      transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-[450px]
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      hidden xl:block
    `}>
      <div className="p-10 space-y-8 h-full overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Resource Profile</span>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={20} className="opacity-40" />
          </button>
        </div>

        <div className="w-full aspect-[4/3] bg-nature-sage/5 border border-black/5 rounded-2xl overflow-hidden">
          <img src={book?.image_url} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-1">
          <h4 className="text-3xl font-black uppercase tracking-tighter leading-[0.9]">{book?.title}</h4>
          <p className="text-sm font-medium opacity-60">Curated by <span className="underline decoration-nature-sage decoration-2">{book?.author}</span></p>
        </div>

        <div className="grid grid-cols-3 border border-black/10 divide-x divide-black/10 rounded-xl">
           <button className="flex flex-col items-center gap-2 py-4 hover:bg-black/5 transition-colors"><Download size={18} /><span className="text-[9px] font-bold uppercase">Get</span></button>
           <button className="flex flex-col items-center gap-2 py-4 hover:bg-black/5 transition-colors"><Bookmark size={18} /><span className="text-[9px] font-bold uppercase">Save</span></button>
           <button className="flex flex-col items-center gap-2 py-4 hover:bg-black/5 transition-colors"><List size={18} /><span className="text-[9px] font-bold uppercase">Track</span></button>
        </div>

        <p className="text-xs leading-relaxed opacity-70 font-medium italic border-l-2 border-nature-sage pl-4">
          {book?.description}
        </p>

        <a href={book?.url} target="_blank" className="block w-full py-5 bg-nature-sage text-nature-cream text-center text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform">
          Open Project Portal
        </a>
      </div>
    </aside>
  );
}