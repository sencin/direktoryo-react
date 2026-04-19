import { NavLink } from 'react-router-dom';
import { Home, Search, Bookmark, User,  Plus, LogIn } from 'lucide-react';
import { useAuth } from '../../utils/useAuth';

const MAIN_LINKS: NavLinkItem[] = [
  { label: 'Home', path: '/home', icon: Home },     // Just the name
  { label: 'Search', path: '/search', icon: Search },
  { label: 'Create', path: '/create', icon: Plus, authRequired: true},
  { label: 'Saved', path: '/saved', icon: Bookmark, authRequired: true },
  { label: 'Account', path: '/account', icon: User, authRequired: true },
  { label: 'Login', path: '/login', icon: LogIn, guestOnly: true },
];

interface NavLinkItem {
  label: string;
  path: string;
  icon: React.ElementType;
  authRequired?: boolean;
  guestOnly?: boolean;
}

function NavSkeleton() {
  return (
    <div className="flex flex-col items-center gap-1 animate-pulse opacity-20">
      <div className="w-6 h-6 bg-nature-sage rounded-sm" />
      <div className="w-10 h-2 bg-nature-sage rounded-sm" />
    </div>
  );
}

export default function Navbar() {
  const isAuthenticated = useAuth();

  const visibleLinks = MAIN_LINKS.filter((link) => {
    // 1. Show guest-only links (Login) only if NOT authenticated
    if (link.guestOnly) return isAuthenticated === false;
    // 2. Show auth-required links only if authenticated
    if (link.authRequired) return isAuthenticated === true;
    return true;
  });
  
  
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
          {visibleLinks.map((link) => (
            <li key={link.path}>
              <NavIcon link={link} />
            </li>
          ))}


          {isAuthenticated === null && (
            <>
              <li><NavSkeleton /></li>
            </>
          )}

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