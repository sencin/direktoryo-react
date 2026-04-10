export default function PromoBanner() {
  return (
    <section className="bg-[#F6E96B] p-8 md:p-12 border-b border-black/10 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tighter leading-none">Read Anywhere. Anytime.</h2>
        <p className="text-sm text-black/70 mb-8 font-medium">Discover, read, listen, and play with ease.</p>
        <button className="w-full max-w-xs py-4 border-[3px] border-black font-black uppercase text-xs tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
          Read Free For 30 Days
        </button>
      </div>
    </section>
  );
}