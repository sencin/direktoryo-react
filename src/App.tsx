import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Saved from './pages/Saved/Saved';
import Account from './pages/Account/Account';
import Login from './pages/Login/Login';
import Landing from './pages/Landing/Landing';
import Signup from './pages/Signup/Signup';
import { useAuthInit } from './utils/useAuthInit';
import AuthGuard from './utils/AuthGuard';

function AppLayout() {
  const location = useLocation();
  const isAuthPage = ["/login", "/landing", "/signup"].includes(location.pathname);
  const { loading } = useAuthInit();
  
   if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-bg text-nature-cream">
        <p className="text-xs uppercase tracking-widest opacity-60">
          loading session...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen transition-colors duration-500 
                    /* LIGHT MODE COLORS */
                    bg-light-bg text-light-text 
                    /* DARK MODE COLORS */
                    dark:bg-nature-bg dark:text-nature-cream">
      
     {!isAuthPage && <Navbar />}

     <main
        className={`flex-1 transition-all ${
          isAuthPage
            ? "" 
            : "pb-20 md:pb-0 md:pl-24"
        }`}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />

          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/account" element={<Account />} />
          
         <Route path="/login" element={
            <AuthGuard>
              <Login />
            </AuthGuard>
          } />

          <Route path="/signup" element={
            <AuthGuard>
              <Signup />
            </AuthGuard>
          } />

          <Route path="/landing" element={
            <AuthGuard>
              <Landing />
            </AuthGuard>
          } />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;