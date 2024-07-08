import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Circles } from 'react-loader-spinner'

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const isScrolling = useRef(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/products`);
        setProducts(response.data.data);
        setDisplayedProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleScroll = () => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10) {
      setPage(page + 1);
      setDisplayedProducts((prevProducts) => {
        const start = prevProducts.length + 1;
        const end = start + Math.min(10, products.length - prevProducts.length);
        const newProducts = products.slice(start, end);
        return [...prevProducts, ...newProducts];
      });
    }
    window.setTimeout(() => {
      isScrolling.current = false;
    }, 200);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [products, page])


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
                      e.target.src = 'https://via.placeholder.com/150'
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.attributes.name}</h5>
                    <p className="card-text">{product.attributes.description}</p>
                    <p className="card-text">{product.attributes.price}</p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Shop

