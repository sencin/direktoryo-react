import { Download, Bookmark, List, ArrowLeft, Share2, Pencil } from 'lucide-react';
import { useEffect } from 'react';
import { auth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
export default function BookDetailMobile({ book, isOpen, setIsOpen, onToggleSave }: any) {


   const isSaved = book?.is_saved;
   const currentUser = auth.getUser();
   const isOwner = currentUser?.id === book?.user_id;
  const navigate = useNavigate(); 

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
    <aside
      className={`
        fixed z-[70] bg-light-bg dark:bg-nature-bg
        inset-0 w-full h-full
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        xl:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* 1. THE HEADER (Added per instruction) */}
      <div className="flex justify-between items-center h-16 px-4 border-b border-black/10 sticky top-0 bg-light-bg dark:bg-nature-bg z-10">
        <button onClick={() => setIsOpen(false)} className="p-2">
          <ArrowLeft size={24} className="opacity-80" />
        </button>
        
        <h1 className="text-sm font-black uppercase tracking-[0.3em]">
          Direktoryo
        </h1>
        
        <button className="p-2">
          <Share2 size={22} className="opacity-80" />
        </button>
      </div>

      <div className={`h-full overflow-y-auto`}>
        <div className="p-6 space-y-8 pb-24">

          {book ? (
            <>
              {/* Note: Kept your original Resource Details label logic here */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Resource Details
                </span>
              </div>

              {/* IMAGE (Your original UI) */}
              <div className="w-full aspect-[4/3] bg-nature-sage/5 rounded-2xl overflow-hidden">
                {book.image_url ? (
                  <img src={book.image_url} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-4xl opacity-10 font-black">
                    {book.title?.[0]}
                  </div>
                )}
              </div>

              {/* TITLE (Your original UI) */}
              <div>
                <h4 className="text-2xl font-black uppercase leading-tight">{book.title}</h4>
                <p className="text-sm opacity-60">Provider: {book.author}</p>
              </div>

              {/* CTA (Your original UI) */}
              <a
                href={book?.url || '#'}
                target="_blank"
                className="block w-full py-5 bg-nature-sage text-center text-nature-cream text-[10px] font-black uppercase tracking-widest"
              >
                Visit Official Website
              </a>

              {/* ACTIONS (Your original UI) */}
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

              {/* DESCRIPTION (Your original UI) */}
              <p className="text-xs opacity-70 italic leading-relaxed">
                {book.description}
              </p>
            </>
          ) : (
            <div className="text-center opacity-20 text-[10px] uppercase pt-20">
              Select a title
            </div>
          )}

        </div>
      </div>
    </aside>
  );
}