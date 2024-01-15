import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import CheckOut from './component/CartComponents/CheckOut';
import Footer from './component/GeneralComponents/Footer';
import NavBar from './component/GeneralComponents/NavBar';
import ForgotPassword from './component/SigninComponents/ForgotPassword';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Products from './pages/Products';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import WishList from './pages/WishList';

export default function App() {

  return (
    <>
      <NavBar />
      <Container fluid className='mb-4'>
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
      </Container>
      <Footer />
    </>
  )
}
