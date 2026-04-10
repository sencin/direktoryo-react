import { useState } from 'react';
import HomeHeader from "../../components/Home/HomeHeader";
import CategoryBar from '../../components/Home/CategoryBar';
import PromoBanner from '../../components/Home/PromoBanner';
import BookGrid from '../../components/Home/BookGrid';
import BookDetailPanel from '../../components/Home/BookDetailPanel';
import { MOCK_BOOKS } from '../../data/mockData'; // Move your data to a separate file

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Everything');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
    setIsSidebarOpen(true);
  };

  const filteredBooks = activeCategory === 'Everything' 
    ? MOCK_BOOKS 
    : MOCK_BOOKS.filter(b => b.format === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-light-bg dark:bg-nature-bg text-light-text dark:text-nature-cream transition-colors duration-300">
      <HomeHeader />

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto no-scrollbar">
          <CategoryBar active={activeCategory} setActive={setActiveCategory} />
          
          {activeCategory === 'Everything' && <PromoBanner />}
          
          <BookGrid 
            title={activeCategory === 'Everything' ? "Popular Books" : activeCategory} 
            books={filteredBooks} 
            onBookClick={handleBookClick} 
          />
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