import { 
  Search as SearchIcon, Globe, Loader2, SearchX,
  ArrowRight
} from 'lucide-react';

export default function SearchDesktop({ query, setQuery, results, isLoading, hasSearched, onBookClick }: any) {
  return (
    <div className="flex flex-col items-center min-h-screen p-10 pt-16 bg-nature-bg">
      <div className="w-full max-w-7xl space-y-12">
        
        {/* --- COMPACT SEARCH HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-nature-cream/10">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-nature-cream uppercase tracking-tighter italic">
              Search
            </h1>
            <p className="text-nature-cream/30 font-bold uppercase tracking-[0.2em] text-[10px]">
              Exploring the Direktoryo Archive
            </p>
          </div>

          <div className="relative group w-full max-w-md">
            <SearchIcon 
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                query ? 'text-nature-sage' : 'text-nature-cream/10 group-focus-within:text-nature-sage'
              }`} 
              size={18} 
            />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, keyword..."
              className="w-full py-3 pl-12 pr-10 bg-nature-nav/50 border border-nature-cream/10 text-sm font-bold text-nature-cream outline-none rounded-xl focus:border-nature-sage focus:bg-nature-nav transition-all placeholder:text-nature-cream/10"
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 className="animate-spin text-nature-sage" size={16} />
              </div>
            )}
          </div>
        </div>

        {/* --- RESULTS GRID (Remains the same as style2.webp layout) --- */}
        <div className="min-h-[400px]">
          {hasSearched && results.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
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
            </div>
          ) : hasSearched && !isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-20">
              <SearchX size={80} className="mb-6" />
              <h2 className="text-3xl font-black uppercase tracking-widest text-nature-cream">No results for "{query}"</h2>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}