import { useNavigate } from "react-router-dom"; // 1. Import the hook
import { ChevronRight, FolderPlus, Link, Layers } from "lucide-react";

const CREATE_OPTIONS = [
  {
    id: "resource",
    name: "Resource",
    description: "Add a new book, link, or tool to your archive",
    icon: <Link size={20} />,
    path: "/create/resource" // The path to navigate to
  },
  {
    id: "collection",
    name: "Collection",
    description: "Group multiple resources into a themed set",
    icon: <Layers size={20} />,
    path: "/create/collection"
  },
  {
    id: "category",
    name: "Category",
    description: "Create a broad classification for your library",
    icon: <FolderPlus size={20} />,
    path: "/create/category"
  }
];

export default function Create() {
  const navigate = useNavigate(); // 2. Initialize the navigate function

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono">
      <header className="px-6 py-8 border-b border-nature-sage/10">
        <h1 className="text-2xl font-black uppercase tracking-tighter">
          Creation Hub
        </h1>
        <p className="text-[10px] font-bold text-nature-sage uppercase tracking-[0.2em] mt-2">
          Expand the directory
        </p>
      </header>

      <main className="divide-y divide-nature-sage/10">
        {CREATE_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => navigate(option.path)} // 3. Use navigate on click
            className="w-full flex items-center justify-between p-6 hover:bg-nature-nav/40 transition-all group text-left"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 border-2 border-nature-sage/20 text-nature-sage group-hover:border-nature-sage group-hover:bg-nature-sage group-hover:text-nature-bg transition-all">
                {option.icon}
              </div>

              <div className="space-y-1">
                <span className="text-lg font-black tracking-tight uppercase block">
                  {option.name}
                </span>
                <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest block">
                  {option.description}
                </span>
              </div>
            </div>

            <ChevronRight 
              size={22} 
              className="text-nature-sage/20 group-hover:text-nature-sage group-hover:translate-x-1 transition-all" 
            />
          </button>
        ))}
      </main>
    </div>
  );
}