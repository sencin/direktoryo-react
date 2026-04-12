import { 
  Search as SearchIcon, 
  Globe, ArrowRight, Loader2, X 
} from 'lucide-react';
import SearchCategoryList from './SearchCategoryList';

export default function SearchMobile({ query, setQuery, results, isLoading, hasSearched, onBookClick }: any) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER AREA */}
      <div className="bg-nature-nav p-6 pt-12 pb-8 border-b border-nature-cream/10 sticky top-0 z-20">
        <h1 className="text-xl mb-6 font-mono tracking-tighter text-nature-cream">
          Search
        </h1>
        
        <div className="relative">
          <SearchIcon className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${query ? 'text-nature-sage' : 'text-nature-cream/30'}`} size={20} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full py-4 pl-12 pr-12 bg-nature-bg border border-nature-cream/20 text-nature-cream text-sm focus:outline-none focus:border-nature-sage rounded-xl transition-all font-bold placeholder:font-medium placeholder:text-nature-cream/20"
          />
          {query && !isLoading && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-nature-cream/40">
              <X size={18} />
            </button>
          )}
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Loader2 className="animate-spin text-nature-sage" size={18} />
            </div>
          )}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 px-4 overflow-y-auto">
        {query.length > 1 ? (
          /* SEARCH RESULTS LIST */
          <div className="divide-y divide-nature-cream/5 animate-in fade-in duration-300">
            {results.map((item: any) => (
              <div key={item.id} onClick={() => onBookClick(item)}  className="flex items-center gap-4 py-5 group cursor-pointer">
                <div className="w-14 h-14 flex-shrink-0 bg-nature-nav border border-nature-cream/10 rounded-lg overflow-hidden">
                  {item.image_url ? (
                    <img src={item.image_url} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-10"><Globe size={20} /></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-black text-nature-cream uppercase truncate tracking-tight">{item.title}</h4>
                  <p className="text-[10px] text-nature-sage font-bold uppercase tracking-widest">{item.author}</p>
                </div>
                <ArrowRight size={16} className="text-nature-sage" />
              </div>
            ))}
            {hasSearched && results.length === 0 && !isLoading && (
              <div className="py-20 text-center opacity-40">
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">No matches found</p>
              </div>
            )}
          </div>
        ) : (
          /* STATIC CATEGORIES */
          <SearchCategoryList onSelect={(name) => setQuery(name)} />
        )}
      </div>
    </div>
  );
}