import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, FolderPlus, Link, Layers } from "lucide-react";
import { api } from "../../utils/api";

const CREATE_OPTIONS = [
  {
    id: "resource",
    name: "Resource",
    description: "Add a new book, link, or tool to your archive",
    icon: <Link size={20} />,
    path: "/create/resource"
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
  },
  {
  id: "add-to-collection",
  name: "Add to Collection",
  description: "Attach existing resources to a collection",
  icon: <Layers size={20} />,
  path: "/create/collection/add"
},
{
  id: "view-collections",
  name: "View Collections",
  description: "Browse all your saved collections",
  icon: <FolderPlus size={20} />,
  path: "/collections"
},
{
  id: "view-categories",
  name: "View Categories",
  description: "View and manage all categories",
  icon: <FolderPlus size={20} />,
  path: "/categories"
},
 {
    id: "view-to-resources",
    name: "View Resources",
    description: "View and manage your resources",
    icon: <Layers size={20} />,
    path: "/resources"
  }
];

export default function Create() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const res = await api.get("/users/me");

        if (!isMounted) return;

        const userData = res?.user ?? res?.data?.user;

        if (userData?.id) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        if (isMounted) setIsAuthenticated(false); // 401 lands here
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading || isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream font-mono">
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 animate-pulse">
          loading session...
        </p>
      </div>
    );
  }

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
        {CREATE_OPTIONS.map((option) => {
          const disabled = !isAuthenticated;

          return (
            <button
              key={option.id}
              onClick={() => {
                if (!disabled) navigate(option.path);
              }}
              disabled={disabled}
              className={`w-full flex items-center justify-between p-6 text-left transition-all group
                ${disabled 
                  ? "opacity-30 cursor-not-allowed" 
                  : "hover:bg-nature-nav/40"}
              `}
            >
              <div className="flex items-center gap-6">
                <div
                  className={`p-4 border-2 transition-all
                    ${
                      disabled
                        ? "border-nature-sage/10 text-nature-sage/30"
                        : "border-nature-sage/20 text-nature-sage group-hover:border-nature-sage group-hover:bg-nature-sage group-hover:text-nature-bg"
                    }
                  `}
                >
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
                className={`transition-all
                  ${
                    disabled
                      ? "text-nature-sage/10"
                      : "text-nature-sage/20 group-hover:text-nature-sage group-hover:translate-x-1"
                  }
                `}
              />
            </button>
          );
        })}
      </main>
    </div>
  );
}