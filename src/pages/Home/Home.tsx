import { useEffect, useState } from 'react';
import HomeHeader from "../../components/Home/HomeHeader";
import CategoryBar from '../../components/Home/CategoryBar';
// import PromoBanner from '../../components/Home/PromoBanner';
import BookGrid from '../../components/Home/BookGrid';
import BookDetailPanel from '../../components/Home/BookDetailPanel';
import { MOCK_BOOKS } from '../../data/mockData'; // Move your data to a separate file
import CollectionsBar from '../../components/Home/CollectionsBar';
import { api } from '../../utils/api';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Everything');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collectionBooks, setCollectionBooks] = useState<any[]>([]);
  const [activeCollection, setActiveCollection] = useState<string | number>('All');
  const [isLoading, setIsLoading] = useState(false);

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
    setIsSidebarOpen(true);
  };

  const categoryBooks = MOCK_BOOKS.filter(book => 
    activeCategory === 'Everything' || book.format === activeCategory
  );

  

useEffect(() => {
  const fetchCollectionBooks = async () => {
    setIsLoading(true);
    try {
      // 1. Determine the correct URL based on selection
      const url = activeCollection === 'All' 
        ? `/collections/resources`              // Endpoint for ALL collection resources
        : `/collections/${activeCollection}/resources`; // Endpoint for specific ID

      // 2. Execute the fetch
      const response = await api.get(url);

      if (response.success) {
        // Normalizing the JSON to match your UI component props
        const normalizedData = response.data.map((item: any) => ({
          ...item,
          id: item.id,
          title: item.name,        // Maps "PSA Serbilis Online" to title
          author: item.creator,    // Maps "Philippine Statistics Authority" to author
          description: item.description,
          url: item.official_url,
          tag: item.media_type ,    // "website", "pdf", etc.
          image_url: item.image_url
        }));
        
        setCollectionBooks(normalizedData);
      }
    } catch (error) {
      console.error("Error fetching collection resources:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchCollectionBooks();
}, [activeCollection]);
  
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
          {isLoading ? (
            <div className="px-8 opacity-20 animate-pulse font-black text-[10px] uppercase">Loading Resources...</div>
          ) : (
            <BookGrid 
              title={activeCollection === 'All' ? "Featured" : "Collection Results"}
              books={collectionBooks} 
              onBookClick={handleBookClick} 
            />
          )}
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

function setIsLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}
