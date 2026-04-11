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
  const [isResourceLoading, setIsResourceLoading] = useState(false);
  

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
    setIsSidebarOpen(true);
  };


useEffect(() => {
  const loadData = async () => {
    const key = activeCollection.toString();
    if (key === 'All') return;

    // 1. IMMEDIATELY tell the UI we are switching
    // This stops the BookGrid from rendering old books
    setIsLoading(true);

    // 2. Check cache
    if (collectionCache.current[key]) {
      const cachedBooks = collectionCache.current[key];
      setCollectionBooks(cachedBooks);
      
      // If we want it to feel "Instant", we flip loading off immediately.
      // React batches these two sets, so the UI jumps straight to new data.
      setIsLoading(false); 
    } else {
      // No cache? Clear the UI so we don't see Category A's books
      setCollectionBooks([]);
    }

    try {
      const books = await CollectionService.getCollectionBooks(key);
      collectionCache.current[key] = books;

      setCollectionBooks(prev => {
        const isSame = JSON.stringify(prev) === JSON.stringify(books);
        return isSame ? prev : books;
      });
    } catch (err) {
      console.error(err);
    } finally {
      // This ensures loading turns off after the API call (if not already off)
      setIsLoading(false);
    }
  };

  loadData();
}, [activeCollection]);


useEffect(() => {
  const loadData = async () => {
    setIsResourceLoading(true)
    
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
      finally{
      setIsResourceLoading(false);
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
                <CategoryBar active={activeCategory} setActive={setActiveCategory} />
              {/* SKELETON LOGIC */}        
                 <div className="mt-4">
                    <BookGrid 
                      title="Resources"
                      books={resourceBooks}
                      loading={isResourceLoading}   
                      onBookClick={handleBookClick} 
                    />
                  </div>
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
              <CollectionsBar 
                active={activeCollection} 
                setActive={setActiveCollection} 
              />
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                <BookGrid 
                  title="Collection Results"
                  books={collectionBooks} 
                  loading={isLoading}   // 👈 ONLY source of truth
                  onBookClick={handleBookClick} 
                />
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