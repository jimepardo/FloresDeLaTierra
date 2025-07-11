import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/static/Header';
import Footer from './components/static/Footer';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import HowTo from './pages/HowTo';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ProtectedRoutes from './auth/ProtectedRoutes';
import { useAuth } from './context/AuthContext';
import ProductListByCategory from './pages/ProductListByCategory';

function App() {

  const { userInfo, isLoggedIn } = useAuth();
  const role = userInfo?.role;

  return (
    <>

      <Header />
      <Routes>
        <Route path='/' element={<ProtectedRoutes isAuthenticated={isLoggedIn} requiredRole='client' role={role} >
          <Home />
        </ProtectedRoutes>} />

        <Route path='/login' element={<Login />} />

        <Route path='/admin' element={<ProtectedRoutes isAuthenticated={isLoggedIn} requiredRole='admin' role={role}>
          <Admin />
        </ProtectedRoutes>} />

        <Route path='/products/:category/:subcategory' element={<ProductListByCategory />} />
        
        <Route exact path="/products/:category" element={<ProductListByCategory />} />

        <Route path='/product/:id' element={<ProductDetail />} />

        <Route path='/products' element={<Gallery />} />

        <Route path='/about' element={<About />} />

        <Route path='/howto' element={<HowTo />} />

        <Route path='/contact' element={<Contact />} />

        <Route path='*' element={<NotFound />} />

      </Routes>
      <Footer />

    </>
  )
}

export default App;