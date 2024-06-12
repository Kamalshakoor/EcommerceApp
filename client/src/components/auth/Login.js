import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      toast.success('You are Already Logged In!');
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:3000/api/v1/login', {
        email,
        password
      });

      localStorage.setItem('token', data.token);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials');
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   navigate('/login'); 
  // };

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
              {/* <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
