import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      toast.success('You are Already Logged In!');
      navigate('/');
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:3000/api/v1/register', {
        user: {
          name,
          email,
          password
        }
      });
      toast.success('Account Created Successfully');
      // alert(data);
      console.log(data);
      navigate('/login'); 

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-5 mb-3">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <div className="card border-0">
            <div className="card-header text-center text-success">
              <h3>Welcome to Our Shop</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-success">Signup</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
