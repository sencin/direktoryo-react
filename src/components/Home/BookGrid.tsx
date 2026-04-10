interface BookGridProps {
  title: string;
  books: any[];
  onBookClick: (book: any) => void;
}

export default function BookGrid({ title, books, onBookClick }: BookGridProps) {
  return (
    <section className="p-8">
      <div className="flex justify-between items-end mb-8">
        <h3 className="font-bold text-xl uppercase tracking-widest">{title}</h3>
        <button className="text-[10px] font-bold underline opacity-50 uppercase tracking-widest">more</button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
        {books.map((book) => (
          <div key={book.id} onClick={() => onBookClick(book)} className="cursor-pointer group flex flex-col">
            
            {/* IMAGE CONTAINER */}
            <div className="aspect-[2/3] bg-nature-sage/10 mb-4 border border-black/10 dark:border-white/10 relative overflow-hidden shadow-sm transition-all group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-nature-sage/30">
              
              {book.image_url ? (
                <img 
                  src={book.image_url} 
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                   <div className="opacity-10 font-black text-[8px] uppercase tracking-[0.2em] mb-2">No Preview</div>
                   {/* Using normalized 'title' */}
                   <div className="opacity-20 font-black text-xs uppercase leading-tight">
                    {book.title}
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* TEXT INFO - Cleaned up to use normalized keys */}
            <p className="text-xs font-bold leading-tight uppercase tracking-tighter mb-1 truncate">
              {book.title}
            </p>
            <p className="text-[10px] opacity-60 font-medium truncate">
              {book.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}