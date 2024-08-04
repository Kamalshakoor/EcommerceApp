import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Navbar from './components/Navbar/Navbar';
import Shop from './components/Shop/Shop';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './components/footer/Footer';
import Detail from './components/Shop/Detail';
import Cart from './components/Cart/Cart';
import MyOrders from './components/Orders/MyOrders';
import About from './components/AboutUs/About';
import Contact from './components/ContactUs/Contact';
import SearchResults from './components/SearchResults/SearchResults';
import AllOrders from './components/Orders/AllOrders';




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/check_session', { withCredentials: true });
        // console.log(response.data);
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
    checkAuth();
  }, []);
  

  const handleLogout = async (navigate) => {
    try {
      // console.log('handleLogout called');
      await axios.delete('http://localhost:3000/api/v1/logout', { withCredentials: true });
      setIsAuthenticated(false);
      toast.success('Logout successful');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} isAdmin={isAdmin} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin = {setIsAdmin} />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/products/:id' element={<Detail isAuthenticated={isAuthenticated} />} />
          <Route path='/cart' element={<Cart isAuthenticated={isAuthenticated} />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/search' element={<SearchResults />} />
          <Route path='/all-orders' element={<AllOrders />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
