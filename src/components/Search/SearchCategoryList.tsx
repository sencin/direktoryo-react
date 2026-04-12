import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import * as LucideIcons from 'lucide-react';
import { ChevronRight } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  icon_label: string | null;
}

export default function SearchCategoryList({ onSelect }: { onSelect: (name: string) => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.get('/categories');
        const raw = (response as any)?.data?.data ?? (response as any)?.data ?? [];
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

  // --- ICON RESOLVER ---
  const getCategoryIcon = (category: Category) => {
    // 1. Priority: Check icon_label from DB
    if (category.icon_label && (LucideIcons as any)[category.icon_label]) {
      const Icon = (LucideIcons as any)[category.icon_label];
      return <Icon size={20} />;
    }

    // 2. Fallback: Map by category name
    const fallbackMap: Record<string, keyof typeof LucideIcons> = {
      'Education': 'GraduationCap',
      'Employment': 'Briefcase',
      'Finance': 'Banknote',
      'Health': 'HeartPulse',
      'Legal': 'Scale',
      'Philippine Government': 'Landmark',
    };

    const iconName = fallbackMap[category.name] || 'Globe';
    const FallbackIcon = (LucideIcons as any)[iconName];
    return <FallbackIcon size={20} />;
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 w-full bg-nature-nav animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="divide-y divide-nature-cream/10">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.name)}
          className="w-full flex items-center justify-between py-4 hover:bg-nature-nav transition-colors group text-left px-4"
        >
          <div className="flex items-center gap-4">
            <span className="text-nature-sage group-hover:scale-110 transition-transform">
              {getCategoryIcon(category)}
            </span>
            <span className="text-[15px] font-black tracking-tight text-nature-cream uppercase">
              {category.name}
            </span>
          </div>
          <ChevronRight size={18} className="text-nature-cream/20 group-hover:text-nature-sage" />
        </button>
      ))}
    </div>
  );
}