import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../src/css/About.css';
import '../src/css/Accounts.css';
import '../src/css/Cart.css';
import '../src/css/Contact.css';
import '../src/css/Footer.css';
import '../src/css/Home.css';
import '../src/css/NavBar.css';
import '../src/css/Product.css';
import '../src/css/SignUp.css';

const App = React.lazy(() => import('./App.tsx'));
const AuthProvider = React.lazy(() => import('./contexts/AuthContext.tsx'));
const CartProvider = React.lazy(() => import('./contexts/CartContext.tsx'));
const WishProvider = React.lazy(() => import('./contexts/WishContext.tsx'));
const AddressProvider = React.lazy(() => import('./contexts/AddressContext'));
const Instagram = React.lazy(() => import('react-content-loader'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<Instagram />}>
        <CartProvider>
          <WishProvider>
            <AddressProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </AddressProvider>
          </WishProvider>
        </CartProvider>
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
