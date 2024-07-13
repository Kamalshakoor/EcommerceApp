import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Detail = ( { isAuthenticated } ) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
        setProduct(response.data.data);
        const categoryId = response.data.data.relationships.category.data.id;
        if (categoryId) {
          const categoryResponse = await axios.get(`http://localhost:3000/api/v1/categories/${categoryId}`);
          setCategory(categoryResponse.data.data);
        }
        // console.log(product.type);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to add items to the cart.');
      return;
    }
    
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/line_items',
        { product_id: product.id },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success('Item added to cart successfully');
      } else if (response.status === 200 && response.data.message === 'Item already in cart') {
        toast.info('Item is already in the cart');
      }
      
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add item to cart');
    }
  };

  
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
          <Circles color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 mt-5 mb-5">
              <div className="card border-0 shadow">
                <div className="card-body">
                <img
                  src={product.attributes.image ? `https://talkshop-backend.onrender.com${product.attributes.image}` : 'https://via.placeholder.com/150'}
                  alt={product.attributes.name}
                  className="img-fluid w-100 mb-3"
                  onError={e => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                  <h5 className="card-title">{product.attributes.name}</h5>
                  <p className="card-text">{product.attributes.description}</p>
                  <p className="card-text">Price: {product.attributes.price}</p>
                  <p className="card-text">Category: {category ? category.attributes.name : ''}</p> <hr />
                  <button className="btn btn-outline-info w-100" 
                  onClick={handleAddToCart}>Add to Cart</button>
                </div>
              </div>
            </div>
        </div>
      </div>
      )}
    </>
  )
}

export default Detail