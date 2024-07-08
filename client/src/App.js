import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Navbar from './components/Navbar/Navbar';
import Shop from './components/Shop/Shop';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './components/footer/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = async (navigate) => {
    try {
      console.log('handleLogout called');
      await axios.delete('http://localhost:3000/api/v1/logout', { withCredentials: true });
      localStorage.removeItem('token');
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
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/shop' element={<Shop />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
