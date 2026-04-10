import { useEffect, useState } from 'react';
import HomeHeader from "../../components/Home/HomeHeader";
import CategoryBar from '../../components/Home/CategoryBar';
import BookGrid from '../../components/Home/BookGrid';
import BookDetailPanel from '../../components/Home/BookDetailPanel';
import { MOCK_BOOKS } from '../../services/mockData'; 
import CollectionsBar from '../../components/Home/CollectionsBar';
import { ResourceService } from '../../services/collectionService';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Everything');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collectionBooks, setCollectionBooks] = useState<any[]>([]);
  const [activeCollection, setActiveCollection] = useState<string | number>('All');
  const [isLoading, setIsLoading] = useState(false);

  const isInsideCollection = activeCollection !== 'All';

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
    setIsSidebarOpen(true);
  };

  // Logic for the Category path (Mock Data)
  const categoryBooks = MOCK_BOOKS.filter(book => 
    activeCategory === 'Everything' || book.format === activeCategory
  );

  // Logic for the Collections path (API Data)
  useEffect(() => {
    const loadData = async () => {
      if (activeCollection === 'All') return;
      setIsLoading(true);
      const books = await ResourceService.getCollectionBooks(activeCollection.toString());
      setCollectionBooks(books);
      setIsLoading(false);
    };
    loadData();
  }, [activeCollection]);

  return (
    <div className="flex flex-col min-h-screen bg-light-bg dark:bg-nature-bg text-light-text dark:text-nature-cream transition-colors duration-300">
      <HomeHeader />

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto no-scrollbar space-y-12 py-4">
          
          {/* --- OPTION 1: CATEGORY ENGINE (Only visible when not deep in a collection) --- */}
          {!isInsideCollection && (
            <section className="animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="px-8 mb-4 flex justify-between items-end">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Quick Filter</h2>
              </div>
              <CategoryBar active={activeCategory} setActive={setActiveCategory} />
              <div className="mt-6">
                <BookGrid 
                  title={activeCategory === 'Everything' ? "Recent Resources" : activeCategory}
                  books={categoryBooks} 
                  onBookClick={handleBookClick} 
                />
              </div>
            </section>
          )}

          {/* --- OPTION 2: COLLECTIONS ENGINE --- */}
          <section className={`${!isInsideCollection ? 'pt-8 border-t border-black/5' : ''}`}>
            <div className="px-8 mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-1">
                  {isInsideCollection ? "Viewing Collection" : "Browse by Collection"}
                </h2>
                {isInsideCollection && (
                  <h1 className="text-sm font-black uppercase tracking-tighter">{activeCollection}</h1>
                )}
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