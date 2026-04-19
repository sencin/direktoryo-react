import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, LogOut, Settings, Shield, 
  Mail, Camera, BookOpen, Users, 
  Bookmark, Edit3 
} from "lucide-react";
import { api } from "../../utils/api";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res?.user ?? res?.data?.user);
      } catch (err) {
        console.error("Failed to fetch user");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {});
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nature-bg text-nature-cream font-mono animate-pulse">
        
        {/* Banner Skeleton */}
        <div className="h-32 md:h-48 bg-nature-sage/10 border-b border-nature-sage/20" />

        <main className="max-w-5xl mx-auto px-6">
          
          {/* Profile Skeleton */}
          <div className="relative -mt-12 mb-12 flex flex-col md:flex-row md:items-end gap-6">
            
            {/* Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-nature-sage/10 border-2 border-nature-sage/20" />

            {/* Name + bio */}
            <div className="flex-1 space-y-3">
              <div className="h-6 w-48 bg-nature-sage/10" />
              <div className="h-3 w-96 bg-nature-sage/10" />
              <div className="h-3 w-80 bg-nature-sage/10" />
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-3 gap-0 border border-nature-sage/10 mb-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 border-r last:border-r-0 border-nature-sage/10 space-y-2"
              >
                <div className="h-6 w-10 bg-nature-sage/10" />
                <div className="h-3 w-16 bg-nature-sage/10" />
              </div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Settings list */}
            <div className="lg:col-span-2 space-y-4">
              <div className="h-3 w-40 bg-nature-sage/10 mb-4" />

              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-5 border border-nature-sage/10 flex items-center gap-6"
                >
                  <div className="w-6 h-6 bg-nature-sage/10" />
                  <div className="space-y-2">
                    <div className="h-3 w-48 bg-nature-sage/10" />
                    <div className="h-2 w-64 bg-nature-sage/10" />
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 border border-nature-sage/10 space-y-3">
                <div className="h-3 w-24 bg-nature-sage/10" />
                <div className="h-2 w-32 bg-nature-sage/10" />
                <div className="h-2 w-28 bg-nature-sage/10" />
              </div>

              <div className="h-12 w-full bg-red-900/10 border border-red-900/20" />
            </div>

          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono pb-20">
      {/* Banner Area */}
      <div className="h-32 md:h-48 bg-nature-sage/10 border-b border-nature-sage/20 relative" />

      <main className="max-w-5xl mx-auto px-6">
        {/* Profile Info Section */}
        <div className="relative -mt-12 mb-12 flex flex-col md:flex-row md:items-end gap-6">
          <div className="relative group w-24 h-24 md:w-32 md:h-32 bg-nature-bg p-1 border-2 border-nature-sage/30">
            <div className="w-full h-full bg-nature-sage/10 flex items-center justify-center relative overflow-hidden">
              <User size={48} className="text-nature-sage/40" />
              <button className="absolute inset-0 bg-nature-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">
                {user?.username || "Architect_01"}
              </h1>
              <button className="p-2 border border-nature-sage/20 hover:bg-nature-sage hover:text-nature-bg transition-colors">
                <Edit3 size={18} />
              </button>
            </div>
            <p className="text-xs md:text-sm text-nature-sage/60 max-w-prose leading-relaxed">
              Archiving the digital ephemeral. Building collections at the intersection of nature and code.
            </p>
          </div>
        </div>

        {/* Stats Grid - Wattpad Inspired */}
        <div className="grid grid-cols-3 gap-0 border border-nature-sage/10 mb-12">
          {[
            { label: "Resources", count: "24", icon: <BookOpen size={14} /> },
            { label: "Collections", count: "8", icon: <Bookmark size={14} /> },
            { label: "Followers", count: "1.2k", icon: <Users size={14} /> },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center p-6 border-r last:border-r-0 border-nature-sage/10 hover:bg-nature-sage/5 transition-colors">
              <span className="text-xl font-black">{stat.count}</span>
              <div className="flex items-center gap-2 opacity-40">
                {stat.icon}
                <span className="text-[10px] uppercase font-bold tracking-widest">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Settings Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-[10px] font-bold text-nature-sage uppercase tracking-[0.3em] mb-4">Account Settings</h2>
            
            {[
              { name: "Personal Information", desc: "Email, Phone, Location", icon: <User size={20} /> },
              { name: "Security & Privacy", desc: "Password, 2FA, Sessions", icon: <Shield size={20} /> },
              { name: "Notifications", desc: "Newsletter and Alerts", icon: <Mail size={20} /> },
              { name: "Interface Prefs", desc: "Theme, Language, Layout", icon: <Settings size={20} /> },
            ].map((item) => (
              <button
                key={item.name}
                className="w-full flex items-center justify-between p-5 border border-nature-sage/10 hover:bg-nature-nav/40 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="text-nature-sage group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black uppercase block">{item.name}</span>
                    <span className="text-[10px] opacity-40 uppercase tracking-tight">{item.desc}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Sidebar / Danger Zone */}
          <div className="space-y-6">
            <div className="p-6 bg-nature-sage/5 border border-nature-sage/10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4">Session Info</h3>
              <div className="space-y-3 opacity-60 text-[10px] uppercase">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-nature-sage">Verified</span>
                </div>
                <div className="flex justify-between">
                  <span>Joined:</span>
                  <span>April 2026</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 p-5 border-2 border-red-900/20 text-red-400 hover:bg-red-950/20 transition-all"
            >
              <LogOut size={20} />
              <span className="font-black uppercase tracking-widest text-sm">Terminate Session</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}