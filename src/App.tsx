import React from 'react';
import { Container } from 'react-bootstrap';
import { Instagram } from 'react-content-loader';
import { Route, Routes } from 'react-router-dom';
import Footer from './component/GeneralComponents/Footer';
import NavBar from './component/GeneralComponents/NavBar';

const CheckOut = React.lazy(() => import('./component/CartComponents/CheckOut'));
const ForgotPassword = React.lazy(() => import('./component/SigninComponents/ForgotPassword'));
const About = React.lazy(() => import('./pages/About'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));
const Profile = React.lazy(() => import('./pages/Profile'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const WishList = React.lazy(() => import('./pages/WishList'));

export default function App() {
  return (
    <>
      <NavBar />
      <Container fluid className='mb-4'>
        <React.Suspense fallback={<Instagram />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/wishlist' element={<WishList />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/products/:id' element={<Products/>} />
            <Route path='/checkout' element={<CheckOut />} />
          </Routes>
        </React.Suspense>
      </Container>
      <Footer />
    </>
  )
}
