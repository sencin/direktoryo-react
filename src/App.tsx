import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Saved from './pages/Saved/Saved';
import Account from './pages/Account/Account';

function App() {
  return (
    <BrowserRouter>
        {/* The background and text now adapt using v4 utilities */}
        <div className="flex flex-col md:flex-row min-h-screen transition-colors duration-500 
                    /* LIGHT MODE COLORS */
                    bg-light-bg text-light-text 
                    /* DARK MODE COLORS */
                    dark:bg-nature-bg dark:text-nature-cream">
          <Navbar />
          <main className="flex-1 pb-20 md:pb-0 md:pl-28 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search/>} />
              <Route path="/saved" element={<Saved/>} />
              <Route path="/account" element={<Account/>} />
            {/* Add more routes here */}
          </Routes>
          </main>
        </div>
 
    </BrowserRouter>
  );
}

export default App
