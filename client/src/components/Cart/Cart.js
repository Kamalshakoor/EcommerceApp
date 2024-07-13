import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const fetchCartAndProducts = async () => {
    try {
      if (isFirstLoad) {
        setIsLoading(true);
      }
      const cartResponse = await axios.get(
        "http://localhost:3000/api/v1/line_items",
        { withCredentials: true }
      );
      const cartItems = cartResponse.data.data;

      const productRequests = cartItems.map((item) =>
        axios.get(
          `http://localhost:3000/api/v1/products/${item.relationships.product.data.id}`,
          { withCredentials: true }
        )
      );
      const productResponses = await Promise.all(productRequests);

      const cartProductsWithDetails = cartItems.map((item, index) => ({
        ...item,
        product: productResponses[index].data.data,
      }));

      setCartProducts(cartProductsWithDetails);
    } catch (error) {
      console.error("Error fetching cart or products:", error);
    } finally {
      setIsLoading(false);
      setIsFirstLoad(false);
    }
  };

  useEffect(() => {
    fetchCartAndProducts();
  }, []);

  const incrementQuantity = async (productId) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/line_items/${productId}/increment`,
        {},
        { withCredentials: true }
      );
      await fetchCartAndProducts();
      toast.success("Quantity incremented!");
    } catch (error) {
      console.error("Error incrementing quantity:", error);
      toast.error("Failed to increment item quantity");
    }
  };

  const decrementQuantity = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/line_items/${productId}/decrement`,
        {},
        { withCredentials: true }
      );

      if (
        response.status === 200 &&
        response.data.message === "Item removed from cart"
      ) {
        // Item was removed from cart
        setCartProducts((prevCartProducts) =>
          prevCartProducts.filter((item) => item.id !== productId)
        );
        toast.info("Item removed from cart");
      } else {
        // Update the quantity in the cart product list
        const updatedCartItem = response.data.data;
        setCartProducts((prevCartProducts) =>
          prevCartProducts.map((item) =>
            item.id === updatedCartItem.id
              ? {
                  ...item,
                  attributes: {
                    ...item.attributes,
                    quantity: updatedCartItem.attributes.quantity,
                  },
                }
              : item
          )
        );
        toast.success("Quantity decremented!");
      }
    } catch (error) {
      console.error("Error decrementing quantity:", error);
      toast.error("Failed to decrement item quantity");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header text-center">
              <h3>Cart</h3>
            </div>
            <div className="card-body">
              {isLoading && (
                <div className="d-flex justify-content-center">
                  {!isFirstLoad && (
                    <div className="spinner-border text-info" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </div>
              )}
              {!isLoading && cartProducts.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((item) => (
                      <tr key={item.id}>
                        <td>{item.product.attributes.name}</td>
                        <td className="text-center">
                          <div
                            className="btn-group btn-group-sm"
                            role="group"
                            aria-label="Quantity buttons"
                          >
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => decrementQuantity(item.id)}
                            >
                              -
                            </button>
                            <span className="btn btn-light">
                              {item.attributes.quantity}
                            </span>
                            <button
                              className="btn btn-outline-success"
                              onClick={() => incrementQuantity(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>{item.product.attributes.price}</td>
                        <td>
                          {Math.round(
                            item.product.attributes.price *
                              item.attributes.quantity *
                              100
                          ) / 100}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3">
                        <h5>Grand Total</h5>
                      </td>
                      <td>
                        <h5>
                          $
                          {cartProducts
                            .reduce(
                              (sum, item) =>
                                sum +
                                item.product.attributes.price *
                                  item.attributes.quantity,
                              0
                            )
                            .toFixed(2)}
                        </h5>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3"></td>
                      <td>
                        <button className="btn btn-outline-success form-control">
                          Checkout
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className="d-flex justify-content-center">
                  {isLoading && isFirstLoad && (
                    <div className="spinner-border text-info" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                  {!isLoading && !isFirstLoad && (
                    <p className="mt-5">No items in the cart</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
