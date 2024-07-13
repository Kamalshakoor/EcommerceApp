import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const isScrolling = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/products`);
        setProducts(response.data.data);
        setDisplayedProducts(response.data.data.slice(0, 10)); // Display initial 10 products
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleScroll = () => {
    if (isScrolling.current) return;
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10) {
      isScrolling.current = true;
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (page > 1) {
      const start = (page - 1) * 10;
      const end = start + 10;
      setDisplayedProducts(prevProducts => [
        ...prevProducts,
        ...products.slice(start, end)
      ]);
      isScrolling.current = false;
    }
  }, [page, products]);
  

  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
          <Circles color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <div className="container mb-5 mt-5">
          <div className="row">
            {displayedProducts.map((product) => (
              <div className="col-md-4" key={product.id}>
                <div className="card mb-3">
                  <img
                    src={product.image ? `https://talkshop-backend.onrender.com${product.attributes.image}` : 'https://via.placeholder.com/150'}
                    className="card-img-top"
                    alt={product.name}
                    onError={e => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{product.attributes.name}</h5>
                      <p className="card-text">{product.attributes.price}</p>
                    </div>
                    <p className="card-text">{truncate(product.attributes.description, 60)}</p>
                    <div className="d-flex justify-content-between">
                      <p className="card-text">Rating : {product.attributes.rating}</p>
                      <button className="btn btn-outline-warning" onClick={() => navigate(`/products/${product.id}`)}>Show Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
