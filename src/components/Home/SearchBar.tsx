import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Search, Globe, User, SearchX } from 'lucide-react';
import { ResourceService } from '../../services/resourceServices';


export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch Suggestions (Internal Logic)
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length > 1) {
        const data = await ResourceService.search(query);
        setResults(data.slice(0, 6)); 
        setIsOpen(true);
        setHasSearched(true);
      } else {
        setResults([]);
        setIsOpen(false);
        setHasSearched(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  // Handle Redirection
  const handleNavigation = (searchTerm: string) => {
    setIsOpen(false);
    // Redirects to search page with the query in the URL
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      handleNavigation(query);
    }
  };

  return (
    <div ref={containerRef} className="flex-1 relative h-full">
      <div className=" h-full flex items-center">
        <div className="flex items-center w-full px-4 py-2 bg-nature-bg text-nature-cream border border-nature-sage/60 hover:border-nature-sage rounded-lg shadow-sm transition-colors">
            
            <Search size={18} className="mr-4 opacity-60" />
            
            <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Indeed, JobStreet, etc..."
            className="bg-transparent w-full outline-none font-bold text-sm"
            />
            
        </div>
    </div>


      {/* --- DROPDOWN CONTAINER --- */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-[#1a1a1a] shadow-2xl border border-black/10 z-50 mt-1 py-2 overflow-hidden">
          
          {results.length > 0 ? (
            /* CASE 1: DATA FOUND */
            <>
              {results.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-4 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 text-left transition-colors border-b border-black/5 last:border-0"
                  onClick={() => handleNavigation(item.title)}
                >
                  <div className="w-10 h-10 flex-shrink-0 bg-nature-sage/10 rounded overflow-hidden border border-black/5">
                    {item.image_url ? (
                      <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 opacity-20">
                        <Globe size={14}/>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold truncate uppercase tracking-tight leading-tight">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] opacity-60 flex items-center gap-1 truncate max-w-[120px]">
                        <User size={8} /> {item.author}
                      </span>
                      <span className="text-[8px] bg-nature-sage/20 px-1 rounded text-nature-sage font-black uppercase tracking-tighter">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
              
              <button 
                onClick={() => handleNavigation(query)}
                className="w-full py-2 text-center text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:bg-black/5 transition-all border-t border-black/5"
              >
                See all results for "{query}"
              </button>
            </>
          ) : hasSearched ? (
            /* CASE 2: NO DATA FOUND (hasSearched is true, results is empty) */
            <div className="px-6 py-10 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
              <SearchX size={32} className="opacity-20 mb-3" />
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                No results found for "{query}"
              </p>
              <p className="text-[9px] opacity-30 mt-1">
                Try checking for typos or use different keywords.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}