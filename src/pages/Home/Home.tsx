import { useEffect, useRef, useState } from 'react';
import HomeHeader from "../../components/Home/HomeHeader";
import CategoryBar from '../../components/Home/CategoryBar';
import BookGrid from '../../components/Home/BookGrid';
import BookDetailPanel from '../../components/Home/BookDetailPanel';
import CollectionsBar from '../../components/Home/CollectionsBar';
import { CollectionService } from '../../services/collectionService';
import { ResourceService } from '../../services/resourceServices';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collectionBooks, setCollectionBooks] = useState<any[]>([]);
  const [activeCollection, setActiveCollection] = useState<string | number>('All');
  const [isLoading, setIsLoading] = useState(false);
  const collectionCache = useRef<Record<string, any[]>>({});
  const [resourceBooks, setResourceBooks] = useState<any[]>([]);
  const isInsideCollection = activeCollection !== 'All';


  const handleBookClick = (book: any) => {
    setSelectedBook(book);
    setIsSidebarOpen(true);
  };


 useEffect(() => {
  const loadData = async () => {
    if (activeCollection === 'All') return;

    const key = activeCollection.toString();

    // ✅ Show cached instantly (if exists)
    if (collectionCache.current[key]) {
      setCollectionBooks(collectionCache.current[key]);
    } else {
      setIsLoading(true);
    }

    try {
      const books = await CollectionService.getCollectionBooks(key);

      // ✅ Update cache
      collectionCache.current[key] = books;

      // ✅ Update UI (only if changed to avoid unnecessary re-render)
      setCollectionBooks(prev => {
        const isSame = JSON.stringify(prev) === JSON.stringify(books);
        return isSame ? prev : books;
      });

      console.log("Refetch Success")

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  loadData();
}, [activeCollection]);


useEffect(() => {
  const loadData = async () => {
    try {
      if (activeCategory === 'all') {
        const resourceBooks = await ResourceService.fetchAllResource();
        console.log(resourceBooks)
        setResourceBooks(resourceBooks);
      } else {
        console.log("am i triggered")
        const resourceBooks = await ResourceService.fetchByCategoryId(activeCategory);

        console.log(resourceBooks)
        setResourceBooks(resourceBooks);
      }
    } catch (error) {
      console.error('Failed to load resources:', error);
      setResourceBooks([]);
    }
  };

  loadData();
}, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-light-bg dark:bg-nature-bg text-light-text dark:text-nature-cream transition-colors duration-300">
      <HomeHeader />

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto no-scrollbar space-y-8 py-4">
          
          {/* --- OPTION 1: CATEGORY ENGINE (Only visible when not deep in a collection) --- */}
          {!isInsideCollection && (
            <section className="animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="px-8 flex justify-between items-end">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Quick Filter</h2>
              </div>

              {/* SKELETON LOGIC */}
              {isLoading ? (
                <div className="space-y-6">
                  {/* Category Bar Skeleton */}
                  <div className="flex gap-3 px-8 overflow-hidden">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-8 w-20 bg-black/5 dark:bg-white/5 rounded-sm animate-pulse" />
                    ))}
                  </div>
                  
                  {/* Book Grid Skeleton */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 mt-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-3 animate-pulse">
                        <div className="aspect-[3/4] bg-black/5 dark:bg-white/5 rounded-2xl" />
                        <div className="h-3 w-3/4 bg-black/5 dark:bg-white/5 rounded" />
                        <div className="h-2 w-1/2 bg-black/5 dark:bg-white/5 rounded opacity-50" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <CategoryBar active={activeCategory} setActive={setActiveCategory} />
                  <div className="mt-4">
                    <BookGrid 
                      title={"Resources"}
                      books={resourceBooks} 
                      onBookClick={handleBookClick} 
                    />
                  </div>
                </>
              )}
            </section>
          )}

          {/* --- OPTION 2: COLLECTIONS ENGINE --- */}
          <section className={`${!isInsideCollection ? 'pt-8 border-t border-black/5' : ''}`}>
            <div className="px-6 mb-4 flex justify-between items-center">
              <div>
                <h2
                    className={
                      isInsideCollection
                        ? "text-[7px] font-black tracking-[0.3em] opacity-30 mb-1"
                        : "text-sm tracking-widest"
                    }
                  >
                    {isInsideCollection ? "Viewing Collection" : "Browse by Collection"}
                  </h2>
              </div>

              {isInsideCollection && (
                <button 
                  onClick={() => setActiveCollection('All')}
                  className="px-4 py-2 bg-black/5 hover:bg-black/10 rounded-full text-[9px] font-black uppercase tracking-widest transition-colors"
                >
                  ← Back to Directory
                </button>
              )}
            </div>

            {!isInsideCollection ? (
              /* THE MENU GRID */
              <CollectionsBar active={activeCollection} setActive={setActiveCollection} />
            ) : (
              /* THE FILTERED RESULTS */
              <div className="animate-in fade-in zoom-in-95 duration-500">
                {isLoading ? (
                  <div className="px-8 py-20 text-center opacity-20 animate-pulse font-black text-[10px] uppercase tracking-[0.5em]">
                    Fetching Archive...
                  </div>
                ) : (
                  <BookGrid 
                    title="Collection Results"
                    books={collectionBooks} 
                    onBookClick={handleBookClick} 
                  />
                )}
              </div>
            )}
          </section>
        </main>

        <BookDetailPanel 
          book={selectedBook} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />
      </div>
    </div>
  );
}