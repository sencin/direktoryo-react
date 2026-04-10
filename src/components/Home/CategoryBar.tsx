import type { Dispatch, SetStateAction } from 'react';

// 1. Define the props interface
interface CategoryBarProps {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

const CATEGORIES = ['Everything', 'Ebooks', 'Audiobooks', 'Magazines', 'Comics'];

// 2. Pass the props into the function
export default function CategoryBar({ active, setActive }: CategoryBarProps) {
  return (
    <div className="
      flex items-center gap-3 px-6 py-4 
      overflow-x-auto no-scrollbar 
      bg-transparent border-b border-black/10 dark:border-white/10
    ">
      {CATEGORIES.map((category) => {
        const isActive = active === category;
        
        return (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`
              /* Structure */
              px-4 py-1.5 whitespace-nowrap transition-all duration-200
              text-[10px] font-bold uppercase tracking-widest
              
              /* Shape & Border */
              border border-black dark:border-nature-cream/30
              rounded-sm 

              /* State Logic using your Palette */
              ${isActive 
                ? 'bg-nature-sage border-nature-sage text-nature-cream shadow-sm' 
                 : 'bg-transparent border-black/20 dark:border-nature-cream/30 text-light-text dark:text-nature-cream hover:bg-black/5'}
            `}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}