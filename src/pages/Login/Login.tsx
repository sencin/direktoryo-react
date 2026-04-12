import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-nature-bg text-nature-cream font-mono flex items-center justify-center p-4">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-nature-cream/60 hover:text-nature-cream transition-colors text-xs font-bold uppercase tracking-widest"
      >
        ← Back
      </button>

      <div className="w-full max-w-sm space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Create an account
          </h1>
          <p className="text-xs font-bold leading-relaxed text-nature-cream/60 max-w-[28ch] mx-auto">
            One Directory for all internet information
          </p>
        </div>

        {/* Social Buttons */}
        <div className="space-y-4">
          
          <button className="w-full flex items-center justify-center gap-4 py-4 px-6 border-2 border-nature-sage/30 rounded-xl hover:bg-nature-nav transition-colors">
            <img src="https://authjs.dev/img/providers/google.svg" className="h-5 w-5" />
            <span className="text-xs font-black uppercase tracking-widest text-nature-cream/70">
              Continue with Google
            </span>
          </button>

          <button className="w-full flex items-center justify-center gap-4 py-4 px-6 border-2 border-nature-sage/30 rounded-xl hover:bg-nature-nav transition-colors">
            <img src="https://authjs.dev/img/providers/facebook.svg" className="h-5 w-5" />
            <span className="text-xs font-black uppercase tracking-widest text-nature-cream/70">
              Continue with Facebook
            </span>
          </button>

          <button className="w-full flex items-center justify-center gap-4 py-4 px-6 border-2 border-nature-sage/30 rounded-xl hover:bg-nature-nav transition-colors">
            <img src="https://authjs.dev/img/providers/apple.svg" className="h-5 w-5 invert" />
            <span className="text-xs font-black uppercase tracking-widest text-nature-cream/70">
              Continue with Apple
            </span>
          </button>

        </div>

        {/* Divider */}
        <div className="relative flex items-center gap-4 text-center">
          <div className="flex-grow border-t border-nature-sage/30" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-nature-cream/40 whitespace-nowrap">
            or sign up with
          </span>
          <div className="flex-grow border-t border-nature-sage/30" />
        </div>

        {/* Form */}
        <form className="space-y-6">
          
          <input 
            type="email" 
            placeholder="Email address"
            className="w-full py-4 px-6 bg-nature-nav border-2 border-nature-sage/30 rounded-xl text-xs font-bold placeholder:text-nature-cream/40 focus:border-nature-sage focus:ring-0 transition-colors"
          />

          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full py-4 px-6 bg-nature-nav border-2 border-nature-sage/30 rounded-xl text-xs font-bold placeholder:text-nature-cream/40 focus:border-nature-sage focus:ring-0 transition-colors"
            />

            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-nature-cream/40 hover:text-nature-cream transition-colors"
            >
              👁
            </button>
          </div>

          <div className="flex justify-between items-center">
            <a
                href="/signup"
                className="text-[10px] font-black uppercase tracking-widest text-nature-cream/50 underline hover:text-nature-cream transition-colors"
            >
                Create Account
            </a>
                <a
                href="/recovery"
                className="text-[10px] font-black uppercase tracking-widest text-nature-cream/50 underline hover:text-nature-cream transition-colors"
            >
                Recovery Password
            </a>
         </div>

          <button 
            type="submit"
            className="w-full py-5 bg-nature-sage hover:bg-nature-sage/80 rounded-xl shadow-lg shadow-black/20 text-xs font-black uppercase tracking-[0.2em] text-nature-bg transition-all"
          >
            Continue
          </button>

        </form>

      </div>
    </div>
  );
}