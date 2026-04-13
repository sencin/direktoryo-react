import { X, Download, Bookmark, List, Pencil } from 'lucide-react';
import { useEffect } from 'react';
import { auth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function BookDetailDesktop({ book, isOpen, setIsOpen, onToggleSave }: any) {
    const currentUser = auth.getUser();
    const isOwner = currentUser?.id === book?.user_id;
    const navigate = useNavigate(); 
    const isSaved = book?.is_saved;

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
      

      const actions = [
      {
        icon: <Download size={18} />,
        label: "Get",
        onClick: () => {}
      },
      {
        icon: (
          <Bookmark
            size={18}
            className={isSaved ? "fill-nature-sage text-nature-sage" : ""}
          />
        ),
        label: isSaved ? "Saved" : "Save",
        onClick: () => onToggleSave(book?.id)
      },
      {
        icon: <List size={18} />,
        label: "Add to list",
        onClick: () => {}
      }
    ];

    if (isOwner) {
      actions.push({
        icon: <Pencil size={18} />,
        label: "Edit",
        onClick: () => navigate(`/edit/resource/${book.id}`)
      });
    }


  return (
    <aside className={`
      fixed z-[70] bg-light-bg dark:bg-nature-bg shadow-2xl top-0 right-0 bottom-0 border-l border-black/10
      transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-[450px]
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      hidden xl:block
    `}>
      <div className="p-10 space-y-8 h-full overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Resource Details</span>
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

            {/* CTA (Your original UI) */}
              <a
                href={book?.url || '#'}
                target="_blank"
                className="block w-full py-5 bg-nature-sage text-center text-nature-cream text-[10px] font-black uppercase tracking-widest"
              >
                Visit Official Website
              </a>
              
        <div
          className="grid border border-black/10 rounded-xl dark:border-white/10 divide-x divide-black/10 dark:divide-white/10"
          style={{
            gridTemplateColumns: `repeat(${actions.length}, minmax(0, 1fr))`
          }}
        >
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="flex flex-col items-center gap-2 py-4 hover:bg-black/5 transition-colors"
              >
                {action.icon}
                <span className="text-[9px] font-bold uppercase tracking-tighter">
                  {action.label}
                </span>
              </button>
            ))}
        </div>

        <p className="text-xs leading-relaxed opacity-70 font-medium italic border-l-2 border-nature-sage pl-4">
          {book?.description}
        </p>

      </div>
    </aside>
  );
}