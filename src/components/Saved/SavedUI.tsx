import { Search, Settings2 } from "lucide-react";

export const TabButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void; }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 border-2 text-[10px] font-black uppercase tracking-widest transition-all
      ${active 
        ? "bg-nature-sage border-nature-sage text-nature-cream" 
        : "border-nature-sage/30 opacity-60 hover:opacity-100 dark:text-nature-cream"}`}
  >
    {label}
  </button>
);

export const FilterBar = ({ activeTab, tabs, onTabChange }: { activeTab: string, tabs: string[], onTabChange: (t: string) => void }) => (
  <section className="bg-nature-sage/5 dark:bg-nature-nav/40 p-6 space-y-4 border-b border-nature-sage/10">
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {tabs.map((tab) => (
        <TabButton key={tab} label={tab} active={activeTab === tab} onClick={() => onTabChange(tab)} />
      ))}
    </div>
    <div className="flex gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          className="w-full bg-light-bg dark:bg-nature-bg border-2 border-nature-sage/20 py-4 px-12 text-xs font-bold uppercase tracking-tight outline-none focus:border-nature-sage transition-colors"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
      </div>
      <button className="bg-light-bg dark:bg-nature-bg border-2 border-nature-sage/20 p-4 hover:border-nature-sage transition-colors">
        <Settings2 size={18} />
      </button>
    </div>
  </section>
);