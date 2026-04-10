import { useState, useEffect } from 'react';
import { api } from '../../utils/api';

interface Collection {
  id: number;
  name: string;
}

interface CollectionsBarProps {
  active: string | number;
  setActive: (id: string | number) => void;
}

export default function CollectionsBar({ active, setActive }: CollectionsBarProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const response = await api.get('/collections'); 
        if (response.success) {
          setCollections(response.data);
        }
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-3 px-8 py-2 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-24 bg-black/5 dark:bg-white/5 rounded-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-6 overflow-x-auto no-scrollbar py-4">
      {/* 1. Static "All" Button */}
      <button
        onClick={() => setActive('All')}
        className={`
          whitespace-nowrap px-4 py-1.5  rounded-sm text-[10px] font-black uppercase tracking-[0.15em] 
          transition-all duration-300 border
          ${active === 'All' 
            ? 'bg-nature-sage text-nature-cream border-nature-sage shadow-md scale-105' 
            : 'bg-transparent border-black/10 dark:border-white/10 hover:border-black/30'
          }
        `}
      >
        All
      </button>

      {/* 2. Dynamic Collection Buttons from API */}
      {collections.map((col) => {
        const isActive = active === col.id;
        
        return (
          <button
            key={col.id}
            onClick={() => setActive(col.id)}
            className={`
              whitespace-nowrap px-6 py-2.5  border-black dark:border-nature-cream/30
              rounded-sm text-[10px] font-black uppercase tracking-[0.15em] 
              transition-all duration-300 border
              ${isActive 
                ? 'bg-nature-sage text-nature-cream border-nature-sage shadow-md scale-105' 
                : 'bg-transparent border-black/10 dark:border-white/10 hover:border-black/30'
              }
            `}
          >
            {col.name}
          </button>
        );
      })}
    </div>
  );
}