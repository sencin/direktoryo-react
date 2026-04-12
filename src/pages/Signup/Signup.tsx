import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({
      username: form.username,
      email: form.email,
      password: form.password,
    });

    navigate('/login');
  };

  return (
    <div className="relative min-h-screen bg-nature-bg text-nature-cream font-mono flex items-center justify-center p-4">
      
      {/* Back Button (same as Login) */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-nature-cream/60 hover:text-nature-cream transition-colors text-xs font-bold uppercase tracking-widest"
      >
        ← Back
      </button>

      <div className="w-full max-w-sm space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Create Account
          </h1>
          <p className="text-xs text-nature-cream/60 font-bold">
            Join Direktoryo and start exploring
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full py-4 px-6 bg-nature-nav border-2 border-nature-sage/30 rounded-xl text-xs font-bold placeholder:text-nature-cream/40 focus:border-nature-sage transition-colors"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full py-4 px-6 bg-nature-nav border-2 border-nature-sage/30 rounded-xl text-xs font-bold placeholder:text-nature-cream/40 focus:border-nature-sage transition-colors"
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full py-4 px-6 bg-nature-nav border-2 border-nature-sage/30 rounded-xl text-xs font-bold placeholder:text-nature-cream/40 focus:border-nature-sage transition-colors"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-nature-cream/40 hover:text-nature-cream transition-colors"
            >
              👁
            </button>
          </div>

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full py-4 px-6 bg-nature-nav border-2 border-nature-sage/30 rounded-xl text-xs font-bold placeholder:text-nature-cream/40 focus:border-nature-sage transition-colors"
          />

          <button
            type="submit"
            className="w-full py-5 bg-nature-sage text-nature-bg rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-black/20 hover:bg-nature-sage/80 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Sign Up
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-[10px] text-nature-cream/40 uppercase tracking-widest">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="underline cursor-pointer hover:text-nature-cream"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}