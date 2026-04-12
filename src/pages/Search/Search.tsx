import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Add this import
import { ResourceService } from "../../services/resourceServices";
import SearchMobile from '../../components/Search/SearchMobile';
import SearchDesktop from '../../components/Search/SearchDesktop';
import BookDetailPanel from '../../components/Home/BookDetailPanel';

export default function Search() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || ''; // Get 'q' from URL

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);


  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBookClick = (item: any) => {
  setSelectedBook(item);
  setIsSidebarOpen(true);
};

  // Sync state if URL changes while on the page
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length > 1) {
        setIsLoading(true);
        setHasSearched(true);
        try {
          const data = await ResourceService.search(query);
          setResults(data);
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setHasSearched(false);
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 400);
    return () => clearTimeout(debounce);
  }, [query]);

  const searchProps = {
    query,
    setQuery,
    results,
    isLoading,
    hasSearched,
    onBookClick: handleBookClick
  };

  return (
    <main className="min-h-screen bg-nature-bg selection:bg-nature-sage selection:text-nature-cream">
      <div className="xl:hidden">
        <SearchMobile {...searchProps} />
      </div>

      <div className="hidden xl:block">
        <SearchDesktop {...searchProps} />
      </div>

        <div className="xl:hidden">
  <BookDetailPanel
    book={selectedBook}
    isOpen={isSidebarOpen}
    setIsOpen={setIsSidebarOpen}
  />
</div>


    </main>
  );
}