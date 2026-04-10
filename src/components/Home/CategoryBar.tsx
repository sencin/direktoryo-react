import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { api } from '../../utils/api';

interface Category {
  id: number;
  name: string;
  icon_label: string | null;
  description: string;
  created_at: string;
}

interface ApiResponse {
  data: Category[];
}

interface CategoryBarProps {
  active: number | 'all';
  setActive: Dispatch<SetStateAction<number | 'all'>>;
}

export default function CategoryBar({ active, setActive }: CategoryBarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await api.get('/categories');

      // ✅ normalize all possible API shapes
      const raw =
        (response as any)?.data?.data ??
        (response as any)?.data ??
        [];

      setCategories(Array.isArray(raw) ? raw : []);

    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  fetchCategories();
}, []);

  if (loading) {
    return (
      <div className="flex gap-3 px-6 py-4 overflow-hidden animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-6 w-20 bg-black/5 dark:bg-white/5 rounded-sm"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="
      flex items-center gap-3 px-6 py-4 
      overflow-x-auto no-scrollbar 
      bg-transparent border-b border-black/10 dark:border-white/10
    ">
      {/* Everything button */}
      <button
        onClick={() => setActive('all')}
        className={`
          px-4 py-1.5 whitespace-nowrap transition-all duration-200
          text-[10px] font-bold uppercase tracking-widest border rounded-sm
          ${active === 'all'
            ? 'bg-nature-sage border-nature-sage text-nature-cream shadow-sm'
            : 'bg-transparent border-black/20 dark:border-nature-cream/30 hover:bg-black/5'}
        `}
      >
        Everything
      </button>

      {categories.map((category) => {
        const isActive = active === category.id;

        return (
          <button
            key={category.id}
            onClick={() => setActive(category.id)}
            className={`
              px-4 py-1.5 whitespace-nowrap transition-all duration-200
              text-[10px] font-bold uppercase tracking-widest border rounded-sm

              ${isActive 
                ? 'bg-nature-sage border-nature-sage text-nature-cream shadow-sm' 
                : 'bg-transparent border-black/20 dark:border-nature-cream/30 hover:bg-black/5'}
            `}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}