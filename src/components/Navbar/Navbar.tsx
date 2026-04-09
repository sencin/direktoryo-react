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
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 transition-colors
                    /* Use your palette here */
                    bg-app-dark border-t border-app-muted/20 
                    md:top-0 md:left-0 md:h-screen md:w-24 md:border-t-0 md:border-r">
      
      <div className="flex md:flex-col items-center h-full w-full">
        
        {/* 1. LOGO: Swapped blue for app-cream */}
        <div className="hidden md:flex items-center justify-center h-24 w-full">
          <div className="bg-app-cream p-2 rounded-xl text-app-dark shadow-lg shadow-black/20">
            <Zap size={28} fill="currentColor" />
          </div>
        </div>

        {/* 2. MAIN LINKS */}
        <ul className="flex h-full w-full items-center justify-around 
                       md:h-auto md:flex-col md:gap-10 md:mt-4">
          {MAIN_LINKS.map((link) => (
            <li key={link.path}>
              <NavIcon link={link} />
            </li>
          ))}
        </ul>

        {/* 3. UTILITY LINKS */}
        <div className="hidden md:flex flex-col items-center gap-10 mt-auto pb-10 w-full">
          <NavIcon link={{ label: 'Settings', path: '/settings', icon: <Settings size={24} /> }} />
          
          <button className="flex flex-col items-center gap-1 text-app-muted hover:text-app-light transition-colors cursor-pointer group">
            <LogOut size={24} className="group-hover:translate-x-1 transition-transform" />
            <span className="text-[10px] font-medium tracking-tighter">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavIcon({ link }: { link: { label: string, path: string, icon: React.ReactNode } }) {
  return (
    <NavLink 
      to={link.path} 
      className={({ isActive }) => `
        flex flex-col items-center gap-1 transition-all duration-200
        /* Active = Cream color, Inactive = Muted steel color */
       ${isActive 
        ? 'text-light-text dark:text-nature-cream scale-110' 
        : 'text-light-text/40 dark:text-nature-sage hover:text-light-text dark:hover:text-nature-cream'}
      `}
    >
        
      <span>{link.icon}</span>
      <span className="text-[10px] font-medium tracking-tighter">{link.label}</span>
    </NavLink>
  );
}