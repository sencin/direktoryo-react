export default function BookDetailBackdrop({ isOpen, setIsOpen }: any) {
  return (
    <div
      className={`fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity duration-500 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setIsOpen(false)}
    />
  );
}