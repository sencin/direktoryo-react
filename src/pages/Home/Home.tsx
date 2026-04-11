import { useEffect, useState } from 'react';
import HomeHeader from "../../components/Home/HomeHeader";
import CategoryBar from '../../components/Home/CategoryBar';
import BookGrid from '../../components/Home/BookGrid';
import BookDetailPanel from '../../components/Home/BookDetailPanel';
import CollectionsBar from '../../components/Home/CollectionsBar';
import { CollectionService } from '../../services/collectionService';
import { ResourceService } from '../../services/resourceServices';
import HomeBookGrid from '../../components/Home/HomeBookGrid';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collectionBooks, setCollectionBooks] = useState<any[]>([]);
  const [activeCollection, setActiveCollection] = useState<string | number>('All');
  const [isLoading, setIsLoading] = useState(false);
  const [resourceBooks, setResourceBooks] = useState<any[]>([]);
  const isInsideCollection = activeCollection !== 'All';
  const [isResourceLoading, setIsResourceLoading] = useState(false);
  const [showAllCollection, setShowAllcollection] = useState(false);

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
    setIsSidebarOpen(true);
  };


useEffect(() => {
  // If 'All' is selected, we clear and stop
  if (activeCollection === 'All') {
    setCollectionBooks([]);
    return;
  }

  // A flag to prevent state updates if the user closes the collection mid-fetch
  let isMounted = true;

  const loadData = async () => {
    // 1. Reset UI instantly (Wipe previous data)
    setCollectionBooks([]); 
    setIsLoading(true);

    try {
      const books = await CollectionService.getCollectionBooks(activeCollection.toString());

      if (isMounted) {
        setCollectionBooks(books);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      if (isMounted) setIsLoading(false);
    }
  };

  loadData();

  // 2. THE CLEANUP: This runs when activeCollection changes OR the component closes
  return () => {
    isMounted = false;
    setCollectionBooks([]); // "Delete" the data from memory
    setIsLoading(false);
  };
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
                    <HomeBookGrid 
                      title="Featured Resources"
                      books={resourceBooks}
                      loading={isResourceLoading}
                      onBookClick={handleBookClick}
                      // Where the "More" link goes (e.g., your search/browse page)
                      viewMorePath="/browse" 
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
                        : "text-sm uppercase tracking-widest"
                    }
                  >
                    {isInsideCollection ? "Viewing Collection" : "Browse by Collection"}
                  </h2>
              </div>
              
              {!isInsideCollection && (
                  <button 
                    onClick={() => setShowAllcollection(!showAllCollection)}
                    className="text-[10px] font-bold  opacity-50 uppercase tracking-widest hover:opacity-100 transition-opacity"
                  >
                    {showAllCollection ? 'Show Less ' : 'View More '}
                <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                )}

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
              <CollectionsBar active={activeCollection} setActive={setActiveCollection}  limit={showAllCollection ? undefined : 8}/>
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