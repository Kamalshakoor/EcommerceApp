import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exect path="/" element={<Home />}></Route>
          <Route exect path="/home" element={<Home />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/Login' element={<Login />} ></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
