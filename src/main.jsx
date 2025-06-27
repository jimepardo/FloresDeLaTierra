import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <CartProvider>
        <AdminProvider>
          <AuthProvider>
            <App />
            <ToastContainer position='bottom-right' closeOnClick newestOnTop transition={Zoom}/>
          </AuthProvider>
        </AdminProvider>
      </CartProvider>
    </Router>
  </StrictMode>,
)
