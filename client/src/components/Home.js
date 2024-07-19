import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ReactTyped } from 'react-typed';

const Home = () => {
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState('');

  const searchProducts = async (query) => {
    try {
      if (query === '') {
        toast.info('Please write something in the search bar to search');
        return;
      }
      const response = await axios.get(`http://localhost:3000/api/v1/products/search?query=${query}`);
      if (response.status === 200) {
        const products = response.data.data;
        navigate('/search', { state: { searchResults: products } });
      } else {
        console.error('Failed to search products');
      }
    } catch (error) {
      console.error('Search products error:', error);
    }
  };

  return (
    <div className="container-fluid main">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="uppertext text-center pt-5 mt-5">
            <h6 className='pt-3 mb-4 mt-2'>
              <ReactTyped
                className="typed-text"
                strings={["Welcome to Talkshop", "The best way to find yourself is to lose yourself in the service of others."]}
                typeSpeed={60}
                backSpeed={60}
                loop
              />
            </h6>
            <p>Your one-stop shop for the best products and services.</p>
          </div>
          <div className="searchfield text-center mt-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search for products..."
                onChange={(e) => setSearchProduct(e.target.value)}
                value={searchProduct}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-light search-btn"
                  type="button"
                  onClick={() => searchProducts(searchProduct)}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
