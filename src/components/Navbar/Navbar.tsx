import { NavLink } from 'react-router-dom';
import { Home, Search, Bookmark, User, Settings, LogOut, Zap } from 'lucide-react';

const MAIN_LINKS = [
  { label: 'Home', path: '/', icon: <Home size={24} /> },
  { label: 'Search', path: '/search', icon: <Search size={24} /> },
  { label: 'Saved', path: '/saved', icon: <Bookmark size={24} /> },
  { label: 'Account', path: '/account', icon: <User size={24} /> },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 
                    dark:bg-slate-900 dark:border-slate-800
                    md:top-0 md:left-0 md:h-screen md:w-24 md:border-t-0 md:border-r
                    flex md:flex-col items-center transition-colors">
      
      {/* 1. LOGO: Only top on desktop */}
      <div className="hidden md:flex items-center justify-center h-24 w-full">
        <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
          <Zap size={28} fill="currentColor" />
        </div>
      </div>

      {/* 2. MAIN LINKS: Now grouped at the top on desktop */}
      <ul className="flex h-full w-full items-center justify-around 
                     md:h-auto md:flex-col md:gap-10 md:mt-4">
        {MAIN_LINKS.map((link) => (
          <li key={link.path}>
            <NavIcon link={link} />
          </li>
        ))}
      </ul>

      {/* 3. UTILITY LINKS: mt-auto pushes this to the bottom on desktop */}
      <div className="hidden md:flex flex-col items-center gap-10 mt-auto pb-10 w-full">
        <NavIcon link={{ label: 'Settings', path: '/settings', icon: <Settings size={24} /> }} />
        
        {/* Logout Button */}
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer group">
          <LogOut size={24} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-[10px] font-medium tracking-tighter">Logout</span>
        </button>
      </div>
    </nav>
  );
}

// Reusable Icon Component
function NavIcon({ link }: { link: { label: string, path: string, icon: React.ReactNode } }) {
  return (
    <NavLink 
      to={link.path} 
      className={({ isActive }) => `
        flex flex-col items-center gap-1 transition-all duration-200
        ${isActive 
          ? 'text-blue-600 dark:text-blue-400 scale-110' 
          : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}
      `}
    >
      <span>{link.icon}</span>
      <span className="text-[10px] font-medium tracking-tighter">{link.label}</span>
    </NavLink>
  );
}