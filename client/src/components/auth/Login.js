import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const effectRan = useRef(false); // Ensure useEffect runs only once

 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:3000/api/v1/login', {
        email,
        password
      },
      { withCredentials: true } //this compulsory for session persistance accross frontend and backend
    );
      // console.log('Login response data:', data);
      
      setIsAuthenticated(true); 
      // console.log(data.data.attributes.role)
      setIsAdmin(data.data.attributes.role === 'admin');  // Conditionally setisAdmin based on user's role
      // console.log(setIsAdmin)
      toast.success('Login successful');
      navigate('/'); 
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials');
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <div className="card border-0">
            <div className="card-header text-center text-success">
              <h3>Welcome Back</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
