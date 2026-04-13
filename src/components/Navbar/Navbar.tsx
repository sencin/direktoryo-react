import { NavLink } from 'react-router-dom';
import { Home, Search, Bookmark, User,  Plus } from 'lucide-react';

const MAIN_LINKS: NavLinkItem[] = [
  { label: 'Home', path: '/home', icon: Home },     // Just the name
  { label: 'Search', path: '/search', icon: Search },
  { label: 'Create', path: '/create', icon: Plus },
  { label: 'Saved', path: '/saved', icon: Bookmark },
  { label: 'Account', path: '/account', icon: User },
];

interface NavLinkItem {
  label: string;
  path: string;
  icon: React.ElementType;
}


export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 transition-colors
dark:bg-nature-bg bg-app-dark
border-t border-nature-sage/20
md:top-0 md:left-0 md:h-screen md:w-24 md:border-t-0 md:border-r">
      
      <div className="flex md:flex-col items-center h-full w-full">
        
        {/* 1. LOGO: Swapped blue for app-cream */}
        <div className="hidden md:flex items-center justify-center h-24 w-full">
          <div className="bg-app-cream p-2 rounded-xl text-app-dark shadow-lg shadow-black/20">
            <img 
              src="/icons/direktoryo.svg" 
              alt="Logo"
              className="w-7 h-7 object-contain"
            />
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
      </div>
    </nav>
  );
}

function NavIcon({ link: { label, path, icon: Icon } }: { link: NavLinkItem }) {
 return (
    <NavLink
      to={path}
      className={({ isActive }) => `
        flex flex-col items-center gap-1 transition-all duration-200 
        ${isActive 
          ? 'text-light-text dark:text-nature-cream scale-110' 
          : 'text-light-text/40 dark:text-nature-sage hover:text-light-text dark:hover:text-nature-cream'}
      `}
    >
      {({ isActive }) => (
        <>
          <Icon size={24} fill={isActive ? "#697565" : "none"} />
          <span className="text-[10px] font-medium tracking-tighter">{label}</span>
        </>
      )}
    </NavLink>
  );
}