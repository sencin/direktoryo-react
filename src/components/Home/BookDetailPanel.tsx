import BookDetailBackdrop from './BookDetailBackdrop.tsx';
import BookDetailMobile from './BookDetailMobile';
import BookDetailDesktop from './BookDetailDesktop';

interface Props {
  book: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function BookDetailPanel({ book, isOpen, setIsOpen }: Props) {
  return (
    <>
      <BookDetailBackdrop isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* MOBILE PANEL */}
      <BookDetailMobile
        book={book}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* DESKTOP PANEL */}
      <BookDetailDesktop
        book={book}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}