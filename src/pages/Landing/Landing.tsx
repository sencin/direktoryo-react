import { Link } from 'react-router-dom';

export default function Landing() {

  return (
    <div className="min-h-screen bg-nature-bg text-nature-cream font-mono p-8 flex flex-col items-center justify-between">
      
      <div className="w-full max-w-[340px] flex flex-col items-center">
        
        {/* Logo */}
        <div className="mt-12 mb-10">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <path d="M50 95C70 95 85 80 85 60C85 45 75 30 50 5C25 30 15 45 15 60C15 80 30 95 50 95Z" fill="#697565" />
            <path d="M50 85C62 85 72 75 72 63C72 54 65 45 50 30C35 45 28 54 28 63C28 75 38 85 50 85Z" fill="#ECDFCC" opacity="0.15" />
          </svg>
        </div>

        {/* Content */}
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold leading-tight uppercase tracking-tight">
            Get the most out of Direktoryo
          </h1>
          
          <p className="text-[13px] leading-relaxed text-nature-cream/60 px-2">
            Unlock full access to the world's most fascinating digital library. Discover millions of ebooks, government websites, deep secrets, and more.
          </p>
        </div>

        {/* Form */}
        <div className="w-full mt-10 space-y-6">
          

          {/* Buttons */}
          <div className="space-y-4">
            
           <Link
                to="/"
                className="block w-full text-center py-4 border-2 border-nature-sage/30 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-nature-nav transition-colors"
                >
                Continue with limited access
          </Link>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-nature-sage/30"></div>
              <span className="px-4 text-[10px] text-nature-cream/40 font-bold uppercase">or</span>
              <div className="flex-grow border-t border-nature-sage/30"></div>
            </div>

            <Link 
                to="/login"
                className="block w-full text-center py-5 bg-nature-sage text-nature-bg rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-black/20 hover:bg-nature-sage/80 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                Login
            </Link>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-[340px] flex justify-between text-[10px] font-black text-nature-cream/40 uppercase tracking-widest pb-4">
        <Link to="/privacy" className="hover:text-nature-cream transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-nature-cream transition-colors">Terms of Use</Link>
      </div>
    </div>
  );
}