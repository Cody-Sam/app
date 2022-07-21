import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShowOrder from "./ShowOrder";



function OrdersIndex() {

  const [orders, setOrders] = useState()

  const currentUserOrders = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/orders/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.token}`,
      },
    });
    const ordersRes = await res.json();
    console.log(ordersRes)
    setOrders(ordersRes)
  }

  useEffect(() => {
    currentUserOrders()
  }, [])

  return (
    <div className="test">
      {orders && orders.map((order, i) => {
        return (
          <div key={i}>
            <h1>ORDER {i + 1}</h1>
            <Link to={`${order._id}`}>View Order</Link>
            {order.products.map((product, i) => {
              return (
                <div key={i}>
                  <h2>{product.name}</h2>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  );
}

export default OrdersIndex;
