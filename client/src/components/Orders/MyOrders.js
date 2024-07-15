import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {

  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [in_progress, setInProgress] = useState([]);

  useEffect(() => {
    const resp = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/orders",
          { withCredentials: true }
        );
        const orders = data.data;
        console.log(orders);
        const pending = orders.filter((order) => order.attributes.status === "pending");
        const in_progress = orders.filter((order) => order.attributes.status === "in_progress");
        const completed = orders.filter((order) => order.attributes.status === "completed");

        setCompleted(completed);
        setPending(pending);
        setInProgress(in_progress);
        
        // console.log(pending);
        // console.log(in_progress);
        // console.log(completed);

        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    resp();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card mt-5 shadow p-3 mb-5 bg-white rounded">
              <div className="card-header">
                <h3 className="card-title text-center">My Orders</h3>
              </div>
              <div className="card-body">
                <nav>
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      class="nav-link active"
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
                      class="nav-link"
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
                      class="nav-link"
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
                <div class="tab-content mt-4" id="nav-tabContent">
                  <div
                    class="tab-pane fade show active"
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
                        {pending && pending.length > 0 ? (
                          pending.map((order) => {
                            return (
                              <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>${order.attributes.price}</td>
                                <td>{order.attributes.status}</td>
                                <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                >
                                  Cancel Order
                                </button>
                              </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colspan="3">No pending orders</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    {
                      in_progress && in_progress.length > 0 ? (
                        in_progress.map((order) => {
                          return (
                            <tr key={order.id}>
                              <td>{order.id}</td>
                              <td>${order.attributes.price}</td>
                              <td>{order.attributes.status}</td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-outline-warning"
                                >
                                  See Detail
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colspan="3">No orders in progress.</td>
                        </tr>
                      )
                    }
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                    {
                      completed && completed.length > 0 ? (
                        completed.map((order) => {
                          return (
                            <tr key={order.id}>
                              <td>{order.id}</td>
                              <td>${order.attributes.price}</td>
                              <td>{order.attributes.status}</td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-outline-success"
                                >
                                  Rating
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colspan="3">No completed orders.</td>
                        </tr>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
