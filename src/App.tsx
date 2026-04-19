import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Saved from './pages/Saved/Saved';
import Account from './pages/Account/Account';
import Login from './pages/Login/Login';
import Landing from './pages/Landing/Landing';
import Signup from './pages/Signup/Signup';
import Create from './pages/Create/Create';
import { useAuthInit } from './utils/useAuthInit';
import PublicRoute from './utils/PublicRoute';
import CreateResource from './pages/Create/CreateResource';
import CreateCollection from './pages/Create/CreateCollection';
import CreateCategory from './pages/Create/CreateCategory';
import EditResource from './pages/Create/Edit/EditResource';
import AddToCollection from './pages/Create/AddToCollection';
import CollectionView from './pages/Create/CollectionView';
import CollectionsIndex from './pages/Create/CollectionsIndex';
import EditCollection from './pages/Create/Edit/EditCollection';
import CategoriesIndex from './pages/Create/CategoriesIndex';
import EditCategory from './pages/Create/Edit/EditCategory';
import ResourcesIndex from './pages/Create/ResourcesIndex';
import RemoveFromCollection from './pages/Create/RemoveFromCollection';
import ProtectedLayout from './utils/ProtectedLayout';

function AppLayout() {
  const location = useLocation();
  const isAuthPage = ["/login", "/", "/signup"].includes(location.pathname);
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
    <div className="flex flex-col md:flex-row min-h-screen transition-colors duration-500 bg-light-bg text-light-text  dark:bg-nature-bg dark:text-nature-cream">
     {!isAuthPage && <Navbar />}
     <main className={`flex-1 transition-all ${isAuthPage ? "" : "pb-20 md:pb-0 md:pl-24"}`}>
        <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />

            <Route element={<ProtectedLayout />}>
             
              <Route path="/saved" element={<Saved />} />
              <Route path="/account" element={<Account />} />
              <Route path="/create" element={<Create />} />
              {/* Sub-pages */}
              <Route path="/create/resource" element={<CreateResource />} />
              <Route path="/create/collection" element={<CreateCollection />} />
              <Route path="/create/category" element={<CreateCategory />} />
              <Route path="/create/collection/add" element={<AddToCollection />} />
              <Route path="/create/collection/remove" element={<RemoveFromCollection />} />
              <Route path="/edit/resource/:id" element={<EditResource />} />
              <Route path="/collections/:id" element={<CollectionView />} />
              <Route path="/collections" element={<CollectionsIndex />} />
              <Route path="/collections/:id/edit" element={<EditCollection />} />

              <Route path="/categories" element={<CategoriesIndex />} />
              <Route path="/categories/:id/edit" element={<EditCategory />} />
        
              <Route path="/resources" element={<ResourcesIndex />} />
              <Route path="/resources/:id/edit" element={<EditResource />} />
              </Route>

              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />

              <Route path="/signup" element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } />

              <Route path="/" element={
                <PublicRoute>
                  <Landing />
                </PublicRoute>
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