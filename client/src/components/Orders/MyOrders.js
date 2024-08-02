import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [inProgress, setInProgress] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/orders", {
          withCredentials: true,
        });
        const orders = data.data;
        console.log("Fetched Orders:", orders);

        const pendingOrders = orders.filter((order) => order.attributes.status === "pending");
        const inProgressOrders = orders.filter((order) => order.attributes.status === "in_progress");
        const completedOrders = orders.filter((order) => order.attributes.status === "completed");

        setCompleted(completedOrders);
        setPending(pendingOrders);
        setInProgress(inProgressOrders);

        console.log("Pending Orders:", pendingOrders);
        console.log("In Progress Orders:", inProgressOrders);
        console.log("Completed Orders:", completedOrders);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch orders.");
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/orders/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Order Cancelled successfully");
      console.log(data);
      // Optionally refetch orders to update the UI
      const updatedOrders = pending.filter((order) => order.id !== id);
      setPending(updatedOrders);
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel order.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card mt-5 shadow p-3 mb-5 bg-white rounded">
            <div className="card-header">
              <h3 className="card-title text-center">My Orders</h3>
            </div>
            <div className="card-body">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Pending
                  </button>
                  <button
                    className="nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    In-Progress
                  </button>
                  <button
                    className="nav-link"
                    id="nav-contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-contact"
                    type="button"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Completed
                  </button>
                </div>
              </nav>
              <div className="tab-content mt-4" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="col-3">Order ID</th>
                        <th className="col-3">Price</th>
                        <th className="col-3">Status</th>
                        <th className="col-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pending.length > 0 ? (
                        pending.map((order) => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>${order.attributes.price}</td>
                            <td>{order.attributes.status}</td>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleCancelOrder(order.id)}
                              >
                                Cancel Order
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No pending orders</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="col-3">Order ID</th>
                        <th className="col-3">Price</th>
                        <th className="col-3">Status</th>
                        <th className="col-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inProgress.length > 0 ? (
                        inProgress.map((order) => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>${order.attributes.price}</td>
                            <td>{order.attributes.status}</td>
                            <td className="text-center">
                              <button type="button" className="btn btn-outline-warning">
                                See Detail
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No orders in progress</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="col-3">Order ID</th>
                        <th className="col-3">Price</th>
                        <th className="col-3">Status</th>
                        <th className="col-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completed.length > 0 ? (
                        completed.map((order) => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>${order.attributes.price}</td>
                            <td>{order.attributes.status}</td>
                            <td className="text-center">
                              <button type="button" className="btn btn-outline-success">
                                Rating
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No completed orders</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
