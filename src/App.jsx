import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/static/Header';
import Nav from './components/static/Nav';
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
import { CartContext } from './context/CartContext';


function App() {

  const { isAuthenticated } = useContext(CartContext)

  return (
    <>
      
      
      <Router>
        <Header />
      <Nav />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/login' element={<Login />} />

          <Route path='/admin' element={<ProtectedRoutes isAuthenticated={isAuthenticated}> <Admin /> </ProtectedRoutes>} />

          <Route path='/products' element={<Gallery />} />

          <Route path='/products/:id' element={<ProductDetail />} />

          <Route path='/about' element={<About />} />

          <Route path='/howto' element={<HowTo />} />

          <Route path='/contact' element={<Contact />} />

          <Route path='*' element={<NotFound />} />

        </Routes>
         <Footer />
      </Router>
      
     
    </>
  )
}

export default App;