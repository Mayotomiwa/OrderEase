import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import CartProvider from './contexts/CartContext.tsx';
import WishProvider from './contexts/WishContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </WishProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
