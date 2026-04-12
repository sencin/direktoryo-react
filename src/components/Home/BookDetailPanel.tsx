import BookDetailBackdrop from './BookDetailBackdrop.tsx';
import BookDetailMobile from './BookDetailMobile';
import BookDetailDesktop from './BookDetailDesktop';

interface Props {
  book: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onToggleSave?: (id: number) => Promise<void>;
}

export default function BookDetailPanel({ book, isOpen, setIsOpen, onToggleSave }: Props) {
  return (
    <>
      <BookDetailBackdrop isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* MOBILE PANEL */}
      <BookDetailMobile
        book={book}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onToggleSave={onToggleSave}
      />

      {/* DESKTOP PANEL */}
      <BookDetailDesktop
        book={book}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onToggleSave={onToggleSave}
      />
    </>
  );
}