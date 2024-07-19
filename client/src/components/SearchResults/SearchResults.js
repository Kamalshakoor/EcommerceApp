import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location; //access data passed via navigate
  const products = state?.searchResults || [];

  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col-md-12">
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center mb-5 border-bottom pb-4">Search Results</h1>
        </div>
      </div>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <div className="col-md-4 mb-4" key={product.attributes.id}>
              <div className="card mb-3">
                <img
                  src={product.attributes.image ? `https://talkshop-backend.onrender.com${product.attributes.image}` : 'https://via.placeholder.com/200'}
                  className="card-img-top"
                  alt={product.attributes.name}
                  onError={e => {
                    e.target.src = 'https://via.placeholder.com/200';
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{product.attributes.name}</h5>
                    <p className="card-text">{product.attributes.price}</p>
                  </div>
                  <p className="card-text">{truncate(product.attributes.description, 60)}</p>
                  <div className="d-flex justify-content-between">
                    <p className="card-text">Rating: {product.attributes.rating}</p>
                    <button className="btn btn-outline-warning" onClick={() => navigate(`/products/${product.attributes.id}`)}>Show Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-md-12 text-center">
            <h4>No products found</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
