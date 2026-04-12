import { useState, useEffect } from 'react';
import { ResourceService } from "../../services/resourceServices";
import SearchMobile from '../../components/Search/SearchMobile';
import SearchDesktop from '../../components/Search/SearchDesktop';
import { useSearchParams } from 'react-router-dom';

export default function Search() {
 
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  // Centralized Logic: Fetching and Debouncing


  const [query, setQuery] = useState(initialQuery);
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

  // Props bundle to keep the return clean
  const searchProps = {
    query,
    setQuery,
    results,
    isLoading,
    hasSearched
  };

  return (
    <main className="min-h-screen bg-nature-bg selection:bg-nature-sage selection:text-nature-cream">
      {/* Mobile Layout (Hidden on Desktop) */}
      <div className="xl:hidden">
        <SearchMobile {...searchProps} />
      </div>

      {/* Desktop Layout (Hidden on Mobile) */}
      <div className="hidden xl:block">
        <SearchDesktop {...searchProps} />
      </div>
    </main>
  );
}