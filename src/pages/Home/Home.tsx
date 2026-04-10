import { Menu, Bell } from 'lucide-react';
import CategoryBar from '../../components/Home/CategoryBar';
import { useState } from 'react';

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('Everything');
    
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Page-Specific Header */}
     <header className="flex items-center justify-between h-16 bg-transparent border-t border-b">
        <button className="px-6 h-full flex items-center border-r">
            <Menu size={24} />
        </button>

        <h1 className="text-xl font-bold tracking-widest text-light-text dark:text-nature-cream uppercase">
          Litverse
        </h1>

       <button className="px-6 h-full flex items-center border-l">
            <Bell size={24} />
        </button>
      </header>

       <CategoryBar active={activeCategory} setActive={setActiveCategory} />

      {/* 2. The Yellow Promo Banner from your image */}
      <section className="bg-[#F6E96B] p-6 text-center border-b border-black/10">
        <h2 className="text-2xl font-bold text-black mb-1">
          Read Anywhere. Anytime.
        </h2>
        <p className="text-sm text-black/70 mb-4">
          Discover, read, listen, and play with ease.
        </p>
        <button className="w-full py-3 border-2 border-black font-bold uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-colors">
          Read Free For 30 Days
        </button>
        <button className="mt-2 text-xs underline text-black/60">
          Cancel anytime
        </button>
      </section>

      {/* 3. Book Content (Popular Section) */}
      <main className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-light-text dark:text-nature-cream">Popular</h3>
          <button className="text-sm underline opacity-60">more</button>
        </div>
        
        {/* Your book grid would go here */}
      </main>
    </div>
  );
}