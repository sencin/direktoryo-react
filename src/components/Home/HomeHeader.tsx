import { Menu, Bell, User, ChevronDown } from 'lucide-react';
import SearchBar from './SearchBar';


export default function HomeHeader() {
  return (
    <>
      {/* --- DESKTOP VIEW (Visible md and up) --- */}
    <header className="hidden md:flex items-stretch h-16 border-b border-black/10 dark:border-white/10">
        {/* Search Bar - Matches the Yellow Theme */}
          <div className="flex-1 px-4 max-w-xl">
          <SearchBar />
        </div>
        
         <div className="flex items-stretch ml-auto">
    
        {/* User Profile */}
        <div className="flex items-center gap-3 px-6  border-r border-black/10 dark:border-r-nature-nav">
          <div className="w-8 h-8 bg-nature-sage rounded-full flex items-center justify-center overflow-hidden border border-black/10">
            <User size={20} className="text-nature-cream" />
          </div>
          <div className="text-left hidden lg:block">
            <p className="text-[11px] font-bold leading-none uppercase tracking-tighter">Bruce Wayne</p>
            <p className="text-[10px] opacity-60 font-medium">Story Seeker</p>
          </div>
          <ChevronDown size={14} className="opacity-40" />
        </div>

        {/* Notifications */}
        <button className="px-6 flex items-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <Bell size={20} />
        </button>

      </div>
      </header>

      {/* --- MOBILE VIEW (Visible below md) --- */}
      <header className="flex md:hidden items-center justify-between h-16 border-b border-black/10 dark:border-white/10">
        <button className="px-6 h-full flex items-center border-r border-black/10 dark:border-white/10">
          <Menu size={24} />
        </button>
        
        <h1 className="text-lg font-bold tracking-[0.2em] uppercase">
          Direktoryo
        </h1>
        
        <button className="px-6 h-full flex items-center border-l border-black/10 dark:border-white/10">
          <Bell size={24} />
        </button>
      </header>
    </>
  );
}