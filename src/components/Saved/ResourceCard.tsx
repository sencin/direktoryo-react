import { memo } from "react";
import { Download, ListPlus, Bookmark } from "lucide-react";

interface ResourceCardProps {
  item: any;
  onToggleSave: (id: number) => void;
}

export const ResourceCard = memo(({ item, onToggleSave }: ResourceCardProps) => {
  const isSaved = item.is_saved === 1 || item.is_saved === true;

  return (
    <div className="flex flex-col space-y-5 group animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex gap-5">
        <div className="w-1/3 shrink-0">
          <div className="border-2 border-nature-sage/30 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] aspect-[3/4] bg-nature-nav overflow-hidden">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-2xl font-black opacity-10">
                {item.name?.[0]}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0 relative">
          <button
            onClick={() => onToggleSave(item.id)}
            className="absolute right-0 top-0 p-1 text-nature-sage/40 hover:text-nature-sage transition-colors"
          >
            <Bookmark
              size={22}
              className={isSaved ? "fill-nature-sage text-nature-sage" : ""}
            />
          </button>
          <h2 className="text-lg font-black uppercase tracking-tight pr-8 leading-tight truncate">
            {item.name}
          </h2>
          <p className="text-[10px] font-bold text-nature-sage uppercase tracking-widest mt-1">
            {item.creator || "Unknown Creator"}
          </p>
          <p className="text-[11px] leading-relaxed opacity-60 line-clamp-4 mt-2">
            {item.description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <a
          href={item.official_url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 bg-nature-sage text-nature-cream text-center text-[11px] font-black uppercase tracking-[0.2em] shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
        >
          Visit Official Website
        </a>
        <div className="flex justify-between px-2 pt-2 border-t border-nature-sage/10">
          <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
            <Download size={14} /> Download
          </button>
          <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
            <ListPlus size={14} /> Add to List
          </button>
        </div>
      </div>
    </div>
  );
});