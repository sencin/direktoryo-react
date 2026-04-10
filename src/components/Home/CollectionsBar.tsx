import { useState, useEffect } from 'react';
import { api } from '../../utils/api';

interface Collection {
  id: number;
  name: string;
  image_url?: string; // Assuming your API provides a cover for the collection
  description?: string;
}

interface CollectionsBarProps {
  active: string | number; // Add this line
  setActive: (id: string | number) => void;
}

export default function CollectionsBar({setActive }: CollectionsBarProps) {
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-6 px-8 py-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-3">
             <div className="aspect-[4/5] bg-black/5 dark:bg-white/5 rounded-2xl" />
             <div className="h-3 w-3/4 bg-black/5 dark:bg-white/5 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-8 gap-8 px-8 py-4">
      {collections.map((col) => (
        <button
          key={col.id}
          onClick={() => setActive(col.id)}
          className="group text-left space-y-4"
        >
          {/* Visual Container */}
          <div className="
            relative aspect-[4/5] bg-nature-sage/5 border border-black/5 
            rounded-3xl overflow-hidden transition-all duration-500
            group-hover:shadow-2xl group-hover:border-nature-sage/30
          ">
            {col.image_url ? (
              <img 
                src={col.image_url} 
                alt={col.name}
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-nature-sage/10 text-4xl font-black opacity-10">
                {col.name[0]}
              </div>
            )}

            {/* Subtle Overlay to make text readable if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Labeling */}
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase tracking-widest leading-tight">
              {col.name}
            </h3>
            <p className="text-[9px] font-bold opacity-30 uppercase tracking-tighter">
              Browse Collection →
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}