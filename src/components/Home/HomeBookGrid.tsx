import { Link } from 'react-router-dom'; // Or your preferred routing library

interface BookGridProps {
  title: string;
  books: any[];
  loading?: boolean;
  onBookClick: (book: any) => void;
  viewMorePath: string; // The URL for the full archive or search page
}

export default function HomeBookGrid({
  title,
  books = [],
  loading = false,
  onBookClick,
  viewMorePath
}: BookGridProps) {
  // Limit to 20 for the Home view
  const displayedBooks = books.slice(0, 20);
  const hasBooks = displayedBooks.length > 0;
  
  const isActuallyLoading = loading || (books.length === 0 && title !== "Recent Resources");

  return (
    <section className="px-8 mb-16">

      {/* HEADER WITH MORE LINK */}
      <div className="flex justify-between items-center mb-8  pb-4">
        <h3 className="text-sm tracking-widest uppercase">{title}</h3>
        
        <Link 
          to={viewMorePath}
          className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-all flex items-center gap-2 group"
        >
          View More
        </Link>
      </div>

      {/* GRID CONFIGURATION */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-10 gap-x-6 gap-y-10">

        {/* SKELETON LOADING */}
        {loading && (
          <>
            {[...Array(10)].map((_, i) => (
              <div key={`skeleton-${i}`} className="space-y-3 animate-pulse">
                <div className="aspect-[2/3] bg-black/5 dark:bg-white/5 rounded-2xl" />
                <div className="h-3 w-3/4 bg-black/5 dark:bg-white/5 rounded" />
                <div className="h-2 w-1/2 bg-black/5 dark:bg-white/5 rounded opacity-50" />
              </div>
            ))}
          </>
        )}

        {/* MAPPED BOOKS (SLICED) */}
        {!isActuallyLoading &&
          hasBooks &&
          displayedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => onBookClick(book)}
              className="cursor-pointer group flex flex-col"
            >
              <div className="aspect-[2/3] bg-nature-sage/10 mb-4 border border-black/10 dark:border-white/10 relative overflow-hidden shadow-sm transition-all group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-nature-sage/30">

                {book.image_url ? (
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="opacity-10 font-black text-[8px] uppercase tracking-[0.2em] mb-2">
                      No Preview
                    </div>
                    <div className="opacity-20 font-black text-xs uppercase leading-tight">
                      {book.title}
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xs font-bold uppercase truncate">
                {book.title}
              </p>
              <p className="text-[10px] opacity-60 truncate">
                {book.author || book.creator}
              </p>
            </div>
          ))}

        {/* EMPTY STATE */}
        {!loading && !hasBooks && (
          <div className="col-span-full text-center opacity-30 text-xs uppercase tracking-widest py-10">
            No resources found uwu
          </div>
        )}

      </div>
    </section>
  );
}