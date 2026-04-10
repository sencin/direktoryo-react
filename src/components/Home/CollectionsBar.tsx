import React from 'react';

interface CollectionsBarProps {
  active: string;
  setActive: (category: string) => void;
}

// These match the 'tags' we will look for in MOCK_BOOKS
const COLLECTIONS = [
  'All',
  'Quick Reads',
  'Deep Learning',
  'Focus',
  'Relaxation',
  'Morning Routine'
];

export default function CollectionsBar({ active, setActive }: CollectionsBarProps) {
  return (
    <div className="flex items-center gap-3 px-8 overflow-x-auto no-scrollbar py-2">
      {COLLECTIONS.map((item) => {
        const isActive = active === item;
        
        return (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`
              whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] 
              transition-all duration-300 border
              ${isActive 
                ? 'bg-nature-sage text-nature-cream border-nature-sage shadow-md scale-105' 
                : 'bg-transparent border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'
              }
            `}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}