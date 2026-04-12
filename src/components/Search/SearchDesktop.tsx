import { 
  Search as SearchIcon, Globe, Loader2, SearchX, 
  Download, ListPlus, Bookmark 
} from 'lucide-react';

export default function SearchDesktop({ query, setQuery, results, isLoading, hasSearched }: any) {
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
                <div key={item.id} className="flex flex-col">
                  
                  {/* Top: Cover & Meta */}
                  <div className="flex gap-4 mb-6">
                    <div className="w-28 h-40 flex-shrink-0 bg-nature-nav border border-nature-cream/10 rounded-sm overflow-hidden relative shadow-xl">
                      {item.image_url ? (
                        <img src={item.image_url} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10">
                          <Globe size={32} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 relative">
                      <div className="absolute top-0 right-0">
                        <Bookmark size={20} className="text-nature-cream/20 hover:text-nature-sage cursor-pointer transition-colors" />
                      </div>
                      <h4 className="text-lg font-black text-nature-cream uppercase leading-tight pr-8">
                        {item.title}
                      </h4>
                      <p className="text-xs text-nature-sage font-bold mt-1 uppercase">
                        By {item.author || "Unknown Author"}
                      </p>
                      <p className="text-[11px] text-nature-cream/40 mt-3 line-clamp-4 leading-relaxed font-medium">
                        {item.description || "No description available for this resource."}
                      </p>
                      <p className="text-[10px] text-nature-cream/20 font-black uppercase tracking-tighter mt-2">
                         {item.category || "General"}
                      </p>
                    </div>
                  </div>

                  {/* Action Bar */}
                     <a
                      href={item?.url || '#'}
                      target="_blank"
                      className="block w-full py-5 bg-nature-sage text-center text-nature-cream text-[10px] font-black uppercase tracking-widest"
                    >
                      Visit Official Website
                    </a>


                  <div className="flex items-center justify-around border-t border-nature-cream/10 pt-4">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase text-nature-cream/40 hover:text-nature-cream transition-colors">
                      <Download size={14} /> Download
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase text-nature-cream/40 hover:text-nature-cream transition-colors">
                      <ListPlus size={14} /> Add to List
                    </button>
                  </div>
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