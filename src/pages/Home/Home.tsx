import { useState } from 'react';
import HomeHeader from "../../components/Home/HomeHeader";
import CategoryBar from '../../components/Home/CategoryBar';
import PromoBanner from '../../components/Home/PromoBanner';
import BookGrid from '../../components/Home/BookGrid';
import BookDetailPanel from '../../components/Home/BookDetailPanel';
import { MOCK_BOOKS } from '../../data/mockData'; // Move your data to a separate file
import CollectionsBar from '../../components/Home/CollectionsBar';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Everything');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [activeCollection, setActiveCollection] = useState('All');

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
    setIsSidebarOpen(true);
  };

  const categoryBooks = MOCK_BOOKS.filter(book => 
    activeCategory === 'Everything' || book.format === activeCategory
  );

  const filteredBooks = activeCategory === 'Everything' 
    ? MOCK_BOOKS 
    : MOCK_BOOKS.filter(b => b.format === activeCategory);

// Filter Logic for Grid 2 (Collections)
  const collectionBooks = MOCK_BOOKS.filter(book => 
    activeCollection === 'All' || (book.tags && book.tags.includes(activeCollection))
  );

  return (
    <div className="flex flex-col min-h-screen bg-light-bg dark:bg-nature-bg text-light-text dark:text-nature-cream transition-colors duration-300">
      <HomeHeader />

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto no-scrollbar space-y-16 py-10">
      
      {/* SECTION 1: THE CATEGORY ENGINE */}
      <section>
        <div className="px-8 mb-4 flex justify-between items-end">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Category</h2>
          <span className="text-[9px] opacity-20 font-bold">{categoryBooks.length} Items</span>
        </div>
        <CategoryBar 
          active={activeCategory} 
          setActive={setActiveCategory} 
        />
        <div className="mt-6">
          <BookGrid 
            title={activeCategory}
            books={categoryBooks} 
            onBookClick={handleBookClick} 
          />
        </div>
      </section>

      {/* SECTION 2: THE COLLECTIONS ENGINE */}
      <section className="pt-8 border-t border-black/5">
        <div className="px-8 mb-4 flex justify-between items-end">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Collections</h2>
          <span className="text-[9px] opacity-20 font-bold">{collectionBooks.length} Items</span>
        </div>
        <CollectionsBar 
          active={activeCollection} 
          setActive={setActiveCollection} 
        />
        <div className="mt-6">
          <BookGrid 
            title={activeCollection === 'All' ? "Featured" : activeCollection}
            books={collectionBooks} 
            onBookClick={handleBookClick} 
          />
        </div>
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